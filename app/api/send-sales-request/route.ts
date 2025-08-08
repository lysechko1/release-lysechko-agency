import { NextResponse } from "next/server"
import { URLSearchParams } from "url"

export async function POST(request: Request) {
  try {
    const { name, phone, email, messenger, country, packageName, packagePrice } = await request.json()

    // Basic validation
    if (!name || !phone || !email || !messenger || !country || !packageName || !packagePrice) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Telegram Bot API integration
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || "-4957376488" // Use provided ID as default

    console.log("Loaded TELEGRAM_BOT_TOKEN:", telegramBotToken?.slice(0, 10) + "...")
    console.log("Loaded TELEGRAM_CHAT_ID:", telegramChatId)

    if (!telegramBotToken || !telegramChatId) {
      console.warn("Telegram bot token or chat ID not configured. Cannot send sales request notification.")
      return NextResponse.json({ message: "Telegram notification not configured." }, { status: 500 })
    }

    const telegramMessage = `
      *New Sales Request!*
      *Package:* ${packageName} (${packagePrice})
      *Name:* ${name}
      *Phone Number:* ${phone}
      *Email Address:* ${email}
      *Country:* ${country}
      *Preferred Messenger:* ${messenger}
    `

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
        console.log("Sales request Telegram message sent successfully!")
        return NextResponse.json({ message: "Sales request sent successfully!" }, { status: 200 })
      } else {
        const errorData = await telegramResponse.json()
        console.error("Failed to send sales request Telegram message:", errorData)
        return NextResponse.json(
          { message: "Failed to send Telegram notification for sales request." },
          { status: 500 },
        )
      }
    } catch (telegramError) {
      console.error("Error sending sales request Telegram message:", telegramError)
      return NextResponse.json(
        { message: "Failed to send Telegram notification for sales request due to network error." },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing sales request:", error)
    return NextResponse.json({ message: "Failed to process sales request." }, { status: 500 })
  }
}
