import { NextRequest, NextResponse } from "next/server"
import { URLSearchParams } from "url"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация обязательных полей
    const requiredFields = [
      'contactName',
      'contactPhone', 
      'contactEmail'
    ]
    
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Поле ${field} обязательно для заполнения` },
          { status: 400 }
        )
      }
    }

    // Telegram Bot API integration
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || "-4957376488" // Use provided ID as default

    console.log("Loaded TELEGRAM_BOT_TOKEN:", telegramBotToken?.slice(0, 10) + "...")
    console.log("Loaded TELEGRAM_CHAT_ID:", telegramChatId)

    if (!telegramBotToken || !telegramChatId) {
      console.warn("Telegram bot token or chat ID not configured. Cannot send grooming salon brief notification.")
      return NextResponse.json({ message: "Telegram notification not configured." }, { status: 500 })
    }

    // Construct the Telegram message
    const telegramMessage = `
*📋 НОВЫЙ БРИФ ГРУМИНГ-САЛОНА!*

👤 *Контактные данные:*
• Имя: ${body.contactName}
• Телефон: ${body.contactPhone}
• Email: ${body.contactEmail}

🏪 *Информация о салоне:*
• Название: ${body.salonName || 'Не указано'}
• Адрес: ${body.salonAddress || 'Не указано'}
• Сайт/соцсети: ${body.salonWebsite || 'Не указано'}

🎯 *Что нужно от нас:*
${body.services && body.services.length > 0 ? body.services.map(service => `• ${service}`).join('\n') : 'Не указано'}
${body.otherService ? `• Другое: ${body.otherService}` : ''}

👥 *Клиенты:*
${body.clientsDescription || 'Не указано'}

❌ *Проблемы клиентов:*
${body.clientProblems || 'Не указано'}

🤔 *Возражения клиентов:*
${body.clientObjections || 'Не указано'}

📍 *География клиентов:*
${body.clientGeography || 'Не указано'}
${body.otherGeography ? `• Другое: ${body.otherGeography}` : ''}

🏆 *Конкуренты:*
${body.competitors || 'Не указано'}

⏰ *Сроки начала:*
${body.startDate || 'Не указано'}

💰 *Бюджет:*
${body.budget || 'Не указано'}

🌍 *Язык рекламы:*
${body.advertisingLanguage || 'Не указано'}
${body.otherLanguage ? `• Другое: ${body.otherLanguage}` : ''}

📝 *Дополнительно:*
${body.additionalInfo || 'Не указано'}

🕐 *Время отправки:* ${new Date().toLocaleString('ru-RU')}
    `.trim()

    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`
    const params = new URLSearchParams({
      chat_id: telegramChatId,
      text: telegramMessage,
      parse_mode: "Markdown",
    })

    try {
      const telegramResponse = await fetch(telegramApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })

      if (telegramResponse.ok) {
        console.log("Grooming salon brief Telegram message sent successfully!")
        
        // Логирование данных для отладки
        console.log('Grooming Salon Brief Form Submission:', {
          timestamp: new Date().toISOString(),
          ...body
        })

        return NextResponse.json(
          { message: "Бриф успешно отправлен" },
          { status: 200 }
        )
      } else {
        const errorData = await telegramResponse.json()
        console.error("Failed to send grooming salon brief Telegram message:", errorData)
        return NextResponse.json(
          { message: "Failed to send Telegram notification for grooming salon brief." },
          { status: 500 }
        )
      }
    } catch (telegramError) {
      console.error("Error sending grooming salon brief Telegram message:", telegramError)
      return NextResponse.json(
        { message: "Failed to send Telegram notification for grooming salon brief due to network error." },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Error processing grooming salon brief form:', error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
