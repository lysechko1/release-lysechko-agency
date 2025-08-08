"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send, CheckCircle, ArrowRight } from "lucide-react"
import { countries } from "@/lib/countries"
import type { Language, translations } from "@/lib/i18n"
import { trackFormSubmit } from "@/types/analytics"

interface SalesModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  packagePrice: string
  language: Language
  t: (key: keyof typeof translations) => string
}

export function SalesModal({ isOpen, onClose, packageName, packagePrice, language, t }: SalesModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [messenger, setMessenger] = useState("whatsapp")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        const detectedCountry = countries.find((country) => country.code === data.country_code)
        if (detectedCountry) {
          setSelectedCountry(detectedCountry)
        }
      } catch (error) {
        console.log("Could not detect country, using default")
      }
    }

    if (isOpen) {
      detectCountry()
      setIsSubmitted(false)
      setName("")
      setPhone("")
      setEmail("")
      setMessenger("whatsapp")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const fullPhoneNumber = `${selectedCountry.dialCode}${phone}`

    try {
      const response = await fetch("/api/send-sales-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone: fullPhoneNumber,
          email,
          messenger,
          country: selectedCountry.name,
          packageName,
          packagePrice,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setName("")
        setPhone("")
        setEmail("")
        setMessenger("whatsapp")

        trackFormSubmit("sales")
      } else {
        const errorData = await response.json()
        console.error("Sales request API call failed:", errorData)
      }
    } catch (error) {
      console.error("Error sending sales request:", error)
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[378px] w-[90%] mx-auto rounded-xl bg-white dark:bg-neutral-900 border-0 shadow-2xl p-0 overflow-hidden"
        onPointerDownOutside={onClose}
      >
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-black mb-3">
              {isSubmitted ? t("salesThankYouHeading") : t("salesModalTitle")}
            </DialogTitle>
            <p className="text-black/80 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              {isSubmitted ? t("salesThankYouSubheading") : t("salesModalSubtitle")}
            </p>
          </DialogHeader>
        </div>

        {isSubmitted ? (
          <div className="px-6 py-8 text-center space-y-6 animate-in fade-in duration-500">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
            <Button
              onClick={onClose}
              className="group w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:from-blue-700 hover:to-purple-700"
            >
              {t("closeModal")}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        ) : (
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center text-lg font-semibold text-slate-800 dark:text-slate-200">
                {packageName} - {packagePrice}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("nameLabel")}
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  required
                  className="h-12 border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("phoneLabel")}
                </Label>
                <div className="flex space-x-2">
                  <Select
                    value={selectedCountry.code}
                    onValueChange={(value) => {
                      const country = countries.find((c) => c.code === value)
                      if (country) setSelectedCountry(country)
                    }}
                  >
                    <SelectTrigger className="w-32 h-12 border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-amber-400">
                      <SelectValue>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{selectedCountry.flag}</span>
                          <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{country.flag}</span>
                            <span className="text-sm">{country.dialCode}</span>
                            <span className="text-sm text-gray-600">{country.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t("phonePlaceholder")}
                    required
                    className="flex-1 h-12 border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("emailLabel")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="h-12 border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("messengerLabel")}</Label>
                <RadioGroup value={messenger} onValueChange={setMessenger} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp-sales" className="border-amber-400 text-amber-400" />
                    <Label htmlFor="whatsapp-sales" className="flex items-center space-x-2 cursor-pointer">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span>{t("whatsapp")}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="telegram" id="telegram-sales" className="border-amber-400 text-amber-400" />
                    <Label htmlFor="telegram-sales" className="flex items-center space-x-2 cursor-pointer">
                      <Send className="w-4 h-4 text-blue-500" />
                      <span>{t("telegram")}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !name || !phone || !email}
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  t("orderButton")
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
