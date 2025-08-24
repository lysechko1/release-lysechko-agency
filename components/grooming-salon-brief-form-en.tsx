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

interface GroomingSalonBriefFormEnProps {
  language: Language
  t: (key: string) => string
}

interface FormData {
  // 1. Contact Information
  contactName: string
  contactPhone: string
  contactEmail: string
  
  // 2. Salon Information
  salonName: string
  salonAddress: string
  salonWebsite: string
  
  // 3. What you need from us
  services: string[]
  otherService: string
  
  // 4. Clients
  clientsDescription: string
  
  // 5. Client Problems
  clientProblems: string
  
  // 6. Client Objections
  clientObjections: string
  
  // 7. Client Geography
  clientGeography: string
  otherGeography: string
  
  // 8. Competitors
  competitors: string
  
  // 9. Start Date
  startDate: string
  
  // 10. Budget
  budget: string
  
  // 11. Advertising Language
  advertisingLanguage: string
  otherLanguage: string
  
  // 12. Additional Information
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

export default function GroomingSalonBriefFormEn({ language, t }: GroomingSalonBriefFormEnProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("groomingSalonBriefFormEn")
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
    localStorage.setItem("groomingSalonBriefFormEn", JSON.stringify(formData))
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
        localStorage.removeItem("groomingSalonBriefFormEn")
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
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">📋 Brief for Grooming Salon Advertising Launch (Poland)</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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

        {/* 1. Contact Information */}
        <Card className="shadow-lg border-t-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">1. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactName" className="text-base font-medium">
                  Full Name
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
                <Label htmlFor="contactPhone" className="text-base font-medium">
                  Phone
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
                placeholder="john@example.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Salon Information */}
        <Card className="shadow-lg border-t-4 border-amber-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">2. Salon Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="salonName" className="text-base font-medium">
                Salon Name
              </Label>
              <Input
                id="salonName"
                name="salonName"
                value={formData.salonName}
                onChange={handleChange}
                placeholder="Your salon name"
                required
              />
            </div>
            <div>
              <Label htmlFor="salonAddress" className="text-base font-medium">
                Address
              </Label>
              <Input
                id="salonAddress"
                name="salonAddress"
                value={formData.salonAddress}
                onChange={handleChange}
                placeholder="Street, number, city"
              />
            </div>
            <div>
              <Label htmlFor="salonWebsite" className="text-base font-medium">
                Website or Social Media
              </Label>
              <Input
                id="salonWebsite"
                name="salonWebsite"
                value={formData.salonWebsite}
                onChange={handleChange}
                placeholder="www.example.com or @instagram"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. What you need from us */}
        <Card className="shadow-lg border-t-4 border-purple-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">3. What do you need from us?</CardTitle>
            <p className="text-slate-600">Check what is relevant for you:</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceFacebook"
                  checked={formData.services.includes("Facebook")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Facebook")}
                />
                <Label htmlFor="serviceFacebook">Facebook Advertising</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceInstagram"
                  checked={formData.services.includes("Instagram")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Instagram")}
                />
                <Label htmlFor="serviceInstagram">Instagram Advertising</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceGoogle"
                  checked={formData.services.includes("Google")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Google")}
                />
                <Label htmlFor="serviceGoogle">Google Advertising</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceChatbot"
                  checked={formData.services.includes("Chatbot")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Chatbot")}
                />
                <Label htmlFor="serviceChatbot">Chatbot Development</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceWebsite"
                  checked={formData.services.includes("Website")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Website")}
                />
                <Label htmlFor="serviceWebsite">Website Development</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceYouTube"
                  checked={formData.services.includes("YouTube")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "YouTube")}
                />
                <Label htmlFor="serviceYouTube">YouTube Promotion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceTikTok"
                  checked={formData.services.includes("TikTok")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "TikTok")}
                />
                <Label htmlFor="serviceTikTok">TikTok Promotion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceApp"
                  checked={formData.services.includes("Mobile App")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Mobile App")}
                />
                <Label htmlFor="serviceApp">Mobile Application</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="serviceOther"
                  checked={formData.services.includes("Other")}
                  onCheckedChange={(checked) => handleCheckboxChange("services", "Other")}
                />
                <Label htmlFor="serviceOther">Other</Label>
              </div>
            </div>
            {formData.services.includes("Other") && (
              <Input
                name="otherService"
                value={formData.otherService}
                onChange={handleChange}
                placeholder="Specify what exactly"
                className="mt-2"
              />
            )}
          </CardContent>
        </Card>

        {/* 4. Clients */}
        <Card className="shadow-lg border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">4. Your Clients (who comes to the salon)</CardTitle>
            <p className="text-slate-600">Describe 2-3 groups of your clients.</p>
            <p className="text-sm text-slate-500">✍ Examples:</p>
            <ul className="text-sm text-slate-500 list-disc list-inside space-y-1">
              <li>Young girls with small dogs (Yorkies, Spitz, Chihuahuas).</li>
              <li>Families with children and medium-sized dogs.</li>
              <li>Elderly people with small calm pets.</li>
            </ul>
            <p className="text-slate-600 mt-2">Write in your own words:</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="clientsDescription"
              value={formData.clientsDescription}
              onChange={handleChange}
              placeholder="Describe your clients..."
              rows={6}
              required
            />
          </CardContent>
        </Card>

        {/* 5. Client Problems */}
        <Card className="shadow-lg border-t-4 border-red-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">5. Your Clients' Problems</CardTitle>
            <p className="text-slate-600">What do your clients most often dislike about other salons?</p>
            <p className="text-sm text-slate-500">✍ Write in your own words (for example: painful for the dog, poorly groomed, long wait, unpleasant smell, etc.):</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="clientProblems"
              value={formData.clientProblems}
              onChange={handleChange}
              placeholder="Describe client problems..."
              rows={4}
              required
            />
          </CardContent>
        </Card>

        {/* 6. Client Objections */}
        <Card className="shadow-lg border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">6. What prevents people from booking with you?</CardTitle>
            <p className="text-slate-600">What objections or doubts do clients have?</p>
            <p className="text-sm text-slate-500">✍ Write in your own words (for example: "too expensive", "takes too long", "too far to travel"):</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="clientObjections"
              value={formData.clientObjections}
              onChange={handleChange}
              placeholder="Describe client objections..."
              rows={4}
              required
            />
          </CardContent>
        </Card>

        {/* 7. Client Geography */}
        <Card className="shadow-lg border-t-4 border-cyan-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">7. Where do clients come from?</CardTitle>
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
                <Label htmlFor="geoDistrict">Only from this district</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Different districts" id="geoDifferent" />
                <Label htmlFor="geoDifferent">From different districts of the city</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Neighboring cities" id="geoNeighboring" />
                <Label htmlFor="geoNeighboring">From neighboring cities</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="geoOther" />
                <Label htmlFor="geoOther">Other</Label>
              </div>
            </RadioGroup>
            {formData.clientGeography === "Other" && (
              <Input
                name="otherGeography"
                value={formData.otherGeography}
                onChange={handleChange}
                placeholder="Specify what exactly"
                className="mt-2"
              />
            )}
          </CardContent>
        </Card>

        {/* 8. Competitors */}
        <Card className="shadow-lg border-t-4 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">8. Competitors</CardTitle>
            <p className="text-slate-600">What competitors do you have (salon names or links)?</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="competitors"
              value={formData.competitors}
              onChange={handleChange}
              placeholder="List your competitors..."
              rows={3}
            />
          </CardContent>
        </Card>

        {/* 9. Start Date */}
        <Card className="shadow-lg border-t-4 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">9. When do we start working?</CardTitle>
            <p className="text-slate-600">When do you plan to start working with us?</p>
            <p className="text-sm text-slate-500">✍ Specify a date or period (for example: "immediately", "in a month", "from March 1st"):</p>
          </CardHeader>
          <CardContent>
            <Input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="When do you plan to start?"
              required
            />
          </CardContent>
        </Card>

        {/* 10. Budget */}
        <Card className="shadow-lg border-t-4 border-pink-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">10. Budget</CardTitle>
            <p className="text-slate-600">What budget for advertising are you ready to allocate per month?</p>
          </CardHeader>
          <CardContent>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Specify budget per month"
              required
            />
          </CardContent>
        </Card>

        {/* 11. Advertising Language */}
        <Card className="shadow-lg border-t-4 border-teal-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">11. Advertising and Materials Language</CardTitle>
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
                <Label htmlFor="langPolish">Polish only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Polish + English" id="langPolishEnglish" />
                <Label htmlFor="langPolishEnglish">Polish + English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Polish + Russian/Ukrainian" id="langPolishRussian" />
                <Label htmlFor="langPolishRussian">Polish + Russian/Ukrainian (for immigrants)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="langOther" />
                <Label htmlFor="langOther">Other</Label>
              </div>
            </RadioGroup>
            {formData.advertisingLanguage === "Other" && (
              <Input
                name="otherLanguage"
                value={formData.otherLanguage}
                onChange={handleChange}
                placeholder="Specify what exactly"
                className="mt-2"
              />
            )}
          </CardContent>
        </Card>

        {/* 12. Additional Information */}
        <Card className="shadow-lg border-t-4 border-violet-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">12. Additional Information</CardTitle>
            <p className="text-slate-600">What special services or advantages do you want to emphasize in advertising?</p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Additional information..."
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
