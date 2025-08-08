"use client" // Add "use client" directive

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Linkedin } from "lucide-react"
import { useState } from "react" // Import useState
import { SalesModal } from "@/components/sales-modal" // Import SalesModal
import type { Language, translations } from "@/lib/i18n" // Import types

interface CeoSectionProps {
  language: Language // Add language prop
  t: (key: keyof typeof translations) => string // Add t prop
}

export default function CeoSection({ language, t }: CeoSectionProps) {
  // Removed internal useTranslation hook
  const [showSalesModal, setShowSalesModal] = useState(false) // State for SalesModal visibility
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string } | null>(null) // State for package details

  const handleCloseSalesModal = () => {
    setShowSalesModal(false)
    setSelectedPackage(null)
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-10">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
                {t("ceoSectionHeadline")}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                {t("ceoSectionSubheadline")}
              </p>
            </div>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {t("ceoSectionDescription")}
            </p>
            <Button
              size="lg"
              className="group bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              onClick={() => {
                setSelectedPackage({ name: t("directAccessToLeadership"), price: t("freeAccess") }) // Set unique package name and price
                setShowSalesModal(true)
              }}
            >
              {t("directAccessToLeadership")}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Card className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{t("whyLeadershipMatters")}</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{t("leadershipMattersDescription")}</p>
            </Card>
          </div>
          <div className="relative mt-8 lg:mt-0 flex flex-col items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-1 animate-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                <Image
                  src="/images/lysechko-portrait.svg"
                  alt={t("ceoName")}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full scale-105"
                />
              </div>
            </div>
            <div className="text-center mt-6 sm:mt-8 space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">{t("ceoName")}</h3>
              <p className="text-lg sm:text-xl text-slate-300">
                {t("ceoTitle")}{" "}
                <a
                  href="https://www.linkedin.com/in/vladyslav-lysechko-6a9a15188/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Linkedin className="w-5 h-5 ml-1" />
                </a>
              </p>
              <p className="text-base sm:text-lg text-slate-400">{t("ceoMotto")}</p>
            </div>
          </div>
        </div>
      </div>
      {showSalesModal && selectedPackage && (
        <SalesModal
          isOpen={showSalesModal}
          onClose={handleCloseSalesModal}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
          language={language} // Pass language prop
          t={t} // Pass t prop
        />
      )}
    </section>
  )
}
