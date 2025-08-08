import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { URLSearchParams } from "url"

export async function POST(request: Request) {
  try {
    const { name, phone, email, messenger, country } = await request.json()

    // Basic validation
    if (!name || !phone || !email || !messenger || !country) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Telegram Bot API integration - FIRST
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || "-4957376488" // Use provided ID as default

    console.log("Loaded TELEGRAM_BOT_TOKEN:", telegramBotToken?.slice(0, 10) + "...")
    console.log("Loaded TELEGRAM_CHAT_ID:", telegramChatId)

    if (telegramBotToken && telegramChatId) {
      const telegramMessage = `
        *New Consultation Request!*
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
          console.log("Telegram message sent successfully!")
          // Proceed to send email only if Telegram message was successful
        } else {
          const errorData = await telegramResponse.json()
          console.error("Failed to send Telegram message:", errorData)
          return NextResponse.json({ message: "Failed to send Telegram notification." }, { status: 500 })
        }
      } catch (telegramError) {
        console.error("Error sending Telegram message:", telegramError)
        return NextResponse.json(
          { message: "Failed to send Telegram notification due to network error." },
          { status: 500 },
        )
      }
    } else {
      console.warn("Telegram bot token or chat ID not configured. Skipping Telegram notification.")
      // If Telegram is not configured, we might still want to send the email.
      // For this request, the requirement is to NOT send email if Telegram fails or is not configured.
      return NextResponse.json({ message: "Telegram notification not configured." }, { status: 500 })
    }

    // Create a Nodemailer transporter - SECOND (only if Telegram was successful)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com", // e.g., 'smtp.gmail.com' for Gmail
      port: Number.parseInt(process.env.EMAIL_PORT || "587"), // e.g., 587 for TLS, 465 for SSL
      secure: process.env.EMAIL_SECURE === "true", // Use 'true' if port is 465 (SSL), 'false' for 587 (TLS)
      auth: {
        user: process.env.EMAIL_USER || "your-email@example.com", // Your email address
        pass: process.env.EMAIL_PASS || "your-email-password", // Your email password or app-specific password
      },
    })

    // Construct the email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@example.com", // Sender address
      to: "vladlysechko@gmail.com", // Recipient email address
      subject: "New Consultation Request from Lysechko Agency Website",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2a2a2a;">New Consultation Request</h2>
          <p>You have received a new consultation request from your website. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Country:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${country}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Preferred Messenger:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${messenger}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 0.9em; color: #777;">This email was sent automatically from your website's consultation form.</p>
        </div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Consultation request processed successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing consultation request:", error)
    return NextResponse.json({ message: "Failed to process consultation request." }, { status: 500 })
  }
}
