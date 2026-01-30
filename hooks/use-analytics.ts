import { useEffect } from "react"

declare global {
  window: any
}

export const useAnalytics = () => {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

    if (!measurementId) {
      console.warn("Google Analytics measurement ID not configured")
      return
    }

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", measurementId, {
      page_path: window.location.pathname,
    })

    window.gtag = gtag
  }, [])
}


export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventData || {})
  } else {
    console.warn("Google Analytics not initialized")
  }
}

export const trackPageView = (pageTitle: string, pagePath: string) => {
  trackEvent("page_view", {
    page_title: pageTitle,
    page_path: pagePath,
  })
}
