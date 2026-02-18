'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
      style={{
        border: '1px solid var(--border)',
        background: 'var(--card)',
      }}
    >
      <span
        className="absolute inset-0.5 rounded-full transition-all duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(to right, #0A0F1E, #0D1526)'
            : 'linear-gradient(to right, #E0F2FE, #F3E8FF)',
        }}
      />
      <span
        className="absolute top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-300"
        style={{
          left: isDark ? '4px' : '28px',
          background: isDark
            ? 'linear-gradient(135deg, #38BDF8, #A78BFA)'
            : 'linear-gradient(135deg, #F59E0B, #F97316)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}