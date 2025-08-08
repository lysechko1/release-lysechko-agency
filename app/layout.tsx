import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script" // Import Script
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lysechko Agency - Performance-Driven Digital Marketing",
  description:
    "Pay for leads, not promises. Performance-driven marketing that delivers measurable results: websites, ads, SEO, AI automation and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="overflow-x-hidden">
      <head>
        <link rel="alternate" href="https://yourdomain.com/" hrefLang="ru" />
        <link rel="alternate" href="https://yourdomain.com/en" hrefLang="en" />
        {/* Google Tag Manager script */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive" // Load before hydration on the client
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K5VKJKK2');`,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5VKJKK2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }} // Use style object for React
          ></iframe>
        </noscript>
        <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  )
}
