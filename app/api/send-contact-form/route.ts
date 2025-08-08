import { NextResponse } from "next/server"
import { URLSearchParams } from "url"

export async function POST(request: Request) {
  try {
    // Destructure the fields actually sent by the contact form
    const { name, phone, email, message, messenger, country } = await request.json()

    // Basic validation for the fields received
    if (!name || !phone || !email || !message || !messenger || !country) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || "-4957376488" // Use provided ID as default

    console.log("Loaded TELEGRAM_BOT_TOKEN:", telegramBotToken?.slice(0, 10) + "...")
    console.log("Loaded TELEGRAM_CHAT_ID:", telegramChatId)

    if (!telegramBotToken || !telegramChatId) {
      console.warn("Telegram bot token or chat ID not configured. Cannot send contact form notification.")
      return NextResponse.json({ message: "Telegram notification not configured." }, { status: 500 })
    }

    // Construct the Telegram message using the actual fields from the contact form
    const telegramMessage = `
      *New Contact Form Submission!*
      *Name:* ${name}
      *Phone Number:* ${phone}
      *Email:* ${email}
      *Preferred Messenger:* ${messenger.charAt(0).toUpperCase() + messenger.slice(1)}
      *Country:* ${country}
      *Message:*
      ${message}
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
        console.log("Contact form Telegram message sent successfully!")
        return NextResponse.json({ message: "Contact request sent successfully!" }, { status: 200 })
      } else {
        const errorData = await telegramResponse.json()
        console.error("Failed to send contact form Telegram message:", errorData)
        return NextResponse.json({ message: "Failed to send Telegram notification for contact form." }, { status: 500 })
      }
    } catch (telegramError) {
      console.error("Error sending contact form Telegram message:", telegramError)
      return NextResponse.json(
        { message: "Failed to send Telegram notification for contact form due to network error." },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing contact form request:", error)
    return NextResponse.json({ message: "Failed to process contact form request." }, { status: 500 })
  }
}
