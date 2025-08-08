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
import { Switch } from "@/components/ui/switch"
import { Loader2, CheckCircle, Upload, X } from "lucide-react"
import type { Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface ShopifyBriefFormProps {
  language: Language
  t: (key: string) => string
}

interface FormData {
  brandName: string
  websiteLink: string
  brandDescription: string
  mainMarket: string[]
  otherMarket: string
  competitors: string
  productCategories: string[]
  otherCategory: string
  productQuantity: number | ""
  collectionsNeeded: string
  productPhotos: string
  brandStyle: string
  brandStyleFile: File | null
  designExamples: string
  designStyle: string
  otherDesignStyle: string
  funcCustomerAccount: boolean
  funcFilters: boolean
  funcWishlist: boolean
  funcCustomerReviews: boolean
  funcInstagramIntegration: boolean
  funcBlog: boolean
  funcLoyaltyProgram: boolean
  funcPopups: boolean
  mainCurrency: string
  paymentMethods: string[]
  otherPaymentMethod: string
  multiCurrency: boolean
  deliveryServices: string[]
  otherDeliveryService: string
  freeShippingAmount: number | ""
  deliveryGeography: string[]
  marketingFacebookPixel: boolean
  marketingGoogleAnalytics: boolean
  marketingEmail: boolean
  marketingSEO: boolean
  marketingCRM: boolean
  pageAboutBrand: boolean
  pageLookbook: boolean
  pageFAQ: boolean
  pageReturnPolicy: boolean
  pageSizeChart: boolean
  multiLanguage: boolean
  storeManager: string
  shopifyTraining: boolean
  desiredLaunchDate: string
  projectBudget: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

const initialFormData: FormData = {
  brandName: "",
  websiteLink: "",
  brandDescription: "",
  mainMarket: [],
  otherMarket: "",
  competitors: "",
  productCategories: [],
  otherCategory: "",
  productQuantity: "",
  collectionsNeeded: "",
  productPhotos: "",
  brandStyle: "",
  brandStyleFile: null,
  designExamples: "",
  designStyle: "",
  otherDesignStyle: "",
  funcCustomerAccount: false,
  funcFilters: false,
  funcWishlist: false,
  funcCustomerReviews: false,
  funcInstagramIntegration: false,
  funcBlog: false,
  funcLoyaltyProgram: false,
  funcPopups: false,
  mainCurrency: "EUR",
  paymentMethods: [],
  otherPaymentMethod: "",
  multiCurrency: false,
  deliveryServices: [],
  otherDeliveryService: "",
  freeShippingAmount: "",
  deliveryGeography: [],
  marketingFacebookPixel: false,
  marketingGoogleAnalytics: false,
  marketingEmail: false,
  marketingSEO: false,
  marketingCRM: false,
  pageAboutBrand: false,
  pageLookbook: false,
  pageFAQ: false,
  pageReturnPolicy: false,
  pageSizeChart: false,
  multiLanguage: false,
  storeManager: "",
  shopifyTraining: false,
  desiredLaunchDate: "",
  projectBudget: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
}

export default function ShopifyBriefForm({ language, t }: ShopifyBriefFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("shopifyBriefForm")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Remove file from saved data as it can't be serialized
        const { brandStyleFile, ...restData } = parsedData
        setFormData({ ...initialFormData, ...restData, brandStyleFile: null })
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }
  }, [])

  // Save to localStorage on data change (excluding file)
  useEffect(() => {
    const { brandStyleFile, ...dataToSave } = formData
    localStorage.setItem("shopifyBriefForm", JSON.stringify(dataToSave))
  }, [formData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
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

  const handleSwitchChange = (name: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("Размер файла не должен превышать 10MB")
        return
      }
      // Check file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf"]
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Разрешены только файлы: JPG, PNG, GIF, PDF")
        return
      }
      setFormData((prev) => ({ ...prev, brandStyleFile: file }))
      setErrorMessage(null)
    } else {
      setFormData((prev) => ({ ...prev, brandStyleFile: null }))
    }
  }

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, brandStyleFile: null }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmissionStatus(null)
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      // Send as JSON instead of FormData to avoid issues
      const submitData = {
        ...formData,
        brandStyleFile: formData.brandStyleFile ? formData.brandStyleFile.name : null,
      }

      const response = await fetch("/api/send-shopify-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        setSubmissionStatus("success")
        setFormData(initialFormData)
        localStorage.removeItem("shopifyBriefForm")
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
      <div className="mb-8 text-center"></div>

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

        {/* Contact Information */}
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
                />
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
              />
            </div>
          </CardContent>
        </Card>

        {/* Block 1: General Business Information */}
        <Card className="shadow-lg border-t-4 border-amber-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Общая информация о бизнесе</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="brandName" className="text-base font-medium">
                Название бренда
              </Label>
              <Input
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="например: Bella Vista Fashion"
              />
            </div>
            <div>
              <Label htmlFor="websiteLink" className="text-base font-medium">
                Ссылка на сайт/соцсети
              </Label>
              <Input
                id="websiteLink"
                name="websiteLink"
                value={formData.websiteLink}
                onChange={handleChange}
                placeholder="google.com, instagram.com/yourbrand"
              />
            </div>
            <div>
              <Label htmlFor="brandDescription" className="text-base font-medium">
                Описание бренда
              </Label>
              <Textarea
                id="brandDescription"
                name="brandDescription"
                value={formData.brandDescription}
                onChange={handleChange}
                placeholder="Опишите вашу компанию, целевую аудиторию и основные ценности бренда"
                rows={4}
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block">Основной рынок</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketEurope"
                    checked={formData.mainMarket.includes("Europe")}
                    onCheckedChange={(checked) => handleCheckboxChange("mainMarket", "Europe")}
                  />
                  <Label htmlFor="marketEurope">Европа</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketUSA"
                    checked={formData.mainMarket.includes("USA")}
                    onCheckedChange={(checked) => handleCheckboxChange("mainMarket", "USA")}
                  />
                  <Label htmlFor="marketUSA">США</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketRussia"
                    checked={formData.mainMarket.includes("Russia")}
                    onCheckedChange={(checked) => handleCheckboxChange("mainMarket", "Russia")}
                  />
                  <Label htmlFor="marketRussia">Россия/СНГ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketOther"
                    checked={formData.mainMarket.includes("Other")}
                    onCheckedChange={(checked) => handleCheckboxChange("mainMarket", "Other")}
                  />
                  <Label htmlFor="marketOther">Другое</Label>
                </div>
              </div>
              {formData.mainMarket.includes("Other") && (
                <Input
                  name="otherMarket"
                  value={formData.otherMarket}
                  onChange={handleChange}
                  placeholder="Укажите другой рынок"
                  className="mt-2"
                />
              )}
            </div>
            <div>
              <Label htmlFor="competitors" className="text-base font-medium">
                Конкуренты
              </Label>
              <Textarea
                id="competitors"
                name="competitors"
                value={formData.competitors}
                onChange={handleChange}
                placeholder="Укажите 2-3 основных конкурента с их веб-сайтами"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Block 2: Assortment and Catalog */}
        <Card className="shadow-lg border-t-4 border-purple-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Ассортимент и каталог</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">Категории товаров</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categoryClothing"
                    checked={formData.productCategories.includes("Clothing")}
                    onCheckedChange={(checked) => handleCheckboxChange("productCategories", "Clothing")}
                  />
                  <Label htmlFor="categoryClothing">Одежда</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categoryAccessories"
                    checked={formData.productCategories.includes("Accessories")}
                    onCheckedChange={(checked) => handleCheckboxChange("productCategories", "Accessories")}
                  />
                  <Label htmlFor="categoryAccessories">Аксессуары</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categoryShoes"
                    checked={formData.productCategories.includes("Shoes")}
                    onCheckedChange={(checked) => handleCheckboxChange("productCategories", "Shoes")}
                  />
                  <Label htmlFor="categoryShoes">Обувь</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categoryBeauty"
                    checked={formData.productCategories.includes("Beauty")}
                    onCheckedChange={(checked) => handleCheckboxChange("productCategories", "Beauty")}
                  />
                  <Label htmlFor="categoryBeauty">Красота</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categoryHome"
                    checked={formData.productCategories.includes("Home")}
                    onCheckedChange={(checked) => handleCheckboxChange("productCategories", "Home")}
                  />
                  <Label htmlFor="categoryHome">Дом</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categoryOther"
                    checked={formData.productCategories.includes("Other")}
                    onCheckedChange={(checked) => handleCheckboxChange("productCategories", "Other")}
                  />
                  <Label htmlFor="categoryOther">Другое</Label>
                </div>
              </div>
              {formData.productCategories.includes("Other") && (
                <Input
                  name="otherCategory"
                  value={formData.otherCategory}
                  onChange={handleChange}
                  placeholder="Укажите другую категорию"
                  className="mt-2"
                />
              )}
            </div>
            <div>
              <Label htmlFor="productQuantity" className="text-base font-medium">
                Количество товаров (приблизительно)
              </Label>
              <Input
                id="productQuantity"
                name="productQuantity"
                type="number"
                value={formData.productQuantity}
                onChange={handleNumberChange}
                min={0}
                placeholder="100"
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block">Нужны ли коллекции?</Label>
              <RadioGroup
                name="collectionsNeeded"
                value={formData.collectionsNeeded}
                onValueChange={(value) => handleRadioChange("collectionsNeeded", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes (seasonal)" id="collectionsSeasonal" />
                  <Label htmlFor="collectionsSeasonal">Да, сезонные коллекции</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes (by style)" id="collectionsByStyle" />
                  <Label htmlFor="collectionsByStyle">Да, по стилю/тематике</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="collectionsNo" />
                  <Label htmlFor="collectionsNo">Нет, не нужны</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block">Фотографии товаров</Label>
              <RadioGroup
                name="productPhotos"
                value={formData.productPhotos}
                onValueChange={(value) => handleRadioChange("productPhotos", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes, professional" id="photosProfessional" />
                  <Label htmlFor="photosProfessional">Есть профессиональные фото</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes, self-made" id="photosSelfMade" />
                  <Label htmlFor="photosSelfMade">Есть самодельные фото</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No, photographer services needed" id="photosNeeded" />
                  <Label htmlFor="photosNeeded">Нет, нужны услуги фотографа</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Block 3: Design and Branding */}
        <Card className="shadow-lg border-t-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Дизайн и брендинг</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">Есть ли фирменный стиль?</Label>
              <RadioGroup
                name="brandStyle"
                value={formData.brandStyle}
                onValueChange={(value) => handleRadioChange("brandStyle", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes (upload file)" id="brandStyleYes" />
                  <Label htmlFor="brandStyleYes">Да, есть (загрузить файл)</Label>
                </div>
                {formData.brandStyle === "Yes (upload file)" && (
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        id="brandStyleFile"
                        name="brandStyleFile"
                        type="file"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.gif,.pdf"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                      />
                      {formData.brandStyleFile && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeFile}
                          className="p-1 h-8 w-8 bg-transparent"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {formData.brandStyleFile && (
                      <p className="text-sm text-slate-500">Загружен файл: {formData.brandStyleFile.name}</p>
                    )}
                    <p className="text-xs text-slate-500">Поддерживаемые форматы: JPG, PNG, GIF, PDF (макс. 10MB)</p>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No, needs development" id="brandStyleNo" />
                  <Label htmlFor="brandStyleNo">Нет, нужна разработка</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="designExamples" className="text-base font-medium">
                Примеры дизайна, которые нравятся
              </Label>
              <Textarea
                id="designExamples"
                name="designExamples"
                value={formData.designExamples}
                onChange={handleChange}
                placeholder="Поделитесь ссылками на сайты, которые вам нравятся по дизайну"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="designStyle" className="text-base font-medium">
                Предпочитаемый стиль дизайна
              </Label>
              <Select
                name="designStyle"
                value={formData.designStyle}
                onValueChange={(value) => handleSelectChange("designStyle", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите стиль дизайна" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Minimalistic">Минималистичный</SelectItem>
                  <SelectItem value="Premium Fashion">Премиум мода</SelectItem>
                  <SelectItem value="Modern / Trendy">Современный / Трендовый</SelectItem>
                  <SelectItem value="Classic">Классический</SelectItem>
                  <SelectItem value="Playful">Игривый</SelectItem>
                  <SelectItem value="Other">Другой</SelectItem>
                </SelectContent>
              </Select>
              {formData.designStyle === "Other" && (
                <Input
                  name="otherDesignStyle"
                  value={formData.otherDesignStyle}
                  onChange={handleChange}
                  placeholder="Опишите желаемый стиль"
                  className="mt-2"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Block 4: Store Functionality */}
        <Card className="shadow-lg border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Функциональность магазина</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label className="text-base font-medium mb-2 block">Необходимые функции</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcCustomerAccount"
                  checked={formData.funcCustomerAccount}
                  onCheckedChange={(checked) => handleSwitchChange("funcCustomerAccount", checked as boolean)}
                />
                <Label htmlFor="funcCustomerAccount">Личный кабинет покупателя</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcFilters"
                  checked={formData.funcFilters}
                  onCheckedChange={(checked) => handleSwitchChange("funcFilters", checked as boolean)}
                />
                <Label htmlFor="funcFilters">Фильтры товаров</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcWishlist"
                  checked={formData.funcWishlist}
                  onCheckedChange={(checked) => handleSwitchChange("funcWishlist", checked as boolean)}
                />
                <Label htmlFor="funcWishlist">Список желаний</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcCustomerReviews"
                  checked={formData.funcCustomerReviews}
                  onCheckedChange={(checked) => handleSwitchChange("funcCustomerReviews", checked as boolean)}
                />
                <Label htmlFor="funcCustomerReviews">Отзывы покупателей</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcInstagramIntegration"
                  checked={formData.funcInstagramIntegration}
                  onCheckedChange={(checked) => handleSwitchChange("funcInstagramIntegration", checked as boolean)}
                />
                <Label htmlFor="funcInstagramIntegration">Интеграция с Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcBlog"
                  checked={formData.funcBlog}
                  onCheckedChange={(checked) => handleSwitchChange("funcBlog", checked as boolean)}
                />
                <Label htmlFor="funcBlog">Блог</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcLoyaltyProgram"
                  checked={formData.funcLoyaltyProgram}
                  onCheckedChange={(checked) => handleSwitchChange("funcLoyaltyProgram", checked as boolean)}
                />
                <Label htmlFor="funcLoyaltyProgram">Программа лояльности</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funcPopups"
                  checked={formData.funcPopups}
                  onCheckedChange={(checked) => handleSwitchChange("funcPopups", checked as boolean)}
                />
                <Label htmlFor="funcPopups">Всплывающие окна</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Block 5: Payment and Currencies */}
        <Card className="shadow-lg border-t-4 border-pink-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Оплата и валюты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="mainCurrency" className="text-base font-medium">
                Основная валюта
              </Label>
              <Select
                name="mainCurrency"
                value={formData.mainCurrency}
                onValueChange={(value) => handleSelectChange("mainCurrency", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (Евро)</SelectItem>
                  <SelectItem value="USD">USD (Доллар США)</SelectItem>
                  <SelectItem value="GBP">GBP (Фунт стерлингов)</SelectItem>
                  <SelectItem value="RUB">RUB (Российский рубль)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block">Способы оплаты</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentBankCards"
                    checked={formData.paymentMethods.includes("Bank cards")}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentMethods", "Bank cards")}
                  />
                  <Label htmlFor="paymentBankCards">Банковские карты</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentPayPal"
                    checked={formData.paymentMethods.includes("PayPal")}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentMethods", "PayPal")}
                  />
                  <Label htmlFor="paymentPayPal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentKlarnaAfterpay"
                    checked={formData.paymentMethods.includes("Klarna / Afterpay")}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentMethods", "Klarna / Afterpay")}
                  />
                  <Label htmlFor="paymentKlarnaAfterpay">Klarna / Afterpay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentApplePay"
                    checked={formData.paymentMethods.includes("Apple Pay")}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentMethods", "Apple Pay")}
                  />
                  <Label htmlFor="paymentApplePay">Apple Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentGooglePay"
                    checked={formData.paymentMethods.includes("Google Pay")}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentMethods", "Google Pay")}
                  />
                  <Label htmlFor="paymentGooglePay">Google Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentOther"
                    checked={formData.paymentMethods.includes("Other")}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentMethods", "Other")}
                  />
                  <Label htmlFor="paymentOther">Другое</Label>
                </div>
              </div>
              {formData.paymentMethods.includes("Other") && (
                <Input
                  name="otherPaymentMethod"
                  value={formData.otherPaymentMethod}
                  onChange={handleChange}
                  placeholder="Укажите другой способ оплаты"
                  className="mt-2"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="multiCurrency" className="text-base font-medium">
                Мультивалютность
              </Label>
              <Switch
                id="multiCurrency"
                checked={formData.multiCurrency}
                onCheckedChange={(checked) => handleSwitchChange("multiCurrency", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Block 6: Delivery */}
        <Card className="shadow-lg border-t-4 border-cyan-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Доставка</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">Службы доставки</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryDHL"
                    checked={formData.deliveryServices.includes("DHL")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryServices", "DHL")}
                  />
                  <Label htmlFor="deliveryDHL">DHL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryFedEx"
                    checked={formData.deliveryServices.includes("FedEx")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryServices", "FedEx")}
                  />
                  <Label htmlFor="deliveryFedEx">FedEx</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryCDEK"
                    checked={formData.deliveryServices.includes("CDEK")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryServices", "CDEK")}
                  />
                  <Label htmlFor="deliveryCDEK">CDEK</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryUPS"
                    checked={formData.deliveryServices.includes("UPS")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryServices", "UPS")}
                  />
                  <Label htmlFor="deliveryUPS">UPS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryLocal"
                    checked={formData.deliveryServices.includes("Local")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryServices", "Local")}
                  />
                  <Label htmlFor="deliveryLocal">Местная доставка</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryOther"
                    checked={formData.deliveryServices.includes("Other")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryServices", "Other")}
                  />
                  <Label htmlFor="deliveryOther">Другое</Label>
                </div>
              </div>
              {formData.deliveryServices.includes("Other") && (
                <Input
                  name="otherDeliveryService"
                  value={formData.otherDeliveryService}
                  onChange={handleChange}
                  placeholder="Укажите другую службу доставки"
                  className="mt-2"
                />
              )}
            </div>
            <div>
              <Label htmlFor="freeShippingAmount" className="text-base font-medium">
                Сумма для бесплатной доставки
              </Label>
              <Input
                id="freeShippingAmount"
                name="freeShippingAmount"
                type="number"
                value={formData.freeShippingAmount}
                onChange={handleNumberChange}
                min={0}
                placeholder="100"
              />
            </div>
            <div>
              <Label className="text-base font-medium mb-2 block">География доставки</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="geoEurope"
                    checked={formData.deliveryGeography.includes("Europe")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryGeography", "Europe")}
                  />
                  <Label htmlFor="geoEurope">Европа</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="geoUSA"
                    checked={formData.deliveryGeography.includes("USA")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryGeography", "USA")}
                  />
                  <Label htmlFor="geoUSA">США</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="geoRussia"
                    checked={formData.deliveryGeography.includes("Russia")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryGeography", "Russia")}
                  />
                  <Label htmlFor="geoRussia">Россия/СНГ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="geoWorldwide"
                    checked={formData.deliveryGeography.includes("Worldwide")}
                    onCheckedChange={(checked) => handleCheckboxChange("deliveryGeography", "Worldwide")}
                  />
                  <Label htmlFor="geoWorldwide">Весь мир</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Block 7: Marketing and Integrations */}
        <Card className="shadow-lg border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Маркетинг и интеграции</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label className="text-base font-medium mb-2 block">Необходимые интеграции</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingFacebookPixel"
                  checked={formData.marketingFacebookPixel}
                  onCheckedChange={(checked) => handleSwitchChange("marketingFacebookPixel", checked as boolean)}
                />
                <Label htmlFor="marketingFacebookPixel">Facebook Pixel / Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingGoogleAnalytics"
                  checked={formData.marketingGoogleAnalytics}
                  onCheckedChange={(checked) => handleSwitchChange("marketingGoogleAnalytics", checked as boolean)}
                />
                <Label htmlFor="marketingGoogleAnalytics">Google Analytics / GA4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingEmail"
                  checked={formData.marketingEmail}
                  onCheckedChange={(checked) => handleSwitchChange("marketingEmail", checked as boolean)}
                />
                <Label htmlFor="marketingEmail">Email маркетинг</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingSEO"
                  checked={formData.marketingSEO}
                  onCheckedChange={(checked) => handleSwitchChange("marketingSEO", checked as boolean)}
                />
                <Label htmlFor="marketingSEO">SEO оптимизация</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingCRM"
                  checked={formData.marketingCRM}
                  onCheckedChange={(checked) => handleSwitchChange("marketingCRM", checked as boolean)}
                />
                <Label htmlFor="marketingCRM">CRM система</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Block 8: Content and Pages */}
        <Card className="shadow-lg border-t-4 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Контент и страницы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">Дополнительные страницы</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageAboutBrand"
                    checked={formData.pageAboutBrand}
                    onCheckedChange={(checked) => handleSwitchChange("pageAboutBrand", checked as boolean)}
                  />
                  <Label htmlFor="pageAboutBrand">О бренде</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageLookbook"
                    checked={formData.pageLookbook}
                    onCheckedChange={(checked) => handleSwitchChange("pageLookbook", checked as boolean)}
                  />
                  <Label htmlFor="pageLookbook">Лукбук</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageFAQ"
                    checked={formData.pageFAQ}
                    onCheckedChange={(checked) => handleSwitchChange("pageFAQ", checked as boolean)}
                  />
                  <Label htmlFor="pageFAQ">Часто задаваемые вопросы</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageReturnPolicy"
                    checked={formData.pageReturnPolicy}
                    onCheckedChange={(checked) => handleSwitchChange("pageReturnPolicy", checked as boolean)}
                  />
                  <Label htmlFor="pageReturnPolicy">Политика возврата</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageSizeChart"
                    checked={formData.pageSizeChart}
                    onCheckedChange={(checked) => handleSwitchChange("pageSizeChart", checked as boolean)}
                  />
                  <Label htmlFor="pageSizeChart">Таблица размеров</Label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="multiLanguage" className="text-base font-medium">
                Мультиязычность
              </Label>
              <Switch
                id="multiLanguage"
                checked={formData.multiLanguage}
                onCheckedChange={(checked) => handleSwitchChange("multiLanguage", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Block 9: Administration */}
        <Card className="shadow-lg border-t-4 border-red-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Администрирование</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="storeManager" className="text-base font-medium">
                Кто будет управлять магазином?
              </Label>
              <Select
                name="storeManager"
                value={formData.storeManager}
                onValueChange={(value) => handleSelectChange("storeManager", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите вариант" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Myself">Я сам(а)</SelectItem>
                  <SelectItem value="My employee">Мой сотрудник</SelectItem>
                  <SelectItem value="Need support from you">Нужна поддержка от вас</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="shopifyTraining" className="text-base font-medium">
                Нужно ли обучение работе с Shopify?
              </Label>
              <Switch
                id="shopifyTraining"
                checked={formData.shopifyTraining}
                onCheckedChange={(checked) => handleSwitchChange("shopifyTraining", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Block 10: Deadlines and Budget */}
        <Card className="shadow-lg border-t-4 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Сроки и бюджет</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="desiredLaunchDate" className="text-base font-medium">
                Желаемая дата запуска
              </Label>
              <Input
                id="desiredLaunchDate"
                name="desiredLaunchDate"
                type="date"
                value={formData.desiredLaunchDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="projectBudget" className="text-base font-medium">
                Бюджет проекта
              </Label>
              <Select
                name="projectBudget"
                value={formData.projectBudget}
                onValueChange={(value) => handleSelectChange("projectBudget", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите бюджет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-2000">1000 - 2000 евро</SelectItem>
                  <SelectItem value="3000-5000">3000 - 5000 евро</SelectItem>
                  <SelectItem value="5000-8000">5000 - 8000 евро</SelectItem>
                  <SelectItem value="8000-12000">8000 - 12000 евро</SelectItem>
                </SelectContent>
              </Select>
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
