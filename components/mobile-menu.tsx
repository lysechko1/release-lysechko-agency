"use client"
import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Language } from "@/lib/i18n" // Import useTranslation

interface MobileMenuProps {
  language: Language // Use Language type from i18n
  t: (key: string) => string
  onBookConsultation: () => void
  isLightBackground?: boolean // New prop to indicate if the background is light
}

export default function MobileMenu({ language, t, onBookConsultation, isLightBackground = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleBookConsultationClick = () => {
    onBookConsultation()
    setIsOpen(false) // Close the menu when consultation is booked
  }

  const buttonClasses = cn(
    "fixed top-4 right-4 z-[60] bg-transparent border-2 backdrop-blur-sm transition-all duration-300",
    isLightBackground
      ? "border-gray-900/20 hover:bg-gray-900/10" // Darker border for light background
      : "border-white/20 hover:bg-white/10", // Lighter border for dark background (default)
    isOpen && "border-amber-400 hover:border-amber-500", // Yellow-orange border when open, overrides previous border
    "shadow-lg shadow-purple-400/50", // Added light purple glow
  )

  const iconClasses = cn(
    "w-5 h-5 transition-transform duration-300",
    "text-gray-300", // Icon color is now light gray (this will be the stroke color)
  )

  const getLocalizedPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  return (
    <>
      {/* Burger Icon */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className={cn(iconClasses, "rotate-90")} stroke="currentColor" strokeWidth="2" />
        ) : (
          <Menu className={iconClasses} stroke="currentColor" strokeWidth="2" />
        )}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white z-[55] shadow-lg transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-8 h-full flex flex-col justify-between">
          {/* Navigation Items */}
          <nav className="space-y-6 mt-16">
            {/* Added Home link */}
            <a
              href={getLocalizedPath("/")}
              onClick={() => setIsOpen(false)}
              className="block text-3xl font-bold text-white hover:text-amber-400 transition-colors duration-300 py-2 animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0s" }} // Adjusted delay for first item
            >
              {t("home")}
            </a>
            <a
              href={getLocalizedPath("/blog")} // Added blog link
              onClick={() => setIsOpen(false)}
              className="block text-3xl font-bold text-white hover:text-amber-400 transition-colors duration-300 py-2 animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0.1s" }}
            >
              {t("blog")}
            </a>
            <a
              href={getLocalizedPath("/contacts")} // Updated link
              onClick={() => setIsOpen(false)}
              className="block text-3xl font-bold text-white hover:text-amber-400 transition-colors duration-300 py-2 animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0.2s" }}
            >
              {t("contact")}
            </a>
            <a
              href={getLocalizedPath("/#case-studies")} // Link to section on homepage
              onClick={() => setIsOpen(false)}
              className="block text-3xl font-bold text-white hover:text-amber-400 transition-colors duration-300 py-2 animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0.3s" }}
            >
              {t("viewCaseStudies")}
            </a>
            {/* Add more navigation items here as needed */}
          </nav>

          {/* Contact Page Menu Block */}
          <div className="mt-auto space-y-6 py-8">
            <h3
              className="text-4xl font-bold leading-tight animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0.3s" }}
            >
              {t("menuBlockTitle")}
            </h3>
            <p
              className="text-lg text-slate-300 animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0.4s" }}
            >
              {t("menuBlockSubtitle")}
            </p>
            <Button
              size="lg"
              onClick={handleBookConsultationClick}
              className="group w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 animate-in slide-in-from-right-10 fade-in duration-500"
              style={{ animationDelay: "0.5s" }}
            >
              {t("bookConsultation")}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
