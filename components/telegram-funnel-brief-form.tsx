"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, Upload, X } from "lucide-react"
import type { Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface TelegramFunnelBriefFormProps {
  language: Language
  t: (key: string) => string
}

interface FormData {
  // 1. Описание продукта и целей
  products: string[]
  otherProduct: string
  funnelCount: string
  keyActions: string[]
  otherAction: string
  
  // 2. Целевая аудитория и сегменты
  targetAudience: string
  differentChains: string
  audienceSegments: string
  botLanguage: string
  otherLanguage: string
  
  // 3. Контент и сценарии
  readyTexts: string
  messageTypes: string[]
  otherMessageType: string
  mediaContent: string
  mediaScenario: string
  
  // 4. Оплата и автоматизация
  currentPayments: string
  leelooPayment: string
  afterPayment: string
  otherAfterPayment: string
  
  // 5. Действия после покупки
  additionalMessages: string
  upsellProducts: string
  newsletter: string
  
  // 6. Визуал и фирменный стиль
  brandStyle: string
  miniLandings: string
  visualMaterials: string
  
  // 7. Сроки, поддержка и бюджет
  launchDate: string
  technicalSupport: string
  
  // Контактная информация
  contactName: string
  contactEmail: string
  contactPhone: string
}

const initialFormData: FormData = {
  products: [],
  otherProduct: "",
  funnelCount: "",
  keyActions: [],
  otherAction: "",
  targetAudience: "",
  differentChains: "",
  audienceSegments: "",
  botLanguage: "",
  otherLanguage: "",
  readyTexts: "",
  messageTypes: [],
  otherMessageType: "",
  mediaContent: "",
  mediaScenario: "",
  currentPayments: "",
  leelooPayment: "",
  afterPayment: "",
  otherAfterPayment: "",
  additionalMessages: "",
  upsellProducts: "",
  newsletter: "",
  brandStyle: "",
  miniLandings: "",
  visualMaterials: "",
  launchDate: "",
  technicalSupport: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
}

export default function TelegramFunnelBriefForm({ language, t }: TelegramFunnelBriefFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("telegramFunnelBriefForm")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData({ ...initialFormData, ...parsedData })
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }
  }, [])

  // Save to localStorage on data change
  useEffect(() => {
    localStorage.setItem("telegramFunnelBriefForm", JSON.stringify(formData))
  }, [formData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[name] as string[]
      if (currentArray.includes(value)) {
        return { ...prev, [name]: currentArray.filter((item) => item !== value) }
      } else {
        return { ...prev, [name]: [...currentArray, value] }
      }
    })
  }

  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmissionStatus(null)
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-telegram-funnel-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmissionStatus("success")
        setFormData(initialFormData)
        localStorage.removeItem("telegramFunnelBriefForm")
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || "Ошибка при отправке формы")
        setSubmissionStatus("error")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setErrorMessage("Ошибка сети. Проверьте подключение к интернету.")
      setSubmissionStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submissionStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Спасибо за заявку!</h2>
        <p className="text-lg text-slate-600 mb-8">
          Ваш бриф успешно отправлен. Мы свяжемся с вами в течение 24 часов.
        </p>
        <Button onClick={() => setSubmissionStatus(null)} className="bg-amber-500 hover:bg-amber-600 text-white">
          Отправить еще один бриф
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Ошибка: </strong>
            <span className="block sm:inline">{errorMessage}</span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setErrorMessage(null)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Контактная информация */}
        <Card className="shadow-lg border-t-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Контактная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactName" className="text-base font-medium">
                  Ваше имя
                </Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail" className="text-base font-medium">
                  Email (необязательно)
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="ivan@example.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contactPhone" className="text-base font-medium">
                Телефон
              </Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* 1. Описание продукта и целей */}
        <Card className="shadow-lg border-t-4 border-amber-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">1. Описание продукта и целей</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">1.1. Какие продукты вы продаёте через Telegram?</Label>
              <p className="text-sm text-slate-600 mb-4">(Можно выбрать несколько или добавить свой вариант)</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productPdf10"
                    checked={formData.products.includes("PDF-гайд за $10")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "PDF-гайд за $10")}
                  />
                  <Label htmlFor="productPdf10">PDF-гайд за $10</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productPdf30"
                    checked={formData.products.includes("PDF-гайд + шаблон за $30")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "PDF-гайд + шаблон за $30")}
                  />
                  <Label htmlFor="productPdf30">PDF-гайд + шаблон за $30</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productConsultation"
                    checked={formData.products.includes("Индивидуальные консультации")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "Индивидуальные консультации")}
                  />
                  <Label htmlFor="productConsultation">Индивидуальные консультации</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productOther"
                    checked={formData.products.includes("Другое")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "Другое")}
                  />
                  <Label htmlFor="productOther">Другое</Label>
                </div>
              </div>
              {formData.products.includes("Другое") && (
                <Input
                  name="otherProduct"
                  value={formData.otherProduct}
                  onChange={handleChange}
                  placeholder="Укажите ваш продукт"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">1.2. Сколько воронок нужно запустить?</Label>
              <RadioGroup
                name="funnelCount"
                value={formData.funnelCount}
                onValueChange={(value) => handleRadioChange("funnelCount", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1 общая воронка для всех продуктов" id="funnel1" />
                  <Label htmlFor="funnel1">1 общая воронка для всех продуктов</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Отдельная воронка под каждый продукт" id="funnelMultiple" />
                  <Label htmlFor="funnelMultiple">Отдельная воронка под каждый продукт</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Не уверен(а) — нужна консультация" id="funnelConsultation" />
                  <Label htmlFor="funnelConsultation">Не уверен(а) — нужна консультация</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">1.3. Какие ключевые действия должен совершить клиент в боте?</Label>
              <p className="text-sm text-slate-600 mb-4">(Выберите всё, что применимо)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionProduct"
                    checked={formData.keyActions.includes("Выбор продукта")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Выбор продукта")}
                  />
                  <Label htmlFor="actionProduct">Выбор продукта</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionOffer"
                    checked={formData.keyActions.includes("Ознакомление с оффером")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Ознакомление с оффером")}
                  />
                  <Label htmlFor="actionOffer">Ознакомление с оффером</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionPayment"
                    checked={formData.keyActions.includes("Оплата")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Оплата")}
                  />
                  <Label htmlFor="actionPayment">Оплата</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionAccess"
                    checked={formData.keyActions.includes("Получение доступа / файла")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Получение доступа / файла")}
                  />
                  <Label htmlFor="actionAccess">Получение доступа / файла</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionConsultation"
                    checked={formData.keyActions.includes("Запись на консультацию")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Запись на консультацию")}
                  />
                  <Label htmlFor="actionConsultation">Запись на консультацию</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionSubscription"
                    checked={formData.keyActions.includes("Подписка / Прогрев")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Подписка / Прогрев")}
                  />
                  <Label htmlFor="actionSubscription">Подписка / Прогрев</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionOther"
                    checked={formData.keyActions.includes("Другое")}
                    onCheckedChange={(checked) => handleCheckboxChange("keyActions", "Другое")}
                  />
                  <Label htmlFor="actionOther">Другое</Label>
                </div>
              </div>
              {formData.keyActions.includes("Другое") && (
                <Input
                  name="otherAction"
                  value={formData.otherAction}
                  onChange={handleChange}
                  placeholder="Укажите другое действие"
                  className="mt-2"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 2. Целевая аудитория и сегменты */}
        <Card className="shadow-lg border-t-4 border-purple-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">2. Целевая аудитория и сегменты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="targetAudience" className="text-base font-medium">
                2.1. Кто ваша основная целевая аудитория?
              </Label>
              <p className="text-sm text-slate-600 mb-2">(Опишите сегмент: возраст, профессия, страна, язык и т.д.)</p>
              <Textarea
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Например: женщины 25-35 лет, работающие в сфере маркетинга, Россия, русский язык"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">2.2. Нужно ли сделать разные цепочки для разных сегментов?</Label>
              <RadioGroup
                name="differentChains"
                value={formData.differentChains}
                onValueChange={(value) => handleRadioChange("differentChains", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет, одна цепочка для всех" id="chainsNo" />
                  <Label htmlFor="chainsNo">Нет, одна цепочка для всех</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, у нас есть разные сегменты" id="chainsYes" />
                  <Label htmlFor="chainsYes">Да, у нас есть разные сегменты</Label>
                </div>
              </RadioGroup>
              {formData.differentChains === "Да, у нас есть разные сегменты" && (
                <Textarea
                  name="audienceSegments"
                  value={formData.audienceSegments}
                  onChange={handleChange}
                  placeholder="Опишите ваши сегменты аудитории"
                  className="mt-2"
                  rows={3}
                />
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">2.3. На каком языке должен общаться бот?</Label>
              <RadioGroup
                name="botLanguage"
                value={formData.botLanguage}
                onValueChange={(value) => handleRadioChange("botLanguage", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Русский" id="langRussian" />
                  <Label htmlFor="langRussian">Русский</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Украинский" id="langUkrainian" />
                  <Label htmlFor="langUkrainian">Украинский</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Английский" id="langEnglish" />
                  <Label htmlFor="langEnglish">Английский</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Другое" id="langOther" />
                  <Label htmlFor="langOther">Другое</Label>
                </div>
              </RadioGroup>
              {formData.botLanguage === "Другое" && (
                <Input
                  name="otherLanguage"
                  value={formData.otherLanguage}
                  onChange={handleChange}
                  placeholder="Укажите язык"
                  className="mt-2"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Контент и сценарии */}
        <Card className="shadow-lg border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">3. Контент и сценарии</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">3.1. Есть ли у вас готовые тексты сообщений?</Label>
              <RadioGroup
                name="readyTexts"
                value={formData.readyTexts}
                onValueChange={(value) => handleRadioChange("readyTexts", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, мы пришлём" id="textsYes" />
                  <Label htmlFor="textsYes">Да, мы пришлём</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Частично — нужно доработать" id="textsPartial" />
                  <Label htmlFor="textsPartial">Частично — нужно доработать</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет, нужна помощь с написанием" id="textsNo" />
                  <Label htmlFor="textsNo">Нет, нужна помощь с написанием</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">3.2. Какие типы сообщений нужны?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messageWelcome"
                    checked={formData.messageTypes.includes("Welcome (приветствие)")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "Welcome (приветствие)")}
                  />
                  <Label htmlFor="messageWelcome">Welcome (приветствие)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messageEngagement"
                    checked={formData.messageTypes.includes("Вовлечение / Прогрев")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "Вовлечение / Прогрев")}
                  />
                  <Label htmlFor="messageEngagement">Вовлечение / Прогрев</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messageReminders"
                    checked={formData.messageTypes.includes("Напоминания")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "Напоминания")}
                  />
                  <Label htmlFor="messageReminders">Напоминания</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messagePresale"
                    checked={formData.messageTypes.includes("До-продажи")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "До-продажи")}
                  />
                  <Label htmlFor="messagePresale">До-продажи</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messageFollowup"
                    checked={formData.messageTypes.includes("Follow-up / повторы")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "Follow-up / повторы")}
                  />
                  <Label htmlFor="messageFollowup">Follow-up / повторы</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messagePayment"
                    checked={formData.messageTypes.includes("Уведомления об оплате")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "Уведомления об оплате")}
                  />
                  <Label htmlFor="messagePayment">Уведомления об оплате</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="messageOther"
                    checked={formData.messageTypes.includes("Другое")}
                    onCheckedChange={(checked) => handleCheckboxChange("messageTypes", "Другое")}
                  />
                  <Label htmlFor="messageOther">Другое</Label>
                </div>
              </div>
              {formData.messageTypes.includes("Другое") && (
                <Input
                  name="otherMessageType"
                  value={formData.otherMessageType}
                  onChange={handleChange}
                  placeholder="Укажите другой тип сообщения"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">3.3. Планируются ли видео или аудиосообщения в боте?</Label>
              <RadioGroup
                name="mediaContent"
                value={formData.mediaContent}
                onValueChange={(value) => handleRadioChange("mediaContent", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет" id="mediaNo" />
                  <Label htmlFor="mediaNo">Нет</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Аудио (до 1 мин)" id="mediaAudio" />
                  <Label htmlFor="mediaAudio">Аудио (до 1 мин)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Видео (до 1 мин)" id="mediaVideo" />
                  <Label htmlFor="mediaVideo">Видео (до 1 мин)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, и нужно разработать сценарий" id="mediaScenario" />
                  <Label htmlFor="mediaScenario">Да, и нужно разработать сценарий</Label>
                </div>
              </RadioGroup>
              {formData.mediaContent === "Да, и нужно разработать сценарий" && (
                <Textarea
                  name="mediaScenario"
                  value={formData.mediaScenario}
                  onChange={handleChange}
                  placeholder="Укажите формат, стиль:"
                  className="mt-2"
                  rows={3}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 4. Оплата и автоматизация */}
        <Card className="shadow-lg border-t-4 border-pink-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">4. Оплата и автоматизация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">4.1. Как сейчас принимаются оплаты?</Label>
              <RadioGroup
                name="currentPayments"
                value={formData.currentPayments}
                onValueChange={(value) => handleRadioChange("currentPayments", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Через ссылки (Wayforpay, Fondy, Stripe и т.д.)" id="paymentsLinks" />
                  <Label htmlFor="paymentsLinks">Через ссылки (Wayforpay, Fondy, Stripe и т.д.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Через менеджера в ручном режиме" id="paymentsManager" />
                  <Label htmlFor="paymentsManager">Через менеджера в ручном режиме</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Не настроено — нужна помощь" id="paymentsNotSet" />
                  <Label htmlFor="paymentsNotSet">Не настроено — нужна помощь</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">4.2. Нужно ли встроить оплату прямо в Leeloo.ai?</Label>
              <RadioGroup
                name="leelooPayment"
                value={formData.leelooPayment}
                onValueChange={(value) => handleRadioChange("leelooPayment", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да" id="leelooPaymentYes" />
                  <Label htmlFor="leelooPaymentYes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет" id="leelooPaymentNo" />
                  <Label htmlFor="leelooPaymentNo">Нет</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Не знаю — нужна консультация" id="leelooPaymentConsultation" />
                  <Label htmlFor="leelooPaymentConsultation">Не знаю — нужна консультация</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">4.3. Что должно происходить после оплаты?</Label>
              <RadioGroup
                name="afterPayment"
                value={formData.afterPayment}
                onValueChange={(value) => handleRadioChange("afterPayment", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Автоматическая выдача PDF" id="afterPdf" />
                  <Label htmlFor="afterPdf">Автоматическая выдача PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Отправка ссылки/архива" id="afterLink" />
                  <Label htmlFor="afterLink">Отправка ссылки/архива</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Запись на консультацию" id="afterConsultation" />
                  <Label htmlFor="afterConsultation">Запись на консультацию</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Другое" id="afterOther" />
                  <Label htmlFor="afterOther">Другое</Label>
                </div>
              </RadioGroup>
              {formData.afterPayment === "Другое" && (
                <Input
                  name="otherAfterPayment"
                  value={formData.otherAfterPayment}
                  onChange={handleChange}
                  placeholder="Укажите что должно происходить"
                  className="mt-2"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 5. Действия после покупки */}
        <Card className="shadow-lg border-t-4 border-cyan-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">5. Действия после покупки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">5.1. Нужно ли настраивать доп. автосообщения после покупки?</Label>
              <RadioGroup
                name="additionalMessages"
                value={formData.additionalMessages}
                onValueChange={(value) => handleRadioChange("additionalMessages", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, хочу допродажи / цепочку предложений" id="additionalYes" />
                  <Label htmlFor="additionalYes">Да, хочу допродажи / цепочку предложений</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет, только доставка продукта" id="additionalNo" />
                  <Label htmlFor="additionalNo">Нет, только доставка продукта</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Пока не уверен(а)" id="additionalUnsure" />
                  <Label htmlFor="additionalUnsure">Пока не уверен(а)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="upsellProducts" className="text-base font-medium">
                5.2. Какие продукты вы хотите предложить после первой покупки?
              </Label>
              <p className="text-sm text-slate-600 mb-2">(Например: консультация после гайда, шаблоны, VIP-доступ и т.д.)</p>
              <Textarea
                id="upsellProducts"
                name="upsellProducts"
                value={formData.upsellProducts}
                onChange={handleChange}
                placeholder="Опишите продукты для допродажи"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">5.3. Планируется ли рассылка или прогрев постоянных клиентов?</Label>
              <RadioGroup
                name="newsletter"
                value={formData.newsletter}
                onValueChange={(value) => handleRadioChange("newsletter", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да" id="newsletterYes" />
                  <Label htmlFor="newsletterYes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет" id="newsletterNo" />
                  <Label htmlFor="newsletterNo">Нет</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Возможно в будущем" id="newsletterFuture" />
                  <Label htmlFor="newsletterFuture">Возможно в будущем</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* 6. Визуал и фирменный стиль */}
        <Card className="shadow-lg border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">6. Визуал и фирменный стиль</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">6.1. Есть ли фирменный стиль (цвета, шрифты, логотип)?</Label>
              <RadioGroup
                name="brandStyle"
                value={formData.brandStyle}
                onValueChange={(value) => handleRadioChange("brandStyle", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да — пришлём гайд" id="styleYes" />
                  <Label htmlFor="styleYes">Да — пришлём гайд</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Есть логотип" id="styleLogo" />
                  <Label htmlFor="styleLogo">Есть логотип</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет, нужно что-то базовое" id="styleNo" />
                  <Label htmlFor="styleNo">Нет, нужно что-то базовое</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">6.2. Нужно ли создать мини-лендинги через Leeloo или Tilda?</Label>
              <RadioGroup
                name="miniLandings"
                value={formData.miniLandings}
                onValueChange={(value) => handleRadioChange("miniLandings", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, под каждый продукт" id="landingsEach" />
                  <Label htmlFor="landingsEach">Да, под каждый продукт</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Только один лендинг" id="landingsOne" />
                  <Label htmlFor="landingsOne">Только один лендинг</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет, не нужно" id="landingsNo" />
                  <Label htmlFor="landingsNo">Нет, не нужно</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">6.3. Есть ли готовые визуальные материалы (баннеры, обложки, иконки)?</Label>
              <RadioGroup
                name="visualMaterials"
                value={formData.visualMaterials}
                onValueChange={(value) => handleRadioChange("visualMaterials", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да" id="materialsYes" />
                  <Label htmlFor="materialsYes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Частично" id="materialsPartial" />
                  <Label htmlFor="materialsPartial">Частично</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет — нужно заказать" id="materialsNo" />
                  <Label htmlFor="materialsNo">Нет — нужно заказать</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* 7. Сроки, поддержка и бюджет */}
        <Card className="shadow-lg border-t-4 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">7. Сроки, поддержка и бюджет</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="launchDate" className="text-base font-medium">
                7.1. Когда вы планируете запуск первой воронки?
              </Label>
              <Input
                id="launchDate"
                name="launchDate"
                type="date"
                value={formData.launchDate}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">7.2. Нужна ли техническая поддержка после запуска?</Label>
              <RadioGroup
                name="technicalSupport"
                value={formData.technicalSupport}
                onValueChange={(value) => handleRadioChange("technicalSupport", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, на 1 месяц" id="support1Month" />
                  <Label htmlFor="support1Month">Да, на 1 месяц</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Да, на 3 месяца" id="support3Months" />
                  <Label htmlFor="support3Months">Да, на 3 месяца</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Нет, всё разово" id="supportNo" />
                  <Label htmlFor="supportNo">Нет, всё разово</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className={cn(
            "w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300",
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-amber-500/25",
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Отправляем бриф...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Отправить бриф
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
