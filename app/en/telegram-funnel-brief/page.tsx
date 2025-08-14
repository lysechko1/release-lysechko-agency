"use client"

import { useState } from "react"
import MobileMenu from "@/components/mobile-menu"
import TelegramFunnelBriefFormEn from "@/components/telegram-funnel-brief-form-en"
import { Mail, Phone } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function TelegramFunnelBriefPage() {
  const { language, t } = useTranslation()
  const [showConsultationModal, setShowConsultationModal] = useState(false)

  const handleCloseConsultationModal = () => {
    setShowConsultationModal(false)
  }

  const getLocalizedPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Mobile Menu (Burger Icon and Sidebar) */}
      <MobileMenu
        language={language}
        t={t}
        onBookConsultation={() => setShowConsultationModal(true)}
        isLightBackground={true}
      />

      {/* Main Content Area */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-slate-900 mb-4">
            📋 Brief for Telegram Funnel Launch via Leeloo.ai
          </h1>
          <p className="text-lg text-center text-slate-600 mb-12">
            Fill out the form below so we can create an effective sales funnel for your business
          </p>
          <TelegramFunnelBriefFormEn language={language} t={t} />
        </div>
      </main>

      {/* Footer Section */}
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
              <br />
              Oleksandr Lysechko - Founder
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
    </div>
  )
}
