"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, Upload, X } from "lucide-react"
import type { Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface GroomingSalonBriefFormProps {
  language: Language
  t: (key: string) => string
}

interface FormData {
  // 1. Контактные данные
  contactName: string
  contactPhone: string
  contactEmail: string
  
  // 2. Информация о салоне
  salonName: string
  salonAddress: string
  salonWebsite: string
  
  // 3. Что нужно от нас
  services: string[]
  otherService: string
  
  // 4. Клиенты
  clientsDescription: string
  
  // 5. Проблемы клиентов
  clientProblems: string
  
  // 6. Возражения клиентов
  clientObjections: string
  
  // 7. География клиентов
  clientGeography: string
  otherGeography: string
  
  // 8. Конкуренты
  competitors: string
  
  // 9. Сроки начала
  startDate: string
  
  // 10. Бюджет
  budget: string
  
  // 11. Язык рекламы
  advertisingLanguage: string
  otherLanguage: string
  
  // 12. Дополнительно
  additionalInfo: string
}

const initialFormData: FormData = {
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  salonAddress: "",
  salonWebsite: "",
  services: [],
  otherService: "",
  clientsDescription: "",
  clientProblems: "",
  clientObjections: "",
  clientGeography: "",
  otherGeography: "",
  competitors: "",
  startDate: "",
  budget: "",
  advertisingLanguage: "",
  otherLanguage: "",
  additionalInfo: "",
}

export default function GroomingSalonBriefForm({ language, t }: GroomingSalonBriefFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("groomingSalonBriefForm")
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
    localStorage.setItem("groomingSalonBriefForm", JSON.stringify(formData))
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmissionStatus(null)
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-grooming-salon-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmissionStatus("success")
        setFormData(initialFormData)
        localStorage.removeItem("groomingSalonBriefForm")
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
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">📋 Бриф для запуска рекламы груминг-салона (Польша)</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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

        {/* 1. Контактные данные */}
        <Card className="shadow-lg border-t-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">1. Контактные данные</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactName" className="text-base font-medium">
                  Имя и фамилия
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
                <Label htmlFor="contactPhone" className="text-base font-medium">
                  Телефон
                </Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+48 123 456 789"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contactEmail" className="text-base font-medium">
                Email
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="ivan@example.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Информация о салоне */}
        <Card className="shadow-lg border-t-4 border-amber-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">2. Информация о салоне</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="salonName" className="text-base font-medium">
                Название салона
              </Label>
              <Input
                id="salonName"
                name="salonName"
                value={formData.salonName}
                onChange={handleChange}
                placeholder="Название вашего салона"
                required
              />
            </div>
            <div>
              <Label htmlFor="salonAddress" className="text-base font-medium">
                Адрес
              </Label>
              <Input
                id="salonAddress"
                name="salonAddress"
                value={formData.salonAddress}
                onChange={handleChange}
                placeholder="Улица, номер, город"
                required
              />
            </div>
            <div>
              <Label htmlFor="salonWebsite" className="text-base font-medium">
                Сайт или соцсети
              </Label>
              <Input
                id="salonWebsite"
                name="salonWebsite"
                value={formData.salonWebsite}
                onChange={handleChange}
                placeholder="www.example.com или @instagram"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Что нужно от нас */}
        <Card className="shadow-lg border-t-4 border-purple-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">3. Что вам нужно от нас?</CardTitle>
            <p className="text-slate-600">Отметьте, что для вас актуально:</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceFacebook"
                  checked={formData.services.includes("Facebook")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Facebook")}
                />
                <Label htmlFor="serviceFacebook">Реклама в Facebook</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceInstagram"
                  checked={formData.services.includes("Instagram")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Instagram")}
                />
                <Label htmlFor="serviceInstagram">Реклама в Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceGoogle"
                  checked={formData.services.includes("Google")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Google")}
                />
                <Label htmlFor="serviceGoogle">Реклама в Google</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceChatbot"
                  checked={formData.services.includes("Chatbot")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Chatbot")}
                />
                <Label htmlFor="serviceChatbot">Разработка чат-бота</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceWebsite"
                  checked={formData.services.includes("Website")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Website")}
                />
                <Label htmlFor="serviceWebsite">Разработка сайта</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceYouTube"
                  checked={formData.services.includes("YouTube")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "YouTube")}
                />
                <Label htmlFor="serviceYouTube">Продвижение в YouTube</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceTikTok"
                  checked={formData.services.includes("TikTok")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "TikTok")}
                />
                <Label htmlFor="serviceTikTok">Продвижение в TikTok</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceApp"
                  checked={formData.services.includes("Mobile App")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Mobile App")}
                />
                <Label htmlFor="serviceApp">Мобильное приложение</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceOther"
                  checked={formData.services.includes("Other")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Other")}
                />
                <Label htmlFor="serviceOther">Другое</Label>
              </div>
            </div>
            {formData.services.includes("Other") && (
              <Input
                name="otherService"
                value={formData.otherService}
                onChange={handleChange}
                placeholder="Укажите что именно"
                className="mt-2"
              />
            )}
          </CardContent>
        </Card>

        {/* 4. Клиенты */}
        <Card className="shadow-lg border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">4. Ваши клиенты (кто приходит в салон)</CardTitle>
            <p className="text-slate-600">Опишите 2–3 группы ваших клиентов.</p>
            <p className="text-sm text-slate-500">✍ Примеры:</p>
            <ul className="text-sm text-slate-500 list-disc list-inside space-y-1">
              <li>Молодые девушки с маленькими собаками (йорки, шпиц, чихуахуа).</li>
              <li>Семьи с детьми и средними собаками.</li>
              <li>Пожилые люди с небольшими спокойными питомцами.</li>
            </ul>
            <p className="text-slate-600 mt-2">Напишите своими словами:</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="clientsDescription"
              value={formData.clientsDescription}
              onChange={handleChange}
              placeholder="Опишите ваших клиентов..."
              rows={6}
              required
            />
          </CardContent>
        </Card>

        {/* 5. Проблемы клиентов */}
        <Card className="shadow-lg border-t-4 border-red-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">5. Проблемы ваших клиентов</CardTitle>
            <p className="text-slate-600">Что чаще всего не нравится вашим клиентам в других салонах?</p>
            <p className="text-sm text-slate-500">✍ Напишите своими словами (например: больно собаке, неаккуратно постригли, долго ждали, неприятный запах и т.д.):</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="clientProblems"
              value={formData.clientProblems}
              onChange={handleChange}
              placeholder="Опишите проблемы клиентов..."
              rows={4}
              required
            />
          </CardContent>
        </Card>

        {/* 6. Возражения клиентов */}
        <Card className="shadow-lg border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">6. Что мешает людям записаться к вам?</CardTitle>
            <p className="text-slate-600">Какие возражения или сомнения бывают у клиентов?</p>
            <p className="text-sm text-slate-500">✍ Напишите своими словами (например: «слишком дорого», «долго делают», «далеко ехать»):</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="clientObjections"
              value={formData.clientObjections}
              onChange={handleChange}
              placeholder="Опишите возражения клиентов..."
              rows={4}
              required
            />
          </CardContent>
        </Card>

        {/* 7. География клиентов */}
        <Card className="shadow-lg border-t-4 border-cyan-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">7. Откуда приезжают клиенты?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              name="clientGeography"
              value={formData.clientGeography}
              onValueChange={(value) => handleRadioChange("clientGeography", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Only this district" id="geoDistrict" />
                <Label htmlFor="geoDistrict">Только из этого района</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Different districts" id="geoDifferent" />
                <Label htmlFor="geoDifferent">Из разных районов города</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Neighboring cities" id="geoNeighboring" />
                <Label htmlFor="geoNeighboring">Из соседних городов</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="geoOther" />
                <Label htmlFor="geoOther">Другое</Label>
              </div>
            </RadioGroup>
            {formData.clientGeography === "Other" && (
              <Input
                name="otherGeography"
                value={formData.otherGeography}
                onChange={handleChange}
                placeholder="Укажите что именно"
                className="mt-2"
              />
            )}
          </CardContent>
        </Card>

        {/* 8. Конкуренты */}
        <Card className="shadow-lg border-t-4 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">8. Конкуренты</CardTitle>
            <p className="text-slate-600">Какие есть у вас конкуренты (названия салонов или ссылки)?</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="competitors"
              value={formData.competitors}
              onChange={handleChange}
              placeholder="Укажите ваших конкурентов..."
              rows={3}
            />
          </CardContent>
        </Card>

        {/* 9. Сроки начала */}
        <Card className="shadow-lg border-t-4 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">9. Когда начинаем работу?</CardTitle>
            <p className="text-slate-600">Когда вы планируете стартовать работу с нами?</p>
            <p className="text-sm text-slate-500">✍ Укажите дату или период (например: «сразу», «через месяц», «с 1 марта»):</p>
          </CardHeader>
          <CardContent>
            <Input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="Когда планируете начать?"
              required
            />
          </CardContent>
        </Card>

        {/* 10. Бюджет */}
        <Card className="shadow-lg border-t-4 border-pink-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">10. Бюджет</CardTitle>
            <p className="text-slate-600">Какой бюджет на рекламу вы готовы выделять в месяц?</p>
          </CardHeader>
          <CardContent>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Укажите бюджет в месяц"
              required
            />
          </CardContent>
        </Card>

        {/* 11. Язык рекламы */}
        <Card className="shadow-lg border-t-4 border-teal-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">11. Язык рекламы и материалов</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              name="advertisingLanguage"
              value={formData.advertisingLanguage}
              onValueChange={(value) => handleRadioChange("advertisingLanguage", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Only Polish" id="langPolish" />
                <Label htmlFor="langPolish">Только польский</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Polish + English" id="langPolishEnglish" />
                <Label htmlFor="langPolishEnglish">Польский + английский</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Polish + Russian/Ukrainian" id="langPolishRussian" />
                <Label htmlFor="langPolishRussian">Польский + русский/украинский (для эмигрантов)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="langOther" />
                <Label htmlFor="langOther">Другое</Label>
              </div>
            </RadioGroup>
            {formData.advertisingLanguage === "Other" && (
              <Input
                name="otherLanguage"
                value={formData.otherLanguage}
                onChange={handleChange}
                placeholder="Укажите что именно"
                className="mt-2"
              />
            )}
          </CardContent>
        </Card>

        {/* 12. Дополнительно */}
        <Card className="shadow-lg border-t-4 border-violet-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">12. Дополнительно</CardTitle>
            <p className="text-slate-600">Какие особенные услуги или преимущества вы хотите подчеркнуть в рекламе?</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Дополнительная информация..."
              rows={4}
            />
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
