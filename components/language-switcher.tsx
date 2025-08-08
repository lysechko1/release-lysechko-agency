"use client"

import { useRouter, usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  language: Language
  t: (key: string) => string
}

export default function LanguageSwitcher({ language, t }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageSwitch = (lang: Language) => {
    let newPath = pathname

    if (lang === "en") {
      // If not already in /en, add /en to the path
      if (!pathname.startsWith("/en")) {
        newPath = "/en" + pathname
      }
    } else {
      // If in /en, remove /en from the path
      if (pathname.startsWith("/en")) {
        newPath = pathname.replace(/^\/en/, "") || "/"
      }
    }
    router.push(newPath)
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white/100"
          >
            <Languages className="w-4 h-4 mr-2" />
            {language.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleLanguageSwitch("en")}>🇺🇸 English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLanguageSwitch("ru")}>🇷🇺 Русский</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
