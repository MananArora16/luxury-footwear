"use client"

import { useEffect, useState } from "react"

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-40 flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full border-2 border-border relative flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div
            className="absolute inset-0 rounded-full border-2 border-primary"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((progress * 3.6 - 90) * (Math.PI / 180))}% ${
                50 + 50 * Math.sin((progress * 3.6 - 90) * (Math.PI / 180))
              }%)`,
            }}
          />
          <span className="text-xs font-semibold text-primary z-10">{Math.round(progress)}%</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">Scroll</span>
      </div>
    </div>
  )
}
