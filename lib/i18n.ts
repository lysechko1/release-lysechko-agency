"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

export type Language = "en" | "ru"

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Language
    switchLanguage: "Switch Language",
    home: "Home",
    contact: "Contact",
    viewCaseStudies: "View Case Studies",

    // Hero Section
    heroHeadline: "Pay for leads, not promises",
    heroSubheadline:
      "Performance-driven marketing that delivers measurable results: websites, ads, SEO, AI automation and more.",
    heroSince: "Since 2017 • 100+ Projects Delivered",
    bookConsultation: "Book a Consultation",
    averageROI: "Average ROI Increase",

    // About Section
    whoWeAre: "Who We Are",
    aboutDescription: "A performance-driven agency that transforms businesses through strategic digital marketing",
    foundedIn2017: "Founded in 2017",
    foundedDescription: "Seven years of proven marketing expertise across industries",
    projectsDelivered: "100+ Projects Delivered",
    projectsDescription: "Diverse portfolio with measurable results and satisfied clients",
    aiExperts: "AI & Marketing Experts",
    aiDescription: "Cutting-edge technology meets proven marketing strategies",
    globalReach: "Global Reach",
    globalReachDesc: "Worldwide clients",
    growthFocus: "Growth Focus",
    growthFocusDesc: "Results-driven",
    aiInnovation: "AI Innovation",
    aiInnovationDesc: "Latest technology",
    communication: "Communication",
    communicationDesc: "Always available",

    // Services Section
    servicesTitle: "Full-Stack Services for Your Growth",
    servicesDescription: "Comprehensive digital marketing solutions designed to scale your business",
    websiteDesign: "Website Design",
    websiteDesignDesc: "Modern, conversion-focused websites that drive results and engage your audience effectively.",
    googleAds: "Google Ads",
    googleAdsDesc: "Strategic PPC campaigns that maximize ROI and deliver qualified leads to your business.",
    socialAds: "Instagram/Facebook Ads",
    socialAdsDesc: "Social media advertising that builds brand awareness and generates quality conversions.",
    videoMarketing: "TikTok/YouTube",
    videoMarketingDesc: "Video marketing strategies that capture attention and drive engagement across platforms.",
    smmPr: "SMM & PR",
    smmPrDesc: "Building brand presence and reputation through strategic social media and public relations.",
    seo: "SEO",
    seoDesc: "Search engine optimization that improves rankings and increases organic traffic.",
    aiChatbots: "AI Chatbots",
    aiChatbotsDesc: "Intelligent automation that handles customer inquiries and improves user experience.",
    aso: "ASO",
    asoDesc: "App store optimization that increases visibility and downloads for mobile applications.",
    crmIntegrations: "CRM Integrations",
    crmIntegrationsDesc: "Seamless system integrations that streamline your sales and marketing processes.",

    // Case Studies
    caseStudiesTitle: "Client Success Stories",
    clickToView: "Click to view full case study",
    automotive: "Automotive",
    fashion: "Fashion",
    technology: "Technology",
    foodBeverage: "Food & Beverage",
    healthcare: "Healthcare",
    realEstate: "Real Estate",
    fitness: "Fitness",
    software: "Software",
    education: "Education",

    // Pricing
    metaPackages: "Meta Advertising Packages",
    googleAdsManagement: "Google Ads Management",
    economy: "Economy",
    standard: "Standard",
    business: "Business",
    mostPopular: "Most Popular",
    recommended: "Recommended",
    perMonth: "per month",
    orderNow: "Order Now",
    getStarted: "Get Started",

    // Google Ads Audit
    adsNotWorking: "Wondering why your ads aren't working?",
    campaignAudit: "Campaign Audit",
    campaignAuditDesc: "Comprehensive analysis of your current campaigns",
    keywordAnalysis: "Keyword Analysis",
    keywordAnalysisDesc: "In-depth keyword performance review",
    recommendations: "Recommendations",
    recommendationsDesc: "Detailed report with actionable insights",
    orderAudit: "📈 Order Audit",
    freeAudit: "Free Audit",

    // AI & CRM
    aiCrmTitle: "AI Agents and CRM: Automate Your Sales",
    aiCrmDescription:
      "We help implement bots, auto-replies, CRM syncing to streamline your entire sales process and maximize conversion rates.",
    aiChatbotsFeature: "AI Chatbots",
    automation: "Automation",
    autoReplies: "Auto-Replies",
    crmSync: "CRM Sync",
    requestDemo: "Request Demo",
    freeDemo: "Free Demo",

    // Target Audience
    whoWeHelp: "Who We Help",
    lowSales: "Low Sales",
    lowSalesDesc: "Struggling to generate consistent revenue",
    irrelevantLeads: "Irrelevant Leads",
    irrelevantLeadsDesc: "Getting traffic but not the right customers",
    scaredToWaste: "Scared to Waste Budget",
    scaredToWasteDesc: "Afraid of spending money on ineffective marketing",
    triedBefore: "Tried 'Marketers' Before",
    triedBeforeDesc: "Disappointed by previous marketing agencies",

    // Why Us
    whyChooseUs: "Why Clients Choose Us",
    sevenYears: "Seven-plus years in marketing",
    sevenYearsDesc: "Proven track record since 2017",
    premiumExperience: "Premium segment experience",
    premiumExperienceDesc: "Working with high-end brands and services",
    weeklyReports: "Weekly performance reports",
    weeklyReportsDesc: "Transparent reporting and communication",
    roiTracking: "ROI, CAC, LTV tracking",
    roiTrackingDesc: "Data-driven approach to marketing",
    macroApproach: "Macro/microeconomic approach",
    macroApproachDesc: "Understanding market dynamics",
    transparentEthic: "Transparent work ethic",
    transparentEthicDesc: "Honest communication and fair pricing",

    // Contact Form
    contactTitle: "Leave a Request — We'll Reach Out",
    contactSubtitle: "Or message us via WhatsApp, Telegram, or live chat",
    name: "Name",
    namePlaceholder: "Your full name",
    phone: "Phone",
    phonePlaceholder: "Your phone number",
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    sendRequest: "Send Request",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    liveChat: "Live Chat",

    // Footer
    footerTagline: "Performance-driven marketing since 2017",
    services: "Services",
    websiteDesignFooter: "Website Design",
    googleAdsFooter: "Google Ads",
    socialMediaMarketing: "Social Media Marketing",
    seoFooter: "SEO",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: "© 2024 Lysechko Agency. All rights reserved.",

    // CEO Section Translations
    ceoSectionHeadline: "Meet Your CEO",
    ceoSectionSubheadline: "Personal oversight for your business",
    ceoSectionDescription:
      "I'm personally involved in every project to make sure your business grows and thrives. For me, it's not just about results, but about trust, openness, and long-term partnership.",
    directAccessToLeadership: "Direct access to leadership",
    ceoName: "Vladyslav Lysechko",
    ceoTitle: "CEO",
    ceoMotto: "Driven by integrity and commitment",
    whyLeadershipMatters: "Why Personal Leadership Matters",
    leadershipMattersDescription:
      "I believe in building real partnerships, not just delivering services. That's why I stay personally involved in every project and always keep your business goals in focus.",
    thankYouHeading: "Thank you! Your request has been received",
    thankYouSubheading: "We will get back to you within 24 hours",
    viewCases: "View Cases",

    // Contact Form specific
    contactFormHeadline: "Let's Talk About Your Project",
    contactFormSubheadline: "Fill out the form below and we'll get back to you shortly.",
    interestedIn: "I'm interested in...",
    projectBudget: "Project budget (USD)",
    yourMessage: "Your Message",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",

    // Service options
    serviceFacebookAds: "Facebook Ads",
    serviceGoogleAds: "Google Ads",
    serviceInstagramAds: "Instagram Ads",
    serviceYouTubeAds: "YouTube Ads",
    serviceTikTokAds: "TikTok Ads",
    serviceSEO: "SEO",
    serviceBranding: "Branding",
    serviceWebsiteDevelopment: "Website Development",
    serviceCRMIntegration: "CRM Integration",
    serviceAIIntegration: "AI Integration",
    serviceOther: "Other",

    // Budget options
    budget2k: "$2,000 - $5,000",
    budget5k: "$5,000 - $10,000",
    budget10k: "$10,000 - $25,000",
    budget25kPlus: "$25,000+",

    // MobileMenu contact block
    menuBlockTitle: "Let's Connect",
    menuBlockSubtitle: "Ready to scale your marketing?",

    // Consultation Modal specific translations
    modalTitle: "Kickstart Your Business Growth Today",
    modalSubtitle: "Leave your contact details and get a custom strategy tailored to your business goals.",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    messengerLabel: "Preferred Messenger",
    submitButton: "Get Consultation",
    selectCountry: "Select country",
    closeModal: "Close modal",

    // Terms of Service specific translations
    termsOfServiceIntro:
      "These Terms of Service ('Terms') govern your use of the Lysechko Agency website and services. By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.",
    termsOfServiceUseLicense:
      "Permission is granted to temporarily download one copy of the materials (information or software) on Lysechko Agency's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
    termsOfServiceLicensePoints: [
      "modify or copy the materials;",
      "use the materials for any commercial purpose, or for any public display (commercial or non-commercial);",
      "attempt to decompile or reverse engineer any software contained on Lysechko Agency's website;",
      "remove any copyright or other proprietary notations from the materials; or",
      "transfer the materials to another person or 'mirror' the materials on any other server.",
    ],
    termsOfServiceTermination:
      "This license shall automatically terminate if you violate any of these restrictions and may be terminated by Lysechko Agency at any time. Upon termination of your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.",
    termsOfServiceDisclaimer:
      "The materials on Lysechko Agency's website are provided on an 'as is' basis. Lysechko Agency makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    termsOfServiceLimitations:
      "In no event shall Lysechko Agency or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Lysechko Agency's website, even if Lysechko Agency or a Lysechko Agency authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
    termsOfServiceAccuracy:
      "The materials appearing on Lysechko Agency's website could include technical, typographical, or photographic errors. Lysechko Agency does not warrant that any of the materials on its website are accurate, complete or current. Lysechko Agency may make changes to the materials contained on its website at any time without notice. However Lysechko Agency does not make any commitment to update the materials.",
    termsOfServiceLinks:
      "Lysechko Agency has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Lysechko Agency of the site. Use of any such linked website is at the user's own risk.",
    termsOfServiceModifications:
      "Lysechko Agency may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.",
    termsOfServiceGoverningLaw:
      "These terms and conditions are governed by and construed in accordance with the laws of Ukraine and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",

    // Sales Modal specific translations
    salesModalTitle: "Ready to Boost Your Sales?",
    salesModalSubtitle: "Fill out the form to get started with your chosen package.",
    salesThankYouHeading: "Order Received! Thank You!",
    salesThankYouSubheading: "We'll contact you shortly to confirm details.",
    orderButton: "Place Order",
    ceoSalesModalTitle: "Schedule Your Direct Access Session",
    ceoSalesModalSubtitle: "Connect directly with our CEO to discuss your business goals and strategy.",
    freeAccess: "Free Access",

    // New translations for Contact Page
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    contactInfoDescription:
      "We're here to help and answer any question you might have. We look forward to hearing from you.",
    sendUsAMessage: "Send Us a Message",
    thankYouMessage: "Thank you! Your message has been sent.",
    responseTime: "We will get back to you within 24 hours.",
    sendAnotherMessage: "Send Another Message",
    emailLabel: "Email",
    messageLabel: "Message",
    processing: "Processing...",
    sendMessage: "Send Message",

    // New translations for Privacy Policy Page
    privacyPolicyTitle: "Privacy Policy",
    privacyPolicySubtitle: "Your privacy is important to us.",
    privacyPolicyIntro:
      "Welcome to Lysechko Agency. We are committed to protecting your privacy and ensuring you have a positive experience on our website and with our services. This Privacy Policy outlines how we collect, use, and protect your personal information. By using our website, you consent to the data practices described in this policy.",
    informationCollection: "Information We Collect",
    informationCollectionDesc:
      "We collect information to provide better services to all our users. The types of information we collect include:",
    personalData: "Personal Identification Information",
    personalDataDesc:
      "Name, email address, phone number, country, and preferred messenger when you fill out our consultation or contact forms.",
    usageData: "Usage Data",
    usageDataDesc:
      "Information about how you access and use our website, such as your IP address, browser type, pages visited, and time spent on pages.",
    useOfData: "How We Use Your Information",
    useOfDataDesc: "We use the collected information for various purposes, including:",
    provideAndMaintainService: "To provide and maintain our service.",
    manageAccount:
      "To manage Your Account: to manage your registration as a user of the Service. The Personal Data you provide can give you access to different functionalities of the Service that are available to you as a registered user.",
    contactYou:
      "To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.",
    provideNews:
      "To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.",
    manageRequests: "To manage Your requests: To attend and manage Your requests to Us.",
    businessTransfers:
      "For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.",
    disclosureOfData: "Disclosure of Your Personal Data",
    disclosureOfDataDesc: "We may share Your personal information in the following situations:",
    serviceProviders: "Service Providers",
    serviceProvidersDesc:
      "We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.",
    lawEnforcement: "Law enforcement",
    lawEnforcementDesc:
      "Under certain circumstances, the Company may be required to disclose Your Personal Data when required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).",
    otherLegalRequirements: "Other legal requirements",
    otherLegalRequirementsDesc:
      "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to: Comply with a legal obligation; Protect and defend the rights or property of the Company; Prevent or investigate possible wrongdoing in connection with the Service; Protect the personal safety of Users of the Service or the public; Protect against legal liability.",
    securityOfData: "Security of Your Personal Data",
    securityOfDataDesc:
      "The security of Your Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
    childrensPrivacy: "Children's Privacy",
    childrensPrivacyDesc:
      "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.",
    linksToOtherWebsites: "Links to Other Websites",
    linksToOtherWebsitesDesc:
      "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
    changesToPrivacyPolicy: "Changes to this Privacy Policy",
    changesToPrivacyPolicyDesc:
      "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
    contactUsPrivacyDesc: "If you have any questions about this Privacy Policy, you can contact us:",
    byEmail: "By email",
    byPhone: "By phone",

    // New translations for Terms of Service Page
    termsOfServiceTitle: "Terms of Service",
    termsOfServiceSubtitle: "Please read these terms carefully before using our service.",
    acceptanceOfTerms: "Acceptance of Terms",
    acceptanceOfTermsDesc:
      "These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service. By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service. You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service. Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.",
    changesToTerms: "Changes to These Terms and Conditions",
    changesToTermsDesc:
      "We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion. By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.",
    userAccounts: "User Accounts",
    userAccountsDesc:
      "When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service. You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service. You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account. You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyDesc:
      "The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.",
    prohibitedUses: "Prohibited Uses",
    prohibitedUsesDesc:
      "You may use the Service only for lawful purposes and in accordance with Terms and Conditions. You agree not to use the Service:",
    prohibitedUse1: "In any way that violates any applicable national or international law or regulation.",
    prohibitedUse2:
      "For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.",
    prohibitedUse3:
      "To transmit, or procure the sending of, any advertising or promotional material, including any 'junk mail', 'chain letter,' 'spam,' or any other similar solicitation.",
    prohibitedUse4:
      "To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.",
    prohibitedUse5:
      "In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.",
    disclaimerOfWarranties: "Disclaimer of Warranties",
    disclaimerOfWarrantiesDesc:
      "The Service is provided to You 'AS IS' and 'AS AVAILABLE' and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.",
    limitationOfLiability: "Limitation of Liability",
    limitationOfLiabilityDesc:
      "To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose. Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, meaning that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.",
    governingLaw: "Governing Law",
    governingLawDesc:
      "The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.",
    contactInformation: "Contact Information",
    contactInformationDesc: "If you have any questions about these Terms and Conditions, you can contact us:",

    // Shopify Briefing Page specific translations
    shopifyBriefTitle: "Shopify Briefing Form",
    shopifyBriefSubtitle:
      "Please fill out this form to help us understand your project requirements for your Shopify store.",
    briefingBlock1Title: "Block 1: General Business Information",
    brandName: "Brand Name:",
    websiteLink: "Link to Website/Social Media:",
    brandDescription: "Describe your brand and style:",
    mainMarket: "Main Sales Market:",
    marketEurope: "Europe",
    marketUSA: "USA",
    marketOther: "Other",
    specifyOtherMarket: "Specify other market",
    competitors: "Competitors (website examples):",
    competitorsPlaceholder: "e.g., competitor1.com, competitor2.com",
    briefingBlock2Title: "Block 2: Assortment and Catalog",
    productCategories: "What product categories are needed?",
    categoryDresses: "Dresses",
    categoryAccessories: "Accessories",
    categoryOuterwear: "Outerwear",
    categoryOther: "Other",
    specifyOtherCategory: "Specify other category",
    productQuantity: "Approximate number of products at launch:",
    collectionsNeeded: "Are collections needed?",
    collectionsSeasonal: "Yes (seasonal)",
    collectionsByStyle: "Yes (by style)",
    collectionsNo: "No",
    productPhotos: "Are there product photos?",
    photosProfessional: "Yes, professional",
    photosSelfMade: "Yes, self-made",
    photosNeedPhotographer: "No, need photographer services",
    briefingBlock3Title: "Block 3: Design and Branding",
    brandStyle: "Do you have a corporate identity (logo, colors, fonts)?",
    brandStyleYes: "Yes (upload file)",
    uploadFile: "Upload file",
    uploadedFile: "Uploaded file",
    fileUploadNote: "Note: Actual file content is not uploaded via this form. Only the file name will be sent.",
    brandStyleNo: "No, needs development",
    designExamples: "Examples of websites whose design you like:",
    designExamplesPlaceholder: "e.g., website1.com, website2.com",
    designStyle: "Design Style:",
    selectDesignStyle: "Select design style",
    designMinimalistic: "Minimalistic",
    designPremiumFashion: "Premium Fashion",
    designModernTrendy: "Modern / Trendy",
    designOther: "Other",
    specifyOtherDesignStyle: "Specify other design style",
    briefingBlock4Title: "Block 4: Store Functionality",
    storeFunctionality: "Store Functionality:",
    funcCustomerAccount: "Customer Account",
    funcFilters: "Filters (size, color, price)",
    funcWishlist: "Wishlist",
    funcCustomerReviews: "Customer Reviews",
    funcInstagramIntegration: "Instagram Integration",
    funcBlog: "Blog (news, articles)",
    funcLoyaltyProgram: "Loyalty Program",
    funcPopups: "Pop-ups (discount for email subscription)",
    briefingBlock5Title: "Block 5: Payment and Currencies",
    mainCurrency: "Main store currency:",
    selectCurrency: "Select currency",
    paymentMethods: "Payment Methods:",
    paymentBankCards: "Bank Cards",
    paymentPayPal: "PayPal",
    paymentKlarnaAfterpay: "Klarna / Afterpay",
    paymentOther: "Other",
    specifyOtherPaymentMethod: "Specify other payment method",
    multiCurrency: "Multi-currency needed?",
    briefingBlock6Title: "Block 6: Delivery",
    deliveryServices: "Delivery Services:",
    deliveryRussianPost: "Russian Post", // This key is still here but not used in the form
    deliveryOther: "Other",
    specifyOtherDeliveryService: "Specify other delivery service",
    freeShippingAmount: "Free shipping from amount (₽):",
    deliveryGeography: "Delivery Geography:",
    geoEurope: "Europe",
    geoUSA: "USA",
    geoWorldwide: "Worldwide",
    briefingBlock7Title: "Block 7: Marketing and Integrations",
    marketingIntegrations: "Integrations:",
    marketingEmail: "Email Marketing (Klaviyo/Mailchimp)",
    marketingSEO: "Setup",
    marketingCRM: "Integration with CRM/ERP",
    briefingBlock8Title: "Block 8: Content and Pages",
    additionalPages: "What additional pages are needed?",
    pageAboutBrand: "About Brand",
    pageLookbook: "Lookbook",
    pageFAQ: "FAQ",
    pageReturnPolicy: "Return Policy",
    pageSizeChart: "Size Chart",
    multiLanguage: "Multi-language:",
    briefingBlock9Title: "Block 9: Administration",
    storeManager: "Who will manage the store?",
    selectManager: "Select manager",
    managerMyself: "Myself",
    managerEmployee: "My Employee",
    managerNeedSupport: "Need support from you",
    trainingNeeded: "Is training on working with Shopify needed?",
    briefingBlock10Title: "Block 10: Deadlines and Budget",
    desiredLaunchDate: "Desired launch date:",
    budget: "Project budget (₽):",
    selectBudget: "Select budget",
    budgetUpTo200k: "Up to 200k",
    budget200k400k: "200k-400k",
    budget400k800k: "400k-800k",
    budget800kPlus: "800k+",
    sendBrief: "Send Brief",
    sendingBrief: "Sending...",
    submissionSuccess: "Success!",
    briefSentConfirmation: "Thank you! Your brief has been successfully sent.",
    submissionError: "Submission Error",
    submissionFailed: "Failed to send brief. Please try again.",
    submissionFailedNetwork: "Network error. Please check your connection and try again.",
    validationError: "Validation Error",
    fillRequiredFields: "Please fill in all required fields.",
    briefingFormSubmitAnother: "Submit another brief",

    // Blog translations
    blog: "Blog",
    blogTitle: "Lysechko Agency Blog",
    blogSubtitle: "Expert insights, case studies and latest news from the world of digital marketing. We share our experience and help businesses grow.",
    readArticles: "Read Articles",
    backToBlog: "Back to Blog",
    latestPosts: "Latest Posts",
    loadMore: "Load More",
    loading: "Loading...",
    noPostsFound: "No posts found",
    publishedOn: "Published on",
    by: "by",
    categories: "Categories",
    relatedPosts: "Related Posts",
    sharePost: "Share Post",
    readMore: "Read More",
    minutesRead: "min read",
    featuredPost: "Featured Post",
    allPosts: "All Posts",
    searchPosts: "Search Posts",
    filterByCategory: "Filter by Category",
    sortBy: "Sort by",
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    mostPopular: "Most Popular",
    clearFilters: "Clear Filters",
    noResultsFound: "No results found",
    tryDifferentKeywords: "Try different keywords or filters",
    subscribeToNewsletter: "Subscribe to Newsletter",
    newsletterSubtitle: "Get the latest insights and case studies delivered to your inbox",
    emailPlaceholder: "Enter your email address",
    subscribe: "Subscribe",
    subscribed: "Subscribed!",
    subscriptionError: "Subscription failed. Please try again.",
    author: "Author",
    readTime: "Read time",
    tags: "Tags",
    shareOn: "Share on",
    copyLink: "Copy Link",
    linkCopied: "Link copied!",
    postNotFound: "Post not found",
    returnToBlog: "Return to Blog",
  },
  ru: {
    // Navigation & Language
    switchLanguage: "Сменить язык",
    home: "Главная",
    contact: "Контакты",
    viewCaseStudies: "Посмотреть кейсы",

    // Hero Section
    heroHeadline: "Платите за лиды, а не за обещания",
    heroSubheadline: "Маркетинг, ориентированный на результат: сайты, реклама, SEO, AI-автоматизация и многое другое.",
    heroSince: "С 2017 года • 100+ проектов выполнено",
    bookConsultation: "Записаться на консультацию",
    averageROI: "Средний рост ROI",

    // About Section
    whoWeAre: "Кто мы",
    aboutDescription:
      "Агентство, ориентированное на результат, которое трансформирует бизнес через стратегический цифровой маркетинг",
    foundedIn2017: "Основано в 2017 году",
    foundedDescription: "Семь лет проверенной экспертизы в маркетинге",
    projectsDelivered: "100+ проектов выполнено",
    projectsDescription: "Разнообразное портфолио с измеримыми результатами",
    aiExperts: "Эксперты по AI и маркетингу",
    aiDescription: "Передовые технологии и проверенные маркетинговые стратегии",
    globalReach: "Глобальный охват",
    globalReachDesc: "Клиенты по всему миру",
    growthFocus: "Фокус на росте",
    growthFocusDesc: "Ориентация на результат",
    aiInnovation: "AI инновации",
    aiInnovationDesc: "Новейшие технологии",
    communication: "Коммуникация",
    communicationDesc: "Всегда на связи",

    // Services Section
    servicesTitle: "Полный спектр услуг для вашего роста",
    servicesDescription: "Комплексные решения цифрового маркетинга для масштабирования вашего бизнеса",
    websiteDesign: "Дизайн сайтов",
    websiteDesignDesc:
      "Современные сайты, ориентированные на конверсию, которые приносят результаты и эффективно вовлекают аудиторию.",
    googleAds: "Google Реклама",
    googleAdsDesc: "Стратегические PPC-кампании, которые максимизируют ROI и привлекают качественные лиды.",
    socialAds: "Instagram/Facebook реклама",
    socialAdsDesc:
      "Реклама в социальных сетях, которая повышает узнаваемость бренда и генерирует качественные конверсии.",
    videoMarketing: "TikTok/YouTube",
    videoMarketingDesc: "Стратегии видеомаркетинга, которые привлекают внимание и повышают вовлеченность.",
    smmPr: "SMM и PR",
    smmPrDesc: "Создание присутствия бренда и репутации через стратегический SMM и PR.",
    seo: "SEO",
    seoDesc: "Поисковая оптимизация, которая улучшает позиции и увеличивает органический трафик.",
    aiChatbots: "AI чат-боты",
    aiChatbotsDesc:
      "Интеллектуальная автоматизация, которая обрабатывает запросы клиентов и улучшает пользовательский опыт.",
    aso: "ASO",
    asoDesc: "Оптимизация в App Store, которая увеличивает видимость и загрузки мобильных приложений.",
    crmIntegrations: "CRM интеграции",
    crmIntegrationsDesc: "Бесшовные интеграции систем, которые оптимизируют ваши процессы продаж и маркетинга.",

    // Case Studies
    caseStudiesTitle: "Истории успеха клиентов",
    clickToView: "Нажмите, чтобы посмотреть полный кейс",
    automotive: "Автомобильная сфера",
    fashion: "Мода",
    technology: "Технологии",
    foodBeverage: "Еда и напитки",
    healthcare: "Здравоохранение",
    realEstate: "Недвижимость",
    fitness: "Фитнес",
    software: "Программное обеспечение",
    education: "Образование",

    // Pricing
    metaPackages: "Пакеты рекламы в Meta",
    googleAdsManagement: "Управление Google Ads",
    economy: "Эконом",
    standard: "Стандарт",
    business: "Бизнес",
    mostPopular: "Самый популярный",
    recommended: "Рекомендуемый",
    perMonth: "в месяц",
    orderNow: "Заказать сейчас",
    getStarted: "Начать",

    // Google Ads Audit
    adsNotWorking: "Интересно, почему ваша реклама не работает?",
    campaignAudit: "Аудит кампаний",
    campaignAuditDesc: "Комплексный анализ ваших текущих кампаний",
    keywordAnalysis: "Анализ ключевых слов",
    keywordAnalysisDesc: "Глубокий анализ эффективности ключевых слов",
    recommendations: "Рекомендации",
    recommendationsDesc: "Детальный отчет с практическими рекомендациями",
    orderAudit: "📈 Заказать аудит",
    freeAudit: "Бесплатный аудит",

    // AI & CRM
    aiCrmTitle: "AI агенты и CRM: автоматизируйте продажи",
    aiCrmDescription:
      "Мы помогаем внедрить боты, автоответы, синхронизацию CRM для оптимизации всего процесса продаж и максимизации конверсии.",
    aiChatbotsFeature: "AI чат-боты",
    automation: "Автоматизация",
    autoReplies: "Автоответы",
    crmSync: "Синхронизация CRM",
    requestDemo: "Запросить демо",
    freeDemo: "Бесплатное демо",

    // Target Audience
    whoWeHelp: "Кому мы помогаем",
    lowSales: "Низкие продажи",
    lowSalesDesc: "Сложности с генерацией стабильной выручки",
    irrelevantLeads: "Нерелевантные лиды",
    irrelevantLeadsDesc: "Получаете трафик, но не тех клиентов",
    scaredToWaste: "Боитесь потратить бюджет",
    scaredToWasteDesc: "Боитесь тратить деньги на неэффективный маркетинг",
    triedBefore: "Уже пробовали 'маркетологов'",
    triedBeforeDesc: "Разочарованы предыдущими маркетинговыми агентствами",

    // Why Us
    whyChooseUs: "Почему клиенты выбирают нас",
    sevenYears: "Более семи лет в маркетинге",
    sevenYearsDesc: "Проверенный послужной список с 2017 года",
    premiumExperience: "Опыт работы с премиум-сегментом",
    premiumExperienceDesc: "Работа с брендами и услугами высокого класса",
    weeklyReports: "Еженедельные отчеты о результатах",
    weeklyReportsDesc: "Прозрачная отчетность и коммуникация",
    roiTracking: "Отслеживание ROI, CAC, LTV",
    roiTrackingDesc: "Подход к маркетингу на основе данных",
    macroApproach: "Макро/микроэкономический подход",
    macroApproachDesc: "Понимание рыночной динамики",
    transparentEthic: "Прозрачная рабочая этика",
    transparentEthicDesc: "Честная коммуникация и справедливые цены",

    // Contact Form
    contactTitle: "Оставьте заявку — мы свяжемся",
    contactSubtitle: "Или напишите нам в WhatsApp, Telegram или живой чат",
    name: "Имя",
    namePlaceholder: "Ваше полное имя",
    phone: "Телефон",
    phonePlaceholder: "Ваш номер телефона",
    message: "Сообщение",
    messagePlaceholder: "Расскажите нам о вашем проекте...",
    sendRequest: "Отправить заявку",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    liveChat: "Живой чат",

    // Footer
    footerTagline: "Маркетинг, ориентированный на результат, с 2017 года",
    services: "Услуги",
    websiteDesignFooter: "Дизайн сайтов",
    googleAdsFooter: "Google реклама",
    socialMediaMarketing: "Маркетинг в соцсетях",
    seoFooter: "SEO",
    legal: "Правовая информация",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    copyright: "© 2024 Lysechko Agency. Все права защищены.",

    // CEO Section Translations
    ceoSectionHeadline: "Познакомьтесь с нашим CEO",
    ceoSectionSubheadline: "Личный контроль для вашего бизнеса",
    ceoSectionDescription:
      "Я лично участвую в каждом проекте, чтобы ваш бизнес рос и процветал. Для меня это не только результаты, но и доверие, открытость и долгосрочное партнерство.",
    directAccessToLeadership: "Прямой доступ к руководству",
    ceoName: "Владислав Лысечко",
    ceoTitle: "CEO",
    ceoMotto: "Движим честностью и преданностью делу",
    whyLeadershipMatters: "Почему личное руководство важно",
    leadershipMattersDescription:
      "Я верю в построение настоящих партнерских отношений, а не просто предоставление услуг. Вот почему я лично участвую в каждом проекте и всегда держу ваши бизнес-цели в фокусе.",
    thankYouHeading: "Спасибо! Ваша заявка получена",
    thankYouSubheading: "Мы свяжемся с вами в течение 24 часов",
    viewCases: "Посмотреть кейсы",

    // Contact Form specific
    contactFormHeadline: "Давайте обсудим ваш проект",
    contactFormSubheadline: "Заполните форму ниже, и мы свяжемся с вами в ближайшее время.",
    interestedIn: "Меня интересует...",
    projectBudget: "Бюджет проекта (USD)",
    yourMessage: "Ваше сообщение",
    phoneLabel: "Номер телефона",
    phonePlaceholder: "Введите ваш номер телефона",

    // Service options
    serviceFacebookAds: "Реклама в Facebook",
    serviceGoogleAds: "Реклама в Google",
    serviceInstagramAds: "Реклама в Instagram",
    serviceYouTubeAds: "Реклама на YouTube",
    serviceTikTokAds: "Реклама в TikTok",
    serviceSEO: "SEO",
    serviceBranding: "Брендинг",
    serviceWebsiteDevelopment: "Разработка сайтов",
    serviceCRMIntegration: "Интеграция CRM",
    serviceAIIntegration: "Интеграция AI",
    serviceOther: "Другое",

    // Budget options
    budget2k: "$2,000 - $5,000",
    budget5k: "$5,000 - $10,000",
    budget10k: "$10,000 - $25,000",
    budget25kPlus: "$25,000+",

    // MobileMenu contact block
    menuBlockTitle: "Давайте свяжемся",
    menuBlockSubtitle: "Готовы масштабировать ваш маркетинг?",

    // Consultation Modal specific translations
    modalTitle: "Запустите рост вашего бизнеса уже сегодня",
    modalSubtitle:
      "Оставьте свои контактные данные и получите индивидуальную стратегию для достижения ваших бизнес-целей.",
    nameLabel: "Полное имя",
    emailLabel: "Адрес электронной почты",
    emailPlaceholder: "Введите ваш адрес электронной почты",
    messengerLabel: "Предпочитаемый мессенджер",
    submitButton: "Получить консультацию",
    selectCountry: "Выберите страну",
    closeModal: "Закрыть модальное окно",

    // Terms of Service specific translations
    termsOfServiceIntro:
      "Настоящие Условия предоставления услуг ('Условия') регулируют использование вами веб-сайта и услуг Lysechko Agency. Получая доступ или используя наш веб-сайт и услуги, вы соглашаетесь соблюдать настоящие Условия. Если вы не согласны с какой-либо частью условий, то вы не можете получить доступ к услуге.",
    termsOfServiceUseLicense:
      "Разрешается временно загружать одну копию материалов (информации или программного обеспечения) на веб-сайте Lysechko Agency только для личного, некоммерческого временного просмотра. Это предоставление лицензии, а не передача права собственности, и в соответствии с этой лицензией вы не можете:",
    termsOfServiceLicensePoints: [
      "изменять или копировать материалы;",
      "использовать материалы для любых коммерческих целей или для любого публичного показа (коммерческого или некоммерческого);",
      "пытаться декомпилировать или реконструировать любое программное обеспечение, содержащееся на веб-сайте Lysechko Agency;",
      "удалять любые уведомления об авторских правах или другие проприетарные обозначения из материалов; или",
      "передавать материалы другому лицу или 'зеркалировать' материалы на любом другом сервере.",
    ],
    termsOfServiceTermination:
      "Настоящая лицензия автоматически прекращается, если вы нарушаете любое из этих ограничений, и может быть прекращена Lysechko Agency в любое время. После прекращения просмотра вами этих материалов или после прекращения действия настоящей лицензии вы должны уничтожить любые загруженные материалы, находящиеся в вашем распоряжении, будь то в электронном или печатном формате.",
    termsOfServiceDisclaimer:
      "Материалы на веб-сайте Lysechko Agency предоставляются на условиях «как есть». Lysechko Agency не дает никаких гарантий, выраженных или подразумеваемых, и настоящим отказывается от всех других гарантий, включая, помимо прочего, подразумеваемые гарантии или условия товарной пригодности, пригодности для определенной цели или ненарушения прав интеллектуальной собственности или других нарушений прав.",
    termsOfServiceLimitations:
      "Ни при каких обстоятельствах Lysechko Agency или ее поставщики не несут ответственности за любые убытки (включая, помимо прочего, убытки от потери данных или прибыли, или из-за прерывания деятельности), возникающие в результате использования или невозможности использования материалов на веб-сайте Lysechko Agency, даже если Lysechko Agency или уполномоченный представитель Lysechko Agency был устно или письменно уведомлен о возможности такого ущерба. Поскольку некоторые юрисдикции не допускают ограничений подразумеваемых гарантий или ограничений ответственности за косвенные или случайные убытки, эти ограничения могут не применяться к вам.",
    termsOfServiceAccuracy:
      "Материалы, появляющиеся на веб-сайте Lysechko Agency, могут содержать технические, типографские или фотографические ошибки. Lysechko Agency не гарантирует, что какие-либо материалы на ее веб-сайте являются точными, полными или актуальными. Lysechko Agency может вносить изменения в материалы, содержащиеся на ее веб-сайте, в любое время без уведомления. Однако Lysechko Agency не берет на себя никаких обязательств по обновлению материалов.",
    termsOfServiceLinks:
      "Lysechko Agency не просматривала все сайты, связанные с ее веб-сайтом, и не несет ответственности за содержание любого такого связанного сайта. Включение любой ссылки не означает одобрения Lysechko Agency сайта. Использование любого такого связанного веб-сайта осуществляется на собственный риск пользователя.",
    termsOfServiceModifications:
      "Lysechko Agency может пересматривать настоящие условия предоставления услуг для своего веб-сайта в любое время без уведомления. Используя этот веб-сайт, вы соглашаетесь соблюдать текущую версию этих условий предоставления услуг.",
    termsOfServiceGoverningLaw:
      "Настоящие условия регулируются и толкуются в соответствии с законодательством Украины, и вы безоговорочно подчиняетесь исключительной юрисдикции судов этого государства или местоположения.",

    // Sales Modal specific translations
    salesModalTitle: "Готовы увеличить ваши продажи?",
    salesModalSubtitle: "Заполните форму, чтобы начать работу с выбранным пакетом.",
    salesThankYouHeading: "Заказ получен! Спасибо!",
    salesThankYouSubheading: "Мы свяжемся с вами в ближайшее время для подтверждения деталей.",
    orderButton: "Оформить заказ",
    ceoSalesModalTitle: "Запланируйте сессию прямого доступа",
    ceoSalesModalSubtitle: "Свяжитесь напрямую с нашим CEO, чтобы обсудить ваши бизнес-цели и стратегию.",
    freeAccess: "Бесплатный доступ",

    // New translations for Contact Page
    contactUs: "Свяжитесь с нами",
    getInTouch: "Связаться",
    contactInfoDescription:
      "Мы здесь, чтобы помочь и ответить на любые ваши вопросы. Мы с нетерпением ждем вашего звонка.",
    sendUsAMessage: "Отправьте нам сообщение",
    thankYouMessage: "Спасибо! Ваше сообщение отправлено.",
    responseTime: "Мы свяжемся с вами в течение 24 часов.",
    sendAnotherMessage: "Отправить еще одно сообщение",
    emailLabel: "Email",
    messageLabel: "Сообщение",
    processing: "Обработка...",
    sendMessage: "Отправить сообщение",

    // New translations for Privacy Policy Page
    privacyPolicyTitle: "Политика конфиденциальности",
    privacyPolicySubtitle: "Ваша конфиденциальность важна для нас.",
    privacyPolicyIntro:
      "Добро пожаловать в Lysechko Agency. Мы стремимся защищать вашу конфиденциальность и обеспечивать вам положительный опыт использования нашего веб-сайта и услуг. Данная Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу личную информацию. Используя наш веб-сайт, вы соглашаетесь с практиками обработки данных, описанными в этой политике.",
    informationCollection: "Информация, которую мы собираем",
    informationCollectionDesc:
      "Мы собираем информацию для предоставления более качественных услуг всем нашим пользователям. Типы информации, которую мы собираем, включают:",
    personalData: "Личная идентификационная информация",
    personalDataDesc:
      "Имя, адрес электронной почты, номер телефона, страна и предпочтительный мессенджер, когда вы заполняете наши формы консультации или контакта.",
    usageData: "Данные об использовании",
    usageDataDesc:
      "Информация о том, как вы получаете доступ и используете наш веб-сайт, такая как ваш IP-адрес, тип браузера, посещенные страницы и время, проведенное на страницах.",
    useOfData: "Как мы используем вашу информацию",
    useOfDataDesc: "Мы используем собранную информацию для различных целей, включая:",
    provideAndMaintainService: "Для предоставления и поддержания нашего сервиса.",
    manageAccount:
      "Для управления Вашей учетной записью: для управления вашей регистрацией в качестве пользователя Сервиса. Предоставленные вами персональные данные могут предоставить вам доступ к различным функциям Сервиса, доступным вам как зарегистрированному пользователю.",
    contactYou:
      "Для связи с Вами: Для связи с Вами по электронной почте, телефонным звонкам, SMS или другим эквивалентным формам электронной связи, таким как push-уведомления мобильного приложения относительно обновлений или информационных сообщений, связанных с функциональными возможностями, продуктами или контрактными услугами, включая обновления безопасности, когда это необходимо или разумно для их реализации.",
    provideNews:
      "Для предоставления Вам новостей, специальных предложений и общей информации о других товарах, услугах и событиях, которые мы предлагаем, аналогичных тем, которые вы уже приобрели или о которых запрашивали, если только Вы не отказались от получения такой информации.",
    manageRequests: "Для обработки и управления Вашими запросами к Нам.",
    businessTransfers:
      "Для передачи бизнеса: Мы можем использовать Вашу информацию для оценки или проведения слияния, отчуждения, реструктуризации, реорганизации, роспуска или другой продажи или передачи части или всех Наших активов, будь то в качестве действующего предприятия или в рамках банкротства, ликвидации или аналогичного разбирательства, в котором Персональные данные, хранящиеся у Нас о пользователях нашего Сервиса, являются одними из передаваемых активов.",
    disclosureOfData: "Раскрытие ваших персональных данных",
    disclosureOfDataDesc: "Мы можем передавать Ваши персональные данные в следующих ситуациях:",
    serviceProviders: "Поставщики услуг",
    serviceProvidersDesc:
      "Мы можем передавать Ваши персональные данные Поставщикам услуг для мониторинга и анализа использования нашего Сервиса, для связи с Вами.",
    lawEnforcement: "Правоохранительные органы",
    lawEnforcementDesc:
      "При определенных обстоятельствах Компания может быть обязана раскрыть Ваши персональные данные, если это требуется по закону или в ответ на обоснованные запросы государственных органов (например, суда или государственного учреждения).",
    otherLegalRequirements: "Другие юридические требования",
    otherLegalRequirementsDesc:
      "Компания может раскрывать Ваши персональные данные, добросовестно полагая, что такое действие необходимо для: Соблюдения юридического обязательства; Защиты и отстаивания прав или собственности Компании; Предотвращения или расследования возможных правонарушений в связи с Сервисом; Защиты личной безопасности Пользователей Сервиса или общественности; Защиты от юридической ответственности.",
    securityOfData: "Безопасность ваших персональных данных",
    securityOfDataDesc:
      "Безопасность Ваших данных важна для Нас, но помните, что ни один метод передачи данных через Интернет или метод электронного хранения не является 100% безопасным. Хотя Мы стремимся использовать коммерчески приемлемые средства для защиты Ваших персональных данных, Мы не можем гарантировать их абсолютную безопасность.",
    childrensPrivacy: "Конфиденциальность детей",
    childrensPrivacyDesc:
      "Наш Сервис не предназначен для лиц младше 13 лет. Мы сознательно не собираем личную информацию от лиц младше 13 лет. Если Вы являетесь родителем или опекуном и Вам известно, что Ваш ребенок предоставил Нам персональные данные, пожалуйста, свяжитесь с Нами. Если Нам станет известно, что Мы собрали персональные данные от лиц младше 13 лет без подтверждения согласия родителей, Мы предпримем шаги для удаления этой информации с Наших серверов.",
    linksToOtherWebsites: "Ссылки на другие веб-сайты",
    linksToOtherWebsitesDesc:
      "Наш Сервис может содержать ссылки на другие веб-сайты, которые не управляются Нами. Если Вы нажмете на ссылку третьей стороны, Вы будете перенаправлены на сайт этой третьей стороны. Мы настоятельно рекомендуем Вам ознакомиться с Политикой конфиденциальности каждого сайта, который Вы посещаете. Мы не контролируем и не несем ответственности за содержание, политику конфиденциальности или практику любых сторонних сайтов или услуг.",
    changesToPrivacyPolicy: "Изменения в настоящей Политике конфиденциальности",
    changesToPrivacyPolicyDesc:
      "Мы можем время от времени обновлять нашу Политику конфиденциальности. Мы уведомим Вас о любых изменениях, разместив новую Политику конфиденциальности на этой странице. Вам рекомендуется периодически просматривать эту Политику конфиденциальности на предмет изменений. Изменения в настоящей Политике конфиденциальности вступают в силу с момента их публикации на этой странице.",
    contactUsPrivacyDesc:
      "Если у вас есть какие-либо вопросы относительно настоящей Политики конфиденциальности, вы можете связаться с нами:",
    byEmail: "По электронной почте",
    byPhone: "По телефону",

    // Shopify Briefing Page specific translations
    shopifyBriefTitle: "Бриф на разработку Shopify магазина",
    shopifyBriefSubtitle: "Пожалуйста, заполните эту форму, чтобы помочь нам понять требования вашего проекта.",
    briefingBlock1Title: "Блок 1: Общая информация о бизнесе",
    brandName: "Название бренда:",
    websiteLink: "Ссылка на сайт/соцсети:",
    brandDescription: "Опишите ваш бренд и стиль:",
    mainMarket: "Основной рынок продаж:",
    marketEurope: "Европа",
    marketUSA: "США",
    marketOther: "Другое",
    specifyOtherMarket: "Укажите другой рынок",
    competitors: "Конкуренты (примеры сайтов):",
    competitorsPlaceholder: "напр., competitor1.com, competitor2.com",
    briefingBlock2Title: "Блок 2: Ассортимент и каталог",
    productCategories: "Какие категории товаров нужны?",
    categoryDresses: "Платья",
    categoryAccessories: "Аксессуары",
    categoryOuterwear: "Верхняя одежда",
    categoryOther: "Другое",
    specifyOtherCategory: "Укажите другую категорию",
    productQuantity: "Примерное количество товаров на старте:",
    collectionsNeeded: "Нужны ли коллекции?",
    collectionsSeasonal: "Да (сезонные)",
    collectionsByStyle: "Да (по стилю)",
    collectionsNo: "Нет",
    productPhotos: "Есть ли фото товаров?",
    photosProfessional: "Да, профессиональные",
    photosSelfMade: "Да, сделанные самостоятельно",
    photosNeedPhotographer: "Нет, нужны услуги фотографа",
    briefingBlock3Title: "Блок 3: Дизайн и брендирование",
    brandStyle: "Есть ли фирменный стиль (логотип, цвета, шрифты)?",
    brandStyleYes: "Да (загрузить файл)",
    uploadFile: "Загрузить файл",
    uploadedFile: "Загруженный файл",
    fileUploadNote:
      "Примечание: Фактическое содержимое файла не загружается через эту форму. Будет отправлено только имя файла.",
    brandStyleNo: "Нет, нужно разработать",
    designExamples: "Примеры сайтов, чей дизайн вам нравится:",
    designExamplesPlaceholder: "напр., website1.com, website2.com",
    designStyle: "Стиль дизайна:",
    selectDesignStyle: "Выберите стиль дизайна",
    designMinimalistic: "Минималистичный",
    designPremiumFashion: "Премиум фэшн",
    designModernTrendy: "Современный / Трендовый",
    designOther: "Другое",
    specifyOtherDesignStyle: "Укажите другой стиль дизайна",
    briefingBlock4Title: "Блок 4: Функционал магазина",
    storeFunctionality: "Функционал магазина:",
    funcCustomerAccount: "Личный кабинет покупателя",
    funcFilters: "Фильтры (размер, цвет, цена)",
    funcWishlist: "Wishlist (список желаний)",
    funcCustomerReviews: "Отзывы покупателей",
    funcInstagramIntegration: "Интеграция Instagram",
    funcBlog: "Блог (новости, статьи)",
    funcLoyaltyProgram: "Программа лояльности",
    funcPopups: "Поп-апы (скидка за подписку на e-mail)",
    briefingBlock5Title: "Блок 5: Оплата и валюты",
    mainCurrency: "Основная валюта магазина:",
    selectCurrency: "Выберите валюту",
    paymentMethods: "Способы оплаты:",
    paymentBankCards: "Банковские карты",
    paymentPayPal: "PayPal",
    paymentKlarnaAfterpay: "Klarna / Afterpay",
    paymentOther: "Другое",
    specifyOtherPaymentMethod: "Укажите другой способ оплаты",
    multiCurrency: "Нужна ли мультивалютность?",
    briefingBlock6Title: "Блок 6: Доставка",
    deliveryServices: "Службы доставки:",
    deliveryRussianPost: "Почта России", // This key is still here but not used in the form
    deliveryOther: "Другое",
    specifyOtherDeliveryService: "Укажите другую службу доставки",
    freeShippingAmount: "Бесплатная доставка от суммы (₽):",
    deliveryGeography: "География доставки:",
    geoEurope: "Европа",
    geoUSA: "США",
    geoWorldwide: "Весь мир",
    briefingBlock7Title: "Блок 7: Маркетинг и интеграции",
    marketingIntegrations: "Интеграции:",
    marketingEmail: "Email рассылка (Klaviyo/Mailchimp)",
    marketingSEO: "настройка",
    marketingCRM: "Интеграция с CRM/ERP",
    briefingBlock8Title: "Блок 8: Контент и страницы",
    additionalPages: "Какие страницы нужны дополнительно:",
    pageAboutBrand: "О бренде",
    pageLookbook: "Lookbook",
    pageFAQ: "FAQ",
    pageReturnPolicy: "Политика возврата",
    pageSizeChart: "Таблица размеров",
    multiLanguage: "Многоязычность:",
    briefingBlock9Title: "Блок 9: Администрирование",
    storeManager: "Кто будет управлять магазином?",
    selectManager: "Выберите менеджера",
    managerMyself: "Я сам(а)",
    managerEmployee: "Мой сотрудник",
    managerNeedSupport: "Нужна поддержка от вас",
    trainingNeeded: "Нужно ли обучение работе с Shopify?",
    briefingBlock10Title: "Блок 10: Сроки и бюджет",
    desiredLaunchDate: "Желаемый срок запуска:",
    budget: "Бюджет на проект (₽):",
    selectBudget: "Выберите бюджет",
    budgetUpTo200k: "до 200 тыс",
    budget200k400k: "200-400 тыс",
    budget400k800k: "400-800 тыс",
    budget800kPlus: "800 тыс+",
    sendBrief: "Отправить",
    sendingBrief: "Отправка...",
    submissionSuccess: "Успешно!",
    briefSentConfirmation: "Спасибо! Ваш бриф успешно отправлен.",
    submissionError: "Ошибка отправки",
    submissionFailed: "Не удалось отправить бриф. Пожалуйста, попробуйте еще раз.",
    submissionFailedNetwork: "Ошибка сети. Пожалуйста, проверьте ваше соединение и попробуйте еще раз.",
    validationError: "Ошибка валидации",
    fillRequiredFields: "Пожалуйста, заполните все обязательные поля.",
    briefingFormSubmitAnother: "Отправить еще один бриф",

    // Blog translations
    blog: "Блог",
    blogTitle: "Блог Lysechko Agency",
    blogSubtitle: "Экспертные insights, кейсы и актуальные новости из мира digital маркетинга. Делимся опытом и помогаем бизнесу расти.",
    readArticles: "Читать статьи",
    backToBlog: "Назад к блогу",
    latestPosts: "Последние статьи",
    loadMore: "Загрузить еще",
    loading: "Загрузка...",
    noPostsFound: "Статьи не найдены",
    publishedOn: "Опубликовано",
    by: "автор",
    categories: "Категории",
    relatedPosts: "Похожие статьи",
    sharePost: "Поделиться",
    readMore: "Читать далее",
    minutesRead: "мин чтения",
    featuredPost: "Рекомендуемая статья",
    allPosts: "Все статьи",
    searchPosts: "Поиск статей",
    filterByCategory: "Фильтр по категории",
    sortBy: "Сортировать по",
    newestFirst: "Сначала новые",
    oldestFirst: "Сначала старые",
    mostPopular: "Самые популярные",
    clearFilters: "Очистить фильтры",
    noResultsFound: "Результаты не найдены",
    tryDifferentKeywords: "Попробуйте другие ключевые слова или фильтры",
    subscribeToNewsletter: "Подписаться на рассылку",
    newsletterSubtitle: "Получайте последние insights и кейсы на вашу почту",
    emailPlaceholder: "Введите ваш email",
    subscribe: "Подписаться",
    subscribed: "Подписка оформлена!",
    subscriptionError: "Ошибка подписки. Попробуйте еще раз.",
    author: "Автор",
    readTime: "Время чтения",
    tags: "Теги",
    shareOn: "Поделиться в",
    copyLink: "Копировать ссылку",
    linkCopied: "Ссылка скопирована!",
    postNotFound: "Статья не найдена",
    returnToBlog: "Вернуться к блогу",
  },
}

export function useTranslation() {
  const pathname = usePathname()
  const router = useRouter()
  // Derive language directly from pathname, default to 'ru'
  const language: Language = pathname.startsWith("/en") ? "en" : "ru"

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key // Fallback to key if translation not found
    },
    [language],
  )

  // This function is primarily for LanguageSwitcher, not directly used by other components for language state
  const changeLanguage = useCallback(
    (newLang: Language) => {
      const currentPath = pathname
      const pathParts = currentPath.split("/")
      if (pathParts[1] === "en" || pathParts[1] === "ru") {
        pathParts[1] = newLang
      } else {
        // If no language prefix, add it (e.g., /shopify_breef1 -> /ru/shopify_breef1)
        pathParts.splice(1, 0, newLang)
      }
      const newPath = pathParts.join("/")
      router.push(newPath)
    },
    [pathname, router],
  )

  return { language, t, changeLanguage }
}
