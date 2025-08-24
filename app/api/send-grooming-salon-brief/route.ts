import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация обязательных полей
    const requiredFields = [
      'contactName',
      'contactPhone', 
      'contactEmail',
      'salonName',
      'salonAddress',
      'clientsDescription',
      'clientProblems',
      'clientObjections',
      'startDate',
      'budget'
    ]
    
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Поле ${field} обязательно для заполнения` },
          { status: 400 }
        )
      }
    }

    // Здесь можно добавить логику отправки email или сохранения в базу данных
    // Например, отправка на email или в CRM систему
    
    // Логирование данных для отладки
    console.log('Grooming Salon Brief Form Submission:', {
      timestamp: new Date().toISOString(),
      ...body
    })

    // В реальном проекте здесь будет отправка email или сохранение в БД
    // await sendEmail(body)
    // await saveToDatabase(body)

    return NextResponse.json(
      { message: "Бриф успешно отправлен" },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Error processing grooming salon brief form:', error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
