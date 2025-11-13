import { ArrowLeft, ArrowRight, HelpCircle, Lock, Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PinnacleLogo } from '@/components/PinnacleLogo'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const NeedHelpPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-card/90 px-6 py-4 shadow-subtle backdrop-blur">
        <PinnacleLogo className="h-8 w-auto" />
        <LanguageSelector alignEnd />
      </header>

      <section className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-card p-12 shadow-subtle">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('help.backToLogin')}
        </button>

        <div className="mt-6 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('help.title')}
          </h1>
          <p className="text-base text-muted">{t('help.intro')}</p>
        </div>

        <Separator className="my-8" />

        <div className="space-y-8">
          <article className="rounded-2xl border border-border bg-background/40 p-6">
            <div className="flex items-center gap-3 text-primary">
              <Lock className="h-5 w-5" />
              <h2 className="text-xl font-semibold text-foreground">
                {t('help.forgotPassword.title')}
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted">
              {t('help.forgotPassword.description')}
            </p>
            <Button
              variant="outline"
              className="mt-5 rounded-full px-6 text-primary"
            >
              {t('help.forgotPassword.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </article>

          <Separator />

          <article className="rounded-2xl border border-border bg-background/40 p-6">
            <div className="flex items-center gap-3 text-primary">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-semibold text-foreground">
                {t('help.firstTime.title')}
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted">
              {t('help.firstTime.description')}
            </p>
          </article>

          <Separator />

          <article className="rounded-2xl border border-border bg-background/40 p-6">
            <div className="flex items-center gap-3 text-primary">
              <Mail className="h-5 w-5" />
              <h2 className="text-xl font-semibold text-foreground">
                {t('help.support.title')}
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted">
              {t('help.support.description')}
            </p>
            <div className="mt-4 space-y-2 rounded-xl bg-background/60 p-4 text-sm">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {t('help.support.email')}
              </p>
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {t('help.support.phone')}
              </p>
            </div>
          </article>

          <Separator />

          <article className="rounded-2xl border border-border bg-background/40 p-6">
            <div className="flex items-center gap-3 text-primary">
              <Lock className="h-5 w-5" />
              <h2 className="text-xl font-semibold text-foreground">
                {t('help.security.title')}
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted">
              {t('help.security.description')}
            </p>
            <Button
              variant="outline"
              className="mt-5 rounded-full px-6 text-primary"
              onClick={() => navigate('/login')}
            >
              {t('help.backToLogin')}
            </Button>
          </article>
        </div>
      </section>
    </div>
  )
}
