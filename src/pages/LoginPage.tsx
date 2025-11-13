import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User2 } from 'lucide-react'

import { PinnacleLogo } from '@/components/PinnacleLogo'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
}

const heroImage =
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1080&q=80'

export const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    control,
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  })
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    navigate('/dashboard')
  }

  const remember = useWatch({
    control,
    name: 'remember',
  }) ?? false

  return (
    <div className="grid min-h-screen grid-cols-1 bg-background text-foreground lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary lg:block">
        <img
          src={heroImage}
          alt="Banking professional"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-14">
          <div>
            <span className="rounded-full bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-white">
              {t('brandName')}
            </span>
          </div>
          <div className="space-y-6 text-white">
            <p className="text-sm uppercase tracking-[0.5em] text-white/70">
              {t('brandTagline')}
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              {t('heroMessage')}
            </h1>
            <p className="max-w-md text-base text-white/80">
              Real-time customer intelligence that helps your relationship managers deliver the right service at the right moment.

            </p>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-sm font-medium">Pinnacle by Zenith Bank</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-primary/40 to-primary/40" />
      </aside>

      <main className="flex items-center justify-center px-6 py-16 sm:px-12 md:px-16">
        <div className="w-full max-w-xl rounded-3xl bg-card p-10 shadow-subtle">
          <div className="flex items-start justify-between gap-4">
            <PinnacleLogo className="h-10 w-auto" />
            <LanguageSelector alignEnd />
          </div>

          <div className="mt-10 space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              {t('login.welcome')}
            </h2>
            <p className="text-sm text-muted">{t('login.instructions')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
            <fieldset className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wide text-muted">
                {t('login.username')}
              </label>
              <Input
                placeholder="sarah.johnson@pinnacle.ai"
                leftIcon={<User2 className="h-4 w-4 text-muted" />}
                {...register('username', { required: true })}
              />
            </fieldset>

            <fieldset className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wide text-muted">
                {t('login.password')}
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4 text-muted" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted transition hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register('password', { required: true })}
              />
            </fieldset>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <Checkbox
                  checked={remember}
                  onCheckedChange={(checked) =>
                    setValue('remember', Boolean(checked))
                  }
                  name="remember"
                />
                <span>{t('login.rememberMe')}</span>
              </label>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary py-6 text-base font-semibold uppercase tracking-wider shadow-card transition hover:-translate-y-0.5 hover:bg-primary-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : t('login.button')}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm font-medium text-primary">
            <button
              type="button"
              className="transition hover:text-primary/80"
              onClick={() => navigate('/forgot-password')}
            >
              {t('login.forgotPassword')}
            </button>
            <button
              type="button"
              className="transition hover:text-primary/80"
              onClick={() => navigate('/help')}
            >
              {t('login.needHelp')}
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <div className="h-px bg-border" />
            <div className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted whitespace-nowrap">
              {t('securePillars.0')}
              <span className="px-1">•</span>
              {t('securePillars.1')}
              <span className="px-1">•</span>
              {t('securePillars.2')}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
