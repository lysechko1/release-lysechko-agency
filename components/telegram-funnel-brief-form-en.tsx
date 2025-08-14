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

interface TelegramFunnelBriefFormProps {
  language: Language
  t: (key: string) => string
}

interface FormData {
  contactName: string
  contactEmail: string
  contactPhone: string
  products: string[]
  otherProduct: string
  funnelCount: string
  keyActions: string[]
  otherAction: string
  targetAudience: string
  differentChains: string
  audienceSegments: string
  botLanguage: string
  otherLanguage: string
  readyTexts: string
  messageTypes: string[]
  otherMessageType: string
  mediaContent: string
  mediaScenario: string
  currentPayments: string
  leelooPayment: string
  afterPayment: string
  otherAfterPayment: string
  additionalMessages: string
  upsellProducts: string
  newsletter: string
  brandStyle: string
  miniLandings: string
  visualMaterials: string
  launchDate: string
  technicalSupport: string
}

const initialFormData: FormData = {
  contactName: "",
  contactEmail: "",
  contactPhone: "",
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
}

export default function TelegramFunnelBriefFormEn({ language, t }: TelegramFunnelBriefFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("telegramFunnelBriefFormEn")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData({ ...initialFormData, ...parsedData })
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("telegramFunnelBriefFormEn", JSON.stringify(formData))
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
        localStorage.removeItem("telegramFunnelBriefFormEn")
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || "Error submitting form")
        setSubmissionStatus("error")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setErrorMessage("Network error. Please check your internet connection.")
      setSubmissionStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submissionStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank you for your application!</h2>
        <p className="text-lg text-slate-600 mb-8">
          Your brief has been successfully sent. We will contact you within 24 hours.
        </p>
        <Button onClick={() => setSubmissionStatus(null)} className="bg-amber-500 hover:bg-amber-600 text-white">
          Send another brief
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
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
            <CardTitle className="text-2xl font-bold text-slate-900">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactName" className="text-base font-medium">
                  Your Name
                </Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail" className="text-base font-medium">
                  Email (optional)
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contactPhone" className="text-base font-medium">
                Phone
              </Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Description and Goals */}
        <Card className="shadow-lg border-t-4 border-amber-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">1. Product Description and Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">1.1. What products do you sell through Telegram?</Label>
              <p className="text-sm text-slate-600 mb-4">(You can select multiple or add your own option)</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productPdf10"
                    checked={formData.products.includes("PDF guide for $10")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "PDF guide for $10")}
                  />
                  <Label htmlFor="productPdf10">PDF guide for $10</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productPdf30"
                    checked={formData.products.includes("PDF guide + template for $30")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "PDF guide + template for $30")}
                  />
                  <Label htmlFor="productPdf30">PDF guide + template for $30</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productConsultation"
                    checked={formData.products.includes("Individual consultations")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "Individual consultations")}
                  />
                  <Label htmlFor="productConsultation">Individual consultations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="productOther"
                    checked={formData.products.includes("Other")}
                    onCheckedChange={(checked) => handleCheckboxChange("products", "Other")}
                  />
                  <Label htmlFor="productOther">Other</Label>
                </div>
              </div>
              {formData.products.includes("Other") && (
                <Input
                  name="otherProduct"
                  value={formData.otherProduct}
                  onChange={handleChange}
                  placeholder="Specify your product"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">1.2. How many funnels do you need to launch?</Label>
              <RadioGroup
                name="funnelCount"
                value={formData.funnelCount}
                onValueChange={(value) => handleRadioChange("funnelCount", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1 general funnel for all products" id="funnel1" />
                  <Label htmlFor="funnel1">1 general funnel for all products</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Separate funnel for each product" id="funnelMultiple" />
                  <Label htmlFor="funnelMultiple">Separate funnel for each product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Not sure — need consultation" id="funnelConsultation" />
                  <Label htmlFor="funnelConsultation">Not sure — need consultation</Label>
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
              Sending brief...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Send Brief
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
