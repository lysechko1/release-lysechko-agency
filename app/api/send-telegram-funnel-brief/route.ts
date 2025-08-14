import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация обязательных полей
    const requiredFields = ["contactName", "contactEmail", "contactPhone"]
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { error: `Поле ${field} обязательно для заполнения` },
          { status: 400 }
        )
      }
    }

    // Создание транспорта для отправки email
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Формирование HTML письма
    const htmlContent = `
      <h2>📋 Новый бриф на запуск автоворонки в Telegram через Leeloo.ai</h2>
      
      <h3>👤 Контактная информация</h3>
      <p><strong>Имя:</strong> ${body.contactName}</p>
      <p><strong>Email:</strong> ${body.contactEmail}</p>
      <p><strong>Телефон:</strong> ${body.contactPhone}</p>
      
      <h3>1. 📦 Описание продукта и целей</h3>
      <p><strong>Продукты:</strong> ${body.products?.join(", ") || "Не указано"}</p>
      ${body.otherProduct ? `<p><strong>Другой продукт:</strong> ${body.otherProduct}</p>` : ""}
      <p><strong>Количество воронок:</strong> ${body.funnelCount || "Не указано"}</p>
      <p><strong>Ключевые действия:</strong> ${body.keyActions?.join(", ") || "Не указано"}</p>
      ${body.otherAction ? `<p><strong>Другое действие:</strong> ${body.otherAction}</p>` : ""}
      
      <h3>2. 🎯 Целевая аудитория и сегменты</h3>
      <p><strong>Целевая аудитория:</strong> ${body.targetAudience || "Не указано"}</p>
      <p><strong>Разные цепочки:</strong> ${body.differentChains || "Не указано"}</p>
      ${body.audienceSegments ? `<p><strong>Сегменты аудитории:</strong> ${body.audienceSegments}</p>` : ""}
      <p><strong>Язык бота:</strong> ${body.botLanguage || "Не указано"}</p>
      ${body.otherLanguage ? `<p><strong>Другой язык:</strong> ${body.otherLanguage}</p>` : ""}
      
      <h3>3. 📝 Контент и сценарии</h3>
      <p><strong>Готовые тексты:</strong> ${body.readyTexts || "Не указано"}</p>
      <p><strong>Типы сообщений:</strong> ${body.messageTypes?.join(", ") || "Не указано"}</p>
      ${body.otherMessageType ? `<p><strong>Другой тип сообщения:</strong> ${body.otherMessageType}</p>` : ""}
      <p><strong>Медиаконтент:</strong> ${body.mediaContent || "Не указано"}</p>
      ${body.mediaScenario ? `<p><strong>Сценарий медиа:</strong> ${body.mediaScenario}</p>` : ""}
      
      <h3>4. 💳 Оплата и автоматизация</h3>
      <p><strong>Текущие способы оплаты:</strong> ${body.currentPayments || "Не указано"}</p>
      <p><strong>Оплата в Leeloo.ai:</strong> ${body.leelooPayment || "Не указано"}</p>
      <p><strong>После оплаты:</strong> ${body.afterPayment || "Не указано"}</p>
      ${body.otherAfterPayment ? `<p><strong>Другое после оплаты:</strong> ${body.otherAfterPayment}</p>` : ""}
      
      <h3>5. 🚀 Действия после покупки</h3>
      <p><strong>Дополнительные сообщения:</strong> ${body.additionalMessages || "Не указано"}</p>
      <p><strong>Продукты для допродажи:</strong> ${body.upsellProducts || "Не указано"}</p>
      <p><strong>Рассылка:</strong> ${body.newsletter || "Не указано"}</p>
      
      <h3>6. 🎨 Визуал и фирменный стиль</h3>
      <p><strong>Фирменный стиль:</strong> ${body.brandStyle || "Не указано"}</p>
      <p><strong>Мини-лендинги:</strong> ${body.miniLandings || "Не указано"}</p>
      <p><strong>Визуальные материалы:</strong> ${body.visualMaterials || "Не указано"}</p>
      
      <h3>7. ⏰ Сроки, поддержка и бюджет</h3>
      <p><strong>Дата запуска:</strong> ${body.launchDate || "Не указано"}</p>
      <p><strong>Техническая поддержка:</strong> ${body.technicalSupport || "Не указано"}</p>
      
      <hr>
      <p><em>Бриф отправлен с сайта Lysechko Agency</em></p>
      <p><em>Время отправки: ${new Date().toLocaleString("ru-RU")}</em></p>
    `

    // Отправка email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@lysechko.agency",
      to: process.env.CONTACT_EMAIL || "info@lysechko.agency",
      subject: "📋 Новый бриф на автоворонку в Telegram - Leeloo.ai",
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending telegram funnel brief:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
