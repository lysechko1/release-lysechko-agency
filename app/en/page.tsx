"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowRight,
  Star,
  TrendingUp,
  Globe,
  Brain,
  MessageCircle,
  Target,
  Search,
  Instagram,
  Youtube,
  Bot,
  RotateCcw,
  Mail,
  BarChart3,
  CheckCircle,
  Phone,
} from "lucide-react"
import {
  GlobalReachIcon,
  GrowthFocusIcon,
  AIInnovationIcon,
  CommunicationIcon,
  LowSalesIcon,
  IrrelevantLeadsIcon,
  BudgetWasteIcon,
  TriedBeforeIcon,
  ChatbotIcon,
  AutomationIcon,
  AutoRepliesIcon,
  CRMSyncIcon,
  StarIcon,
  DiamondIcon,
  ChartIcon,
  TrendingIcon,
  GlobeIcon,
  HandshakeIcon,
} from "@/components/custom-icons"
import { ConsultationModal } from "@/components/consultation-modal"
import CeoSection from "@/components/ceo-section"
import MobileMenu from "@/components/mobile-menu"
import { useTranslation } from "@/lib/i18n"
import { SalesModal } from "@/components/sales-modal"
import LanguageSwitcher from "@/components/language-switcher" // Import LanguageSwitcher

