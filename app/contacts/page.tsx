"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send, CheckCircle, Mail, Phone } from "lucide-react"
import { type CountryData, countries } from "@/lib/countries"
import { ConsultationModal } from "@/components/consultation-modal"
import MobileMenu from "@/components/mobile-menu"
import LanguageSwitcher from "@/components/language-switcher"
import { useTranslation } from "@/lib/i18n"
import { trackFormSubmit } from "@/types/analytics"

export default function ContactPage() {
  const { language, t } = useTranslation()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(countries[0])
  const [messenger, setMessenger] = useState("whatsapp")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConsultationModal, setShowConsultationModal] = useState(false)

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

    detectCountry()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const fullPhoneNumber = `${selectedCountry.dialCode}${phone}`

    try {
      const response = await fetch("/api/send-contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone: fullPhoneNumber,
          email,
          message,
          messenger,
          country: selectedCountry.name,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setName("")
        setPhone("")
        setEmail("")
        setMessage("")
        setMessenger("whatsapp")

        trackFormSubmit("contact")
      } else {
        const errorData = await response.json()
        console.error("Contact form API call failed:", errorData)
      }
    } catch (error) {
      console.error("Error sending contact form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseConsultationModal = (scrollToId?: string) => {
    setShowConsultationModal(false)
    if (scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(scrollToId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    }
  }

  const getLocalizedPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <LanguageSwitcher language={language} t={t} />

      <MobileMenu language={language} t={t} onBookConsultation={() => setShowConsultationModal(true)} />

      <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t("contactUs")}</h1>
            <p className="text-lg sm:text-xl text-slate-600">{t("contactSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{t("getInTouch")}</h2>
              <p className="text-slate-600">{t("contactInfoDescription")}</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-amber-500" />
                  <a href="mailto:info@lysechko.agency" className="text-slate-700 hover:text-amber-500">
                    info@lysechko.agency
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-amber-500" />
                  <a href="tel:+380631955673" className="text-slate-700 hover:text-amber-500">
                    +38 (063) 195 56 73
                  </a>
                </div>
                <div className="text-slate-700">
                  Lysechko Agency
                  <br />
                  Kyiv, Ukraine
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{t("sendUsAMessage")}</h2>
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
                  <p className="text-xl font-semibold text-slate-800">{t("thankYouMessage")}</p>
                  <p className="text-slate-600">{t("responseTime")}</p>
                  <Button onClick={() => setIsSubmitted(false)} className="mt-4">
                    {t("sendAnotherMessage")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      {t("nameLabel")}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("namePlaceholder")}
                      required
                      className="mt-1 h-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      {t("phoneLabel")}
                    </Label>
                    <div className="flex space-x-2 mt-1">
                      <Select
                        value={selectedCountry.code}
                        onValueChange={(value) => {
                          const country = countries.find((c) => c.code === value)
                          if (country) setSelectedCountry(country)
                        }}
                      >
                        <SelectTrigger className="w-32 h-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400">
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
                        className="flex-1 h-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {t("emailLabel")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      required
                      className="mt-1 h-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      {t("messageLabel")}
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("messagePlaceholder")}
                      rows={5}
                      required
                      className="mt-1 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="whatsapp"
                      name="messenger"
                      value="whatsapp"
                      checked={messenger === "whatsapp"}
                      onChange={() => setMessenger("whatsapp")}
                      className="form-radio h-4 w-4 text-amber-600 transition duration-150 ease-in-out"
                    />
                    <Label htmlFor="whatsapp" className="flex items-center text-sm font-medium text-gray-700">
                      <MessageCircle className="w-4 h-4 mr-1 text-green-500" />
                      {t("whatsapp")}
                    </Label>
                    <input
                      type="radio"
                      id="telegram"
                      name="messenger"
                      value="telegram"
                      checked={messenger === "telegram"}
                      onChange={() => setMessenger("telegram")}
                      className="form-radio h-4 w-4 text-amber-600 transition duration-150 ease-in-out"
                    />
                    <Label htmlFor="telegram" className="flex items-center text-sm font-medium text-gray-700">
                      <Send className="w-4 h-4 mr-1 text-blue-500" />
                      {t("telegram")}
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        <span>{t("processing")}</span>
                      </div>
                    ) : (
                      t("sendMessage")
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 bg-slate-900 text-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="text-lg font-semibold">{t("footerTagline")}</div>
            <p className="text-slate-400 text-sm">
              Lysechko Agency
              <br />
              Kyiv, Ukraine
            </p>
            <p className="text-slate-400 text-sm">
              <Mail className="inline-block w-4 h-4 mr-1 align-middle" />
              info@lysechko.agency
              <br />
              <Phone className="inline-block w-4 h-4 mr-1 align-middle" />
              +38 (063) 195 56 73
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">{t("services")}</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors text-sm">
                  {t("websiteDesignFooter")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors text-sm">
                  {t("googleAdsFooter")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors text-sm">
                  {t("socialMediaMarketing")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors text-sm">
                  {t("seoFooter")}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">{t("contact")}</div>
            <ul className="space-y-2">
              <li>
                <a href={getLocalizedPath("/contacts")} className="hover:text-amber-400 transition-colors text-sm">
                  {t("contact")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/#case-studies")} className="hover:text-amber-400 transition-colors text-sm">
                  {t("viewCases")}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">{t("legal")}</div>
            <ul className="space-y-2">
              <li>
                <a
                  href={getLocalizedPath("/privacy-policy")}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  {t("privacyPolicy")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/terms-of-service")}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  {t("termsOfService")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm">{t("copyright")}</div>
      </footer>
      <ConsultationModal
        isOpen={showConsultationModal}
        onClose={handleCloseConsultationModal}
        language={language}
        t={t}
      />
    </div>
  )
}
