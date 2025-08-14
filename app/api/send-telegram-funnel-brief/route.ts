import { NextRequest, NextResponse } from "next/server"

// Функция для отправки сообщения в Telegram
async function sendTelegramMessage(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    console.warn("Telegram credentials not configured")
    return
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      console.error("Failed to send Telegram message:", response.statusText)
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация обязательных полей
    const requiredFields = ["contactName", "contactPhone"]
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { error: `Поле ${field} обязательно для заполнения` },
          { status: 400 }
        )
      }
    }

    // Формирование сообщения для Telegram
    const telegramMessage = `
<b>📋 Новый бриф на запуск автоворонки в Telegram через Leeloo.ai</b>

<b>👤 Контактная информация</b>
<b>Имя:</b> ${body.contactName}
<b>Телефон:</b> ${body.contactPhone}
${body.contactEmail ? `<b>Email:</b> ${body.contactEmail}` : ''}

<b>1. 📦 Описание продукта и целей</b>
<b>Продукты:</b> ${body.products?.join(", ") || "Не указано"}
${body.otherProduct ? `<b>Другой продукт:</b> ${body.otherProduct}` : ''}
<b>Количество воронок:</b> ${body.funnelCount || "Не указано"}
<b>Ключевые действия:</b> ${body.keyActions?.join(", ") || "Не указано"}
${body.otherAction ? `<b>Другое действие:</b> ${body.otherAction}` : ''}

<b>2. 🎯 Целевая аудитория и сегменты</b>
<b>Целевая аудитория:</b> ${body.targetAudience || "Не указано"}
<b>Разные цепочки:</b> ${body.differentChains || "Не указано"}
${body.audienceSegments ? `<b>Сегменты аудитории:</b> ${body.audienceSegments}` : ''}
<b>Язык бота:</b> ${body.botLanguage || "Не указано"}
${body.otherLanguage ? `<b>Другой язык:</b> ${body.otherLanguage}` : ''}

<b>3. 📝 Контент и сценарии</b>
<b>Готовые тексты:</b> ${body.readyTexts || "Не указано"}
<b>Типы сообщений:</b> ${body.messageTypes?.join(", ") || "Не указано"}
${body.otherMessageType ? `<b>Другой тип сообщения:</b> ${body.otherMessageType}` : ''}
<b>Медиаконтент:</b> ${body.mediaContent || "Не указано"}
${body.mediaScenario ? `<b>Сценарий медиа:</b> ${body.mediaScenario}` : ''}

<b>4. 💳 Оплата и автоматизация</b>
<b>Текущие способы оплаты:</b> ${body.currentPayments || "Не указано"}
<b>Оплата в Leeloo.ai:</b> ${body.leelooPayment || "Не указано"}
<b>После оплаты:</b> ${body.afterPayment || "Не указано"}
${body.otherAfterPayment ? `<b>Другое после оплаты:</b> ${body.otherAfterPayment}` : ''}

<b>5. 🚀 Действия после покупки</b>
<b>Дополнительные сообщения:</b> ${body.additionalMessages || "Не указано"}
<b>Продукты для допродажи:</b> ${body.upsellProducts || "Не указано"}
<b>Рассылка:</b> ${body.newsletter || "Не указано"}

<b>6. 🎨 Визуал и фирменный стиль</b>
<b>Фирменный стиль:</b> ${body.brandStyle || "Не указано"}
<b>Мини-лендинги:</b> ${body.miniLandings || "Не указано"}
<b>Визуальные материалы:</b> ${body.visualMaterials || "Не указано"}

<b>7. ⏰ Сроки, поддержка и бюджет</b>
<b>Дата запуска:</b> ${body.launchDate || "Не указано"}
<b>Техническая поддержка:</b> ${body.technicalSupport || "Не указано"}

<em>Бриф отправлен с сайта Lysechko Agency
Время отправки: ${new Date().toLocaleString("ru-RU")}</em>
    `

    // Отправка в Telegram
    await sendTelegramMessage(telegramMessage)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending telegram funnel brief:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
