import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Check if the request is FormData or JSON
    const contentType = request.headers.get("content-type")
    let formData: any = {}

    if (contentType?.includes("multipart/form-data")) {
      // Handle FormData (with file uploads)
      const data = await request.formData()

      // Convert FormData to regular object
      for (const [key, value] of data.entries()) {
        if (key === "brandStyleFile" && value instanceof File) {
          formData[key] = value.name // Store filename for now
        } else if (typeof value === "string") {
          // Try to parse JSON arrays and booleans
          if (value.startsWith("[") && value.endsWith("]")) {
            try {
              formData[key] = JSON.parse(value)
            } catch {
              formData[key] = value
            }
          } else if (value === "true") {
            formData[key] = true
          } else if (value === "false") {
            formData[key] = false
          } else {
            formData[key] = value
          }
        } else {
          formData[key] = value
        }
      }
    } else {
      // Handle JSON data
      formData = await request.json()
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram bot token or chat ID is not set.")
      return NextResponse.json({ error: "Server configuration error: Telegram credentials missing." }, { status: 500 })
    }

    // Format the data for Telegram message
    let message = `🛍️ *Новая заявка на разработку Shopify магазина*\n\n`

    // Contact Information
    message += `👤 *Контактная информация*\n`
    message += `*Имя:* ${formData.contactName || "Не указано"}\n`
    message += `*Email:* ${formData.contactEmail || "Не указано"}\n`
    message += `*Телефон:* ${formData.contactPhone || "Не указано"}\n\n`

    // Block 1: General Business Information
    message += `🏢 *Общая информация о бизнесе*\n`
    message += `*Название бренда:* ${formData.brandName || "Не указано"}\n`
    message += `*Сайт/соцсети:* ${formData.websiteLink || "Не указано"}\n`
    message += `*Описание бренда:* ${formData.brandDescription || "Не указано"}\n`

    const mainMarket = Array.isArray(formData.mainMarket) ? formData.mainMarket : []
    message += `*Основной рынок:* ${mainMarket.length > 0 ? mainMarket.join(", ") : "Не указано"}\n`
    if (mainMarket.includes("Other")) {
      message += `  *Другой рынок:* ${formData.otherMarket || "Не указано"}\n`
    }
    message += `*Конкуренты:* ${formData.competitors || "Не указано"}\n\n`

    // Block 2: Assortment and Catalog
    message += `📦 *Ассортимент и каталог*\n`
    const productCategories = Array.isArray(formData.productCategories) ? formData.productCategories : []
    message += `*Категории товаров:* ${productCategories.length > 0 ? productCategories.join(", ") : "Не указано"}\n`
    if (productCategories.includes("Other")) {
      message += `  *Другая категория:* ${formData.otherCategory || "Не указано"}\n`
    }
    message += `*Количество товаров:* ${formData.productQuantity || "Не указано"}\n`
    message += `*Коллекции:* ${formData.collectionsNeeded || "Не указано"}\n`
    message += `*Фотографии товаров:* ${formData.productPhotos || "Не указано"}\n\n`

    // Block 3: Design and Branding
    message += `🎨 *Дизайн и брендинг*\n`
    message += `*Фирменный стиль:* ${formData.brandStyle || "Не указано"}\n`
    if (formData.brandStyle === "Yes (upload file)" && formData.brandStyleFile) {
      message += `  *Файл:* ${formData.brandStyleFile}\n`
    }
    message += `*Примеры дизайна:* ${formData.designExamples || "Не указано"}\n`
    message += `*Стиль дизайна:* ${formData.designStyle || "Не указано"}\n`
    if (formData.designStyle === "Other") {
      message += `  *Другой стиль:* ${formData.otherDesignStyle || "Не указано"}\n`
    }
    message += `\n`

    // Block 4: Store Functionality
    message += `⚙️ *Функциональность магазина*\n`
    const functionality = []
    if (formData.funcCustomerAccount) functionality.push("Личный кабинет")
    if (formData.funcFilters) functionality.push("Фильтры товаров")
    if (formData.funcWishlist) functionality.push("Список желаний")
    if (formData.funcCustomerReviews) functionality.push("Отзывы покупателей")
    if (formData.funcInstagramIntegration) functionality.push("Интеграция с Instagram")
    if (formData.funcBlog) functionality.push("Блог")
    if (formData.funcLoyaltyProgram) functionality.push("Программа лояльности")
    if (formData.funcPopups) functionality.push("Всплывающие окна")
    message += `*Необходимые функции:* ${functionality.length > 0 ? functionality.join(", ") : "Не выбрано"}\n\n`

    // Block 5: Payment and Currencies
    message += `💳 *Оплата и валюты*\n`
    message += `*Основная валюта:* ${formData.mainCurrency || "Не указано"}\n`
    const paymentMethods = Array.isArray(formData.paymentMethods) ? formData.paymentMethods : []
    message += `*Способы оплаты:* ${paymentMethods.length > 0 ? paymentMethods.join(", ") : "Не указано"}\n`
    if (paymentMethods.includes("Other")) {
      message += `  *Другой способ:* ${formData.otherPaymentMethod || "Не указано"}\n`
    }
    message += `*Мультивалютность:* ${formData.multiCurrency ? "Да" : "Нет"}\n\n`

    // Block 6: Delivery
    message += `🚚 *Доставка*\n`
    const deliveryServices = Array.isArray(formData.deliveryServices) ? formData.deliveryServices : []
    message += `*Службы доставки:* ${deliveryServices.length > 0 ? deliveryServices.join(", ") : "Не указано"}\n`
    if (deliveryServices.includes("Other")) {
      message += `  *Другая служба:* ${formData.otherDeliveryService || "Не указано"}\n`
    }
    message += `*Сумма для бесплатной доставки:* ${formData.freeShippingAmount || "Не указано"}\n`
    const deliveryGeography = Array.isArray(formData.deliveryGeography) ? formData.deliveryGeography : []
    message += `*География доставки:* ${deliveryGeography.length > 0 ? deliveryGeography.join(", ") : "Не указано"}\n\n`

    // Block 7: Marketing and Integrations
    message += `📈 *Маркетинг и интеграции*\n`
    const marketing = []
    if (formData.marketingFacebookPixel) marketing.push("Facebook Pixel / Instagram")
    if (formData.marketingGoogleAnalytics) marketing.push("Google Analytics / GA4")
    if (formData.marketingEmail) marketing.push("Email маркетинг")
    if (formData.marketingSEO) marketing.push("SEO оптимизация")
    if (formData.marketingCRM) marketing.push("CRM система")
    message += `*Интеграции:* ${marketing.length > 0 ? marketing.join(", ") : "Не выбрано"}\n\n`

    // Block 8: Content and Pages
    message += `📄 *Контент и страницы*\n`
    const pages = []
    if (formData.pageAboutBrand) pages.push("О бренде")
    if (formData.pageLookbook) pages.push("Лукбук")
    if (formData.pageFAQ) pages.push("FAQ")
    if (formData.pageReturnPolicy) pages.push("Политика возврата")
    if (formData.pageSizeChart) pages.push("Таблица размеров")
    message += `*Дополнительные страницы:* ${pages.length > 0 ? pages.join(", ") : "Не выбрано"}\n`
    message += `*Мультиязычность:* ${formData.multiLanguage ? "Да" : "Нет"}\n\n`

    // Block 9: Administration
    message += `👨‍💼 *Администрирование*\n`
    message += `*Управление магазином:* ${formData.storeManager || "Не указано"}\n`
    message += `*Обучение Shopify:* ${formData.shopifyTraining ? "Да" : "Нет"}\n\n`

    // Block 10: Deadlines and Budget
    message += `⏰ *Сроки и бюджет*\n`
    message += `*Желаемая дата запуска:* ${formData.desiredLaunchDate || "Не указано"}\n`
    message += `*Бюджет проекта:* ${formData.projectBudget || "Не указано"}\n\n`

    message += `📅 *Дата подачи заявки:* ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}\n`
    message += `🌐 *Источник:* Сайт lysechko.agency`

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text()
      console.error("Failed to send message to Telegram:", errorText)
      return NextResponse.json({ error: "Failed to send message to Telegram." }, { status: 500 })
    }

    return NextResponse.json({ message: "Brief submitted successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing Shopify brief submission:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