export default function HomePage() {
  const { language, t } = useTranslation() // Removed setLanguage

  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [showSalesModal, setShowSalesModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("websiteDesign"),
      description: t("websiteDesignDesc"),
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: t("googleAds"),
      description: t("googleAdsDesc"),
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: t("socialAds"),
      description: t("socialAdsDesc"),
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: t("videoMarketing"),
      description: t("videoMarketingDesc"),
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t("smmPr"),
      description: t("smmPrDesc"),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t("seo"),
      description: t("seoDesc"),
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: t("aiChatbots"),
      description: t("aiChatbotsDesc"),
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t("aso"),
      description: t("asoDesc"),
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: t("crmIntegrations"),
      description: t("crmIntegrationsDesc"),
    },
  ]

  const caseStudies = [
    {
      title: "Auto Repair OnDrive, Bulgaria",
      result: "+250%",
      industry: t("automotive"),
      description:
        language === "en"
          ? "Complete digital transformation including website redesign, Google Ads optimization, and local SEO strategy that tripled monthly revenue."
          : "Полная цифровая трансформация, включая редизайн сайта, оптимизацию Google Ads и локальную SEO-стратегию, которая утроила месячную выручку.",
    },
    {
      title: language === "en" ? "E-commerce Fashion Store" : "Интернет-магазин модной одежды",
      result: "+180%",
      industry: t("fashion"),
      description:
        language === "en"
          ? "Instagram and Facebook advertising campaign with influencer partnerships that significantly boosted online sales."
          : "Рекламная кампания в Instagram и Facebook с партнерством с инфлюенсерами, которая значительно увеличила онлайн-продажи.",
    },
    {
      title: language === "en" ? "SaaS Startup Launch" : "Запуск SaaS стартапа",
      result: "+300%",
      industry: t("technology"),
      description:
        language === "en"
          ? "Multi-channel marketing strategy including content marketing, PPC, and conversion optimization."
          : "Многоканальная маркетинговая стратегия, включая контент-маркетинг, PPC и оптимизацию конверсий.",
    },
    {
      title: language === "en" ? "Restaurant Chain Expansion" : "Расширение сети ресторанов",
      result: "+150%",
      industry: t("foodBeverage"),
      description:
        language === "en"
          ? "Local SEO and social media marketing that supported rapid franchise expansion across multiple cities."
          : "Локальное SEO и маркетинг в социальных сетях, которые поддержали быстрое расширение франшизы в нескольких городах.",
    },
    {
      title: language === "en" ? "Healthcare Clinic Growth" : "Рост медицинской клиники",
      result: "+200%",
      industry: t("healthcare"),
      description:
        language === "en"
          ? "Comprehensive digital marketing including website optimization, Google Ads, and reputation management."
          : "Комплексный цифровой маркетинг, включая оптимизацию сайта, Google Ads и управление репутацией.",
    },
    {
      title: language === "en" ? "Real Estate Agency" : "Агентство недвижимости",
      result: "+175%",
      industry: t("realEstate"),
      description:
        language === "en"
          ? "Lead generation system with automated CRM integration and targeted advertising campaigns."
          : "Система генерации лидов с автоматизированной интеграцией CRM и таргетированными рекламными кампаниями.",
    },
    {
      title: language === "en" ? "Fitness Studio Network" : "Сеть фитнес-студий",
      result: "+220%",
      industry: t("fitness"),
      description:
        language === "en"
          ? "Social media marketing and local advertising that drove significant membership growth."
          : "Маркетинг в социальных сетях и локальная реклама, которые привели к значительному росту членства.",
    },
    {
      title: language === "en" ? "B2B Software Company" : "B2B софтверная компания",
      result: "+190%",
      industry: t("software"),
      description:
        language === "en"
          ? "LinkedIn advertising and content marketing strategy that increased qualified demo requests."
          : "Реклама в LinkedIn и стратегия контент-маркетинга, которые увеличили количество квалифицированных запросов на демо.",
    },
    {
      title: language === "en" ? "Online Education Platform" : "Платформа онлайн-образования",
      result: "+280%",
      industry: t("education"),
      description:
        language === "en"
          ? "Multi-platform advertising and conversion optimization that dramatically increased course enrollments."
          : "Многоплатформенная реклама и оптимизация конверсий, которые кардинально увеличили записи на курсы.",
    },
  ]

  const metaPricing = [
    {
      name: t("economy"),
      price: "$300",
      features:
        language === "en"
          ? ["Basic targeting setup", "5 creative variations", "Weekly reporting", "Campaign optimization"]
          : [
              "Базовая настройка таргетинга",
              "5 креативных вариаций",
              "Еженедельная отчетность",
              "Оптимизация кампаний",
            ],
    },
    {
      name: t("standard"),
      price: "$500",
      features:
        language === "en"
          ? [
              "Advanced targeting",
              "10 creative variations",
              "Bi-weekly strategy calls",
              "A/B testing",
              "Landing page review",
            ]
          : [
              "Продвинутый таргетинг",
              "10 креативных вариаций",
              "Стратегические звонки 2 раза в неделю",
              "A/B тестирование",
              "Обзор посадочной страницы",
            ],
    },
    {
      name: t("business"),
      price: "$800",
      features:
        language === "en"
          ? [
              "Premium targeting",
              "15+ creative variations",
              "Weekly strategy calls",
              "Advanced A/B testing",
              "Custom landing page",
              "Conversion tracking",
            ]
          : [
              "Премиум таргетинг",
              "15+ креативных вариаций",
              "Еженедельные стратегические звонки",
              "Продвинутое A/B тестирование",
              "Кастомная посадочная страница",
              "Отслеживание конверсий",
            ],
    },
  ]

  const googleAdsPricing = [
    {
      name: t("economy"),
      price: "$300",
      keywords: language === "en" ? "70 keywords" : "70 ключевых слов",
      features:
        language === "en"
          ? ["Keyword research", "Basic campaign setup", "Monthly reporting", "Bid optimization"]
          : ["Исследование ключевых слов", "Базовая настройка кампаний", "Месячная отчетность", "Оптимизация ставок"],
    },
    {
      name: t("standard"),
      price: "$500",
      keywords: language === "en" ? "140 keywords" : "140 ключевых слов",
      features:
        language === "en"
          ? [
              "Advanced keyword research",
              "Multiple campaigns",
              "Bi-weekly reporting",
              "Landing page optimization",
              "Conversion tracking",
            ]
          : [
              "Продвинутое исследование ключевых слов",
              "Множественные кампании",
              "Отчетность 2 раза в неделю",
              "Оптимизация посадочных страниц",
              "Отслеживание конверсий",
            ],
    },
    {
      name: t("business"),
      price: "$800",
      keywords: language === "en" ? "300 keywords" : "300 ключевых слов",
      features:
        language === "en"
          ? [
              "Premium keyword research",
              "Full account structure",
              "Weekly reporting",
              "Advanced optimization",
              "Custom landing pages",
              "Remarketing campaigns",
            ]
          : [
              "Премиум исследование ключевых слов",
              "Полная структура аккаунта",
              "Еженедельные стратегические звонки",
              "Продвинутая оптимизация",
              "Кастомные посадочные страницы",
              "Ремаркетинговые кампании",
            ],
    },
  ]

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

  const handleCloseSalesModal = () => {
    setShowSalesModal(false)
    setSelectedPackage(null)
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
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

        <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-10">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {t("heroSince")}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
                  {language === "en" ? (
                    <>
                      Pay for{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 animate-gradient-x">
                        leads
                      </span>
                      <br />
                      not promises
                    </>
                  ) : (
                    <>
                      Платите за{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 animate-gradient-x">
                        лиды
                      </span>
                      <br />а не за обещания
                    </>
                  )}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                  {t("heroSubheadline")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationModal(true)}
                  className="group bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
                >
                  {t("bookConsultation")}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl bg-transparent hover:border-white/40 transition-all duration-300"
                  asChild
                >
                  <a href={getLocalizedPath("/#case-studies")}>{t("viewCaseStudies")}</a>
                </Button>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-yellow-400/20 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent"></div>
                <div className="text-center space-y-4 sm:space-y-6 z-10 px-4">
                  <div className="relative">
                    <TrendingUp className="w-24 h-24 sm:w-32 sm:h-32 text-amber-400 mx-auto drop-shadow-2xl" />
                    <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-black font-bold text-xs sm:text-sm">+</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-bold text-amber-400 animate-pulse">+250%</div>
                    <div className="text-base sm:text-lg text-slate-300">{t("averageROI")}</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">{t("whoWeAre")}</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">{t("aboutDescription")}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  icon: <Star className="w-6 h-6 sm:w-7 sm:h-7" />,
                  title: t("foundedIn2017"),
                  description: t("foundedDescription"),
                },
                {
                  icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
                  title: t("projectsDelivered"),
                  description: t("projectsDescription"),
                },
                {
                  icon: <Brain className="w-6 h-6 sm:w-7 sm:h-7" />,
                  title: t("aiExperts"),
                  description: t("aiDescription"),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 sm:space-x-6 p-4 sm:p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-0">
              {[
                {
                  icon: <GlobalReachIcon size={40} className="text-amber-500" />,
                  title: t("globalReach"),
                  desc: t("globalReachDesc"),
                },
                {
                  icon: <GrowthFocusIcon size={40} className="text-green-500" />,
                  title: t("growthFocus"),
                  desc: t("growthFocusDesc"),
                },
                {
                  icon: <AIInnovationIcon size={40} className="text-blue-500" />,
                  title: t("aiInnovation"),
                  desc: t("aiInnovationDesc"),
                },
                {
                  icon: <CommunicationIcon size={40} className="text-purple-500" />,
                  title: t("communication"),
                  desc: t("communicationDesc"),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group text-center p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-200 hover:-translate-y-2"
                >
                  <div className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">{t("servicesTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">{t("servicesDescription")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{service.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Case Studies Section */}
      <section
        id="case-studies"
        className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t("caseStudiesTitle")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {caseStudies.map((study, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-amber-400 group">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg group-hover:text-amber-600 transition-colors">
                        {study.title}
                      </CardTitle>
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">{study.result}</div>
                      <Badge variant="secondary" className="w-fit text-xs sm:text-sm">
                        {study.industry}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-slate-600 text-xs sm:text-sm">{t("clickToView")}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl mx-4">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{study.title}</DialogTitle>
                    <DialogDescription className="text-base sm:text-lg font-semibold text-green-600">
                      {study.result}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Badge className="text-xs sm:text-sm">{study.industry}</Badge>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{study.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
      {/* Meta Ads Pricing Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">{t("metaPackages")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {metaPricing.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm border-white/10 text-white ${index === 1 ? "border-amber-400 border-2 scale-105" : ""}`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-400 text-black text-xs sm:text-sm">{t("mostPopular")}</Badge>
                  </div>
                )}
                <CardHeader className="text-center p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl text-white">{plan.name}</CardTitle>
                  <div className="text-3xl sm:text-4xl font-bold text-amber-400">{plan.price}</div>
                  <CardDescription className="text-slate-300 text-sm sm:text-base">{t("perMonth")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                  <Button
                    className="w-full mt-4 sm:mt-6 bg-amber-400 text-black hover:bg-amber-500 text-sm sm:text-base"
                    onClick={() => {
                      setSelectedPackage({ name: plan.name, price: plan.price })
                      setShowSalesModal(true)
                    }}
                  >
                    {t("orderNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Google Ads Audit Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">{t("adsNotWorking")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="space-y-4">
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold">{t("campaignAudit")}</h3>
              <p className="text-sm sm:text-base">{t("campaignAuditDesc")}</p>
            </div>
            <div className="space-y-4">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold">{t("keywordAnalysis")}</h3>
              <p className="text-sm sm:text-base">{t("keywordAnalysisDesc")}</p>
            </div>
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold">{t("recommendations")}</h3>
              <p className="text-sm sm:text-base">{t("recommendationsDesc")}</p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            onClick={() => {
              setSelectedPackage({ name: t("campaignAudit"), price: t("freeAudit") })
              setShowSalesModal(true)
            }}
          >
            {t("orderAudit")}
          </Button>
        </div>
      </section>
      {/* Google Ads Pricing Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t("googleAdsManagement")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {googleAdsPricing.map((plan, index) => (
              <Card key={index} className={`relative ${index === 1 ? "border-blue-400 border-2 scale-105" : ""}`}>
                {index === 1 && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-400 text-white text-xs sm:text-sm">{t("recommended")}</Badge>
                  </div>
                )}
                <CardHeader className="text-center p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600">{plan.price}</div>
                  <CardDescription className="text-sm sm:text-base">{plan.keywords}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                  {/* Modify the "Get Started" buttons in the `googleAdsPricing.map` loop to open the SalesModal: */}
                  <Button
                    className="w-full mt-4 sm:mt-6 bg-blue-400 text-white hover:bg-blue-500 text-sm sm:text-base"
                    onClick={() => {
                      setSelectedPackage({ name: plan.name, price: plan.price })
                      setShowSalesModal(true)
                    }}
                  >
                    {t("getStarted")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* AI & CRM Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{t("aiCrmTitle")}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-lg sm:text-xl leading-relaxed">{t("aiCrmDescription")}</p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <ChatbotIcon size={40} className="text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{t("aiChatbotsFeature")}</h3>
                </div>
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <AutomationIcon size={40} className="text-green-400" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{t("automation")}</h3>
                </div>
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <AutoRepliesIcon size={40} className="text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{t("autoReplies")}</h3>
                </div>
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <CRMSyncIcon size={40} className="text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{t("crmSync")}</h3>
                </div>
              </div>
            </div>
            <div className="text-center mt-8 lg:mt-0">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                onClick={() => {
                  setSelectedPackage({ name: t("requestDemo"), price: t("freeDemo") }) // New package name and price for demo
                  setShowSalesModal(true)
                }}
              >
                {t("requestDemo")}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* New CEO Section */}
      <CeoSection language={language} t={t} /> {/* Pass language and t to CeoSection */}
      {/* Target Audience Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">{t("whoWeHelp")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <LowSalesIcon size={56} className="text-red-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("lowSales")}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{t("lowSalesDesc")}</p>
            </Card>
            <Card className="text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <IrrelevantLeadsIcon size={56} className="text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("irrelevantLeads")}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{t("irrelevantLeadsDesc")}</p>
            </Card>
            <Card className="text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <BudgetWasteIcon size={56} className="text-yellow-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("scaredToWaste")}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{t("scaredToWasteDesc")}</p>
            </Card>
            <Card className="text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <TriedBeforeIcon size={56} className="text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("triedBefore")}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{t("triedBeforeDesc")}</p>
            </Card>
          </div>
        </div>
      </section>
      {/* Why Us Section */}
      <section className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">{t("whyChooseUs")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <StarIcon size={20} className="text-amber-400" />,
                title: t("sevenYears"),
                desc: t("sevenYearsDesc"),
              },
              {
                icon: <DiamondIcon size={20} className="text-purple-400" />,
                title: t("premiumExperience"),
                desc: t("premiumExperienceDesc"),
              },
              {
                icon: <ChartIcon size={20} className="text-blue-400" />,
                title: t("weeklyReports"),
                desc: t("weeklyReportsDesc"),
              },
              {
                icon: <TrendingIcon size={20} className="text-green-400" />,
                title: t("roiTracking"),
                desc: t("roiTrackingDesc"),
              },
              {
                icon: <GlobeIcon size={20} className="text-cyan-400" />,
                title: t("macroApproach"),
                desc: t("macroApproachDesc"),
              },
              {
                icon: <HandshakeIcon size={20} className="text-pink-400" />,
                title: t("transparentEthic"),
                desc: t("transparentEthicDesc"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center border border-white/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-300 text-sm sm:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
                <a href={getLocalizedPath("/blog")} className="hover:text-amber-400 transition-colors text-sm">
                  {t("blog")}
                </a>
              </li>
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
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white"
        >
          <ArrowRight className="w-4 h-4 rotate-90" />
        </Button>
      )}
      <ConsultationModal
        isOpen={showConsultationModal}
        onClose={handleCloseConsultationModal}
        language={language} // Pass language prop
        t={t} // Pass t prop
      />
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
    </div>
  )
}
