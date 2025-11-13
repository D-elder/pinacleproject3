import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, Mail, Smartphone, TrendingUp, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

type Channel = 'sms' | 'email' | 'app'

interface SendOffersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCount: number
  totalCount: number
  products: string[]
  scope: 'page' | 'all'
  currentPage?: number
}

const CHANNELS: { labelKey: string; value: Channel; icon: LucideIcon }[] = [
  { labelKey: 'modal.channelSms', value: 'sms', icon: MessageCircle },
  { labelKey: 'modal.channelEmail', value: 'email', icon: Mail },
  { labelKey: 'modal.channelApp', value: 'app', icon: Smartphone },
]

const DEFAULT_TEMPLATE = `Hi {{first_name}},

We noticed {{detected_signal}} and wanted to reach out with an exclusive opportunity from Pinnacle.

Based on your profile, you're a great match for:
**{{product_name}}**

{{product_benefits}}

Let's discuss how this can help you achieve your goals.

Reply YES or call {{agent_phone}} to learn more.

Best regards,
{{agent_name}}
Pinnacle`

export const SendOffersModal = ({
  open,
  onOpenChange,
  selectedCount,
  totalCount,
  products,
  scope,
  currentPage = 1,
}: SendOffersModalProps) => {
  const { t } = useTranslation()
  const [primaryChannel, setPrimaryChannel] = useState<Channel>('sms')
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE)

  const isBulk = scope === 'all'
  const title = isBulk ? t('modal.sendBulkTitle') : t('modal.sendOffersTitle')
  const subtitle = isBulk
    ? t('modal.bulkWarning', { count: totalCount })
    : t('modal.sendingTo', {
        count: selectedCount,
        context: t('modal.contextPage', { page: currentPage }),
      })

  const channelBadges = useMemo(
    () =>
      CHANNELS.map(({ labelKey, value, icon: Icon }) => (
        <Button
          key={value}
          variant={primaryChannel === value ? 'default' : 'outline'}
          className={
            primaryChannel === value
              ? 'rounded-full bg-primary text-white'
              : 'rounded-full border-border text-muted hover:text-primary'
          }
          onClick={() => setPrimaryChannel(value)}
        >
          <Icon className="mr-2 h-4 w-4" />
          {t(labelKey)}
        </Button>
      )),
    [primaryChannel, t],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <Badge variant="neutral" className="w-fit">
            {primaryChannel.toUpperCase()}
          </Badge>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted">
            {subtitle}
          </DialogDescription>
          <div className="flex flex-wrap items-center gap-2">{channelBadges}</div>
        </DialogHeader>

        <section className="space-y-4">
          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('modal.products', { products: products.join(', ') })}
            </h3>
            <p className="mt-2 text-xs text-muted">
              {isBulk
                ? t('modal.totalRecipients', { count: totalCount })
                : t('modal.recipients', { count: selectedCount })}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t('modal.messageTemplate')}
            </h4>
            <Textarea
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
              className="mt-2"
            />
          </div>

          <div className="grid gap-4 rounded-2xl border border-border bg-background/50 p-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t('modal.campaignSummary')}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted">
                <li>
                  •{' '}
                  {t('modal.recipients', {
                    count: isBulk ? totalCount : selectedCount,
                  })}
                </li>
                <li>• {t('modal.estimatedCost')}: ₦{(selectedCount * 15).toLocaleString()}</li>
                <li>• {t('modal.estimatedDelivery')}: {isBulk ? '48-72 hours' : 'Immediate'}</li>
                <li>• {t('modal.expectedResponses')}: ~{Math.round(selectedCount * 0.3)}</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t('modal.impactAnalysis')}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-success">
                <TrendingUp className="h-4 w-4" />
                Engagement forecast: 34% response · 12% conversion
              </div>
              <p className="mt-2 text-xs text-muted">
                {isBulk
                  ? 'Campaign will auto-queue in 10,000-customer batches with real-time monitoring.'
                  : 'Send now for immediate handoff to the relationship manager work queue.'}
              </p>
            </div>
          </div>

          {isBulk && (
            <div className="rounded-2xl border border-info/30 bg-info/10 p-4 text-sm text-info">
              {t('modal.startImmediately')}
              <div className="mt-2 space-y-2 text-xs">
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" defaultChecked />
                  {t('modal.startImmediately')}
                </label>
                <label className="flex items-center gap-2 text-muted">
                  <input type="radio" disabled />
                  {t('modal.schedule')}
                </label>
              </div>
            </div>
          )}
        </section>

        <DialogFooter className="gap-2 sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={isBulk} />
              {t('modal.requireApproval')}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              {t('modal.sendWeeklyReports')}
            </label>
          </div>
          <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('modal.cancel')}
            </Button>
            <Button variant="outline">{t('modal.submitForApproval')}</Button>
            <Button className="bg-primary text-white">
              {isBulk ? t('modal.sendCampaign') : t('modal.sendNow')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
