import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import { PinnacleLogo } from '@/components/PinnacleLogo'
import { LanguageSelector } from '@/components/LanguageSelector'
import { CategoryCard } from '@/components/CategoryCard'
import { PRODUCT_CATEGORIES } from '@/data/productCategories'

const managerName = 'Sarah Johnson'

export const WelcomeDashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const nameParts = managerName.split(' ')
  const initials =
    nameParts.length === 1
      ? nameParts[0].slice(0, 2).toUpperCase()
      : `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()

  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <header className="border-b border-border bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <PinnacleLogo className="h-10 w-auto" />
            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted">{t('brandTagline')}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSelector alignEnd />
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-3 rounded-full border border-border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {t('dashboard.welcome', { name: managerName.split(' ')[0] })}
                  </p>
                  <p className="text-xs text-muted">Growth & Intelligence</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {initials}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-card border border-border shadow-lg z-50">
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/10"
                    onClick={() => {
                      setMenuOpen(false)
                      navigate('/dashboard')
                    }}
                  >
                    Account
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/10"
                    onClick={() => {
                      setMenuOpen(false)
                      navigate('/settings')
                    }}
                  >
                    Settings
                  </button>
                  <div className="border-t border-border" />
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-muted hover:bg-muted/10"
                    onClick={() => {
                      try {
                        sessionStorage.clear()
                        localStorage.removeItem('authToken')
                        localStorage.removeItem('pinnacle-auth')
                      } catch (e) {
                        // ignore
                      }
                      setMenuOpen(false)
                      navigate('/login')
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-12 flex max-w-6xl flex-col gap-12 px-6">
        <section className="rounded-3xl border border-border bg-card p-10 shadow-subtle">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">
              {t('brandName')}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-3xl font-semibold text-foreground">
                {t('heroMessage')}
              </h1>
              <p className="max-w-full text-base text-muted truncate">
                {t('dashboardTagline')}
              </p>
            </motion.div>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {t('dashboard.categoriesTitle')}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
