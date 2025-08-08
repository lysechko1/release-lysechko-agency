"use client"

import { useTranslation } from "@/lib/i18n"
import MobileMenu from "@/components/mobile-menu"
import { ConsultationModal } from "@/components/consultation-modal"
import { useState } from "react"
import LanguageSwitcher from "@/components/language-switcher" // Import LanguageSwitcher
import { Mail, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
  const { language, t } = useTranslation() // Removed setLanguage
  const [showConsultationModal, setShowConsultationModal] = useState(false)

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
      {/* Language Switcher */}
      <LanguageSwitcher language={language} t={t} />
      {/* Mobile Menu (Burger Icon and Sidebar) */}
      <MobileMenu language={language} t={t} onBookConsultation={() => setShowConsultationModal(true)} />

      <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t("privacyPolicyTitle")}</h1>
            <p className="text-lg sm:text-xl text-slate-600">{t("privacyPolicySubtitle")}</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6 text-slate-700">
            <p>{t("privacyPolicyIntro")}</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("informationCollection")}</h2>
            <p>{t("informationCollectionDesc")}</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>{t("personalData")}:</strong> {t("personalDataDesc")}
              </li>
              <li>
                <strong>{t("usageData")}:</strong> {t("usageDataDesc")}
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("useOfData")}</h2>
            <p>{t("useOfDataDesc")}</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>{t("provideAndMaintainService")}</li>
              <li>{t("manageAccount")}</li>
              <li>{t("contactYou")}</li>
              <li>{t("provideNews")}</li>
              <li>{t("manageRequests")}</li>
              <li>{t("businessTransfers")}</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("disclosureOfData")}</h2>
            <p>{t("disclosureOfDataDesc")}</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>{t("serviceProviders")}:</strong> {t("serviceProvidersDesc")}
              </li>
              <li>
                <strong>{t("businessTransfers")}:</strong> {t("businessTransfersDesc")}
              </li>
              <li>
                <strong>{t("lawEnforcement")}:</strong> {t("lawEnforcementDesc")}
              </li>
              <li>
                <strong>{t("otherLegalRequirements")}:</strong> {t("otherLegalRequirementsDesc")}
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("securityOfData")}</h2>
            <p>{t("securityOfDataDesc")}</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("childrensPrivacy")}</h2>
            <p>{t("childrensPrivacyDesc")}</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("linksToOtherWebsites")}</h2>
            <p>{t("linksToOtherWebsitesDesc")}</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("changesToPrivacyPolicy")}</h2>
            <p>{t("changesToPrivacyPolicyDesc")}</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">{t("contactUs")}</h2>
            <p>{t("contactUsPrivacyDesc")}</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                {t("byEmail")}:{" "}
                <a href="mailto:info@lysechko.agency" className="text-amber-500 hover:underline">
                  info@lysechko.agency
                </a>
              </li>
              <li>
                {t("byPhone")}:{" "}
                <a href="tel:+380631955673" className="text-amber-500 hover:underline">
                  +38 (063) 195 56 73
                </a>
              </li>
            </ul>
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
        language={language} // Add language prop
        t={t} // Add t prop
      />
    </div>
  )
}
