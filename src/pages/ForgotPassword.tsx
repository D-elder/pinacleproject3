import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormValues {
  email: string
}

export const ForgotPassword = () => {
  const { t } = useTranslation()
  const { register, handleSubmit, reset } = useForm<FormValues>({ defaultValues: { email: '' } })
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data: FormValues) => {
    // In a real app we'd call the API; here we simulate success
    setSubmitted(true)
    setTimeout(() => {
      reset()
    }, 400)
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-6 py-16 bg-background">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-subtle">
        <h1 className="text-xl font-semibold mb-2">{t('forgot.title')}</h1>
        <p className="text-sm text-muted mb-6">{t('forgot.instructions')}</p>

        {submitted ? (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
            {t('forgot.success')}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="text-sm font-medium">{t('forgot.emailLabel')}</label>
            <Input placeholder="you@company.com" {...register('email', { required: true })} />

            <div className="flex justify-end">
              <Button type="submit" className="rounded-full bg-primary py-3 px-6">{t('forgot.submit')}</Button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default ForgotPassword
