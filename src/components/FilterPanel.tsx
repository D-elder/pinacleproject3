import { useEffect, useMemo, useState } from 'react'
import { Filter, RefreshCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { DEFAULT_FILTERS, useAudienceStore } from '@/store/audienceStore'
import { NIGERIA_STATES } from '@/data/nigeriaStates'

const ACCOUNT_TYPES = ['Savings', 'Current', 'Premium'] as const
const ACCOUNT_STATUS = ['Active', 'Dormant'] as const

export const FilterPanel = () => {
  const { t } = useTranslation()
  const filters = useAudienceStore((state) => state.filters)
  const updateFilters = useAudienceStore((state) => state.updateFilters)
  const resetFilters = useAudienceStore((state) => state.resetFilters)

  const [ageRange, setAgeRange] = useState<[number, number]>(filters.ageRange)
  const [selectedStates, setSelectedStates] = useState<string[]>(filters.states)
  const [accountTypes, setAccountTypes] = useState<string[]>(filters.accountTypes)
  const [statuses, setStatuses] = useState<string[]>(filters.statuses)
  const [confidence, setConfidence] = useState<number>(filters.minConfidence * 100)

  useEffect(() => {
    setAgeRange(filters.ageRange)
    setSelectedStates(filters.states)
    setAccountTypes(filters.accountTypes)
    setStatuses(filters.statuses)
    setConfidence(filters.minConfidence * 100)
  }, [filters])

  const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false
    const aSorted = [...a].sort()
    const bSorted = [...b].sort()
    return aSorted.every((value, index) => value === bSorted[index])
  }

  const hasChanges = useMemo(() => {
    return (
      ageRange[0] !== filters.ageRange[0] ||
      ageRange[1] !== filters.ageRange[1] ||
      confidence !== filters.minConfidence * 100 ||
      !arraysEqual(selectedStates, filters.states) ||
      !arraysEqual(accountTypes, filters.accountTypes) ||
      !arraysEqual(statuses, filters.statuses)
    )
  }, [ageRange, confidence, selectedStates, accountTypes, statuses, filters])

  const handleApply = () => {
    updateFilters({
      ageRange,
      states: selectedStates,
      accountTypes: accountTypes as typeof ACCOUNT_TYPES[number][],
      statuses: statuses as typeof ACCOUNT_STATUS[number][],
      minConfidence: confidence / 100,
    })
  }

  const handleReset = () => {
    resetFilters()
    setAgeRange(DEFAULT_FILTERS.ageRange)
    setSelectedStates(DEFAULT_FILTERS.states)
    setAccountTypes(DEFAULT_FILTERS.accountTypes)
    setStatuses(DEFAULT_FILTERS.statuses)
    setConfidence(DEFAULT_FILTERS.minConfidence * 100)
  }

  const toggleValue = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(
      list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
    )
  }

  return (
    <aside className="sticky top-0 h-fit rounded-3xl border border-border bg-white/40 p-6 shadow-subtle">
      <div className="mb-6 flex items-center gap-3 text-primary">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Filter className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {t('categoryView.refineAudience')}
          </h2>
          <p className="text-xs text-muted">Fine-tune to target the perfect segment</p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {t('categoryView.ageRange')}
          </Label>
          <div className="rounded-2xl border border-border/70 bg-white/60 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-foreground">
              <span>{ageRange[0]} yrs</span>
              <span>{ageRange[1]} yrs</span>
            </div>
            <Slider
              value={ageRange}
              min={18}
              max={75}
              step={1}
              onValueChange={(value: number[]) =>
                setAgeRange(value as [number, number])
              }
              className="mt-4"
            />
          </div>
        </section>

        <Separator />

        <section className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {t('categoryView.state')}
          </Label>
          <ScrollArea className="h-40 rounded-2xl border border-border/70 bg-white/60 p-4">
            <div className="space-y-3">
              {NIGERIA_STATES.map((state) => (
                <label key={state} className="flex items-center gap-3 text-sm text-foreground">
                  <Checkbox
                    checked={selectedStates.includes(state)}
                    onCheckedChange={() => toggleValue(state, selectedStates, setSelectedStates)}
                  />
                  {state}
                </label>
              ))}
            </div>
          </ScrollArea>
        </section>

        <Separator />

        <section className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {t('categoryView.accountType')}
          </Label>
          <div className="space-y-3 rounded-2xl border border-border/70 bg-white/60 p-4">
            {ACCOUNT_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-3 text-sm text-foreground">
                <Checkbox
                  checked={accountTypes.includes(type)}
                  onCheckedChange={() => toggleValue(type, accountTypes, setAccountTypes)}
                />
                {type}
              </label>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {t('categoryView.status')}
          </Label>
          <div className="space-y-3 rounded-2xl border border-border/70 bg-white/60 p-4">
            {ACCOUNT_STATUS.map((status) => (
              <label key={status} className="flex items-center gap-3 text-sm text-foreground">
                <Checkbox
                  checked={statuses.includes(status)}
                  onCheckedChange={() => toggleValue(status, statuses, setStatuses)}
                />
                {status}
              </label>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {t('categoryView.minConfidence')}
          </Label>
          <div className="rounded-2xl border border-border/70 bg-white/60 p-4">
            <div className="text-right text-sm font-semibold text-primary">
              {confidence}%
            </div>
            <Slider
              value={[confidence]}
              min={50}
              max={100}
              step={1}
              onValueChange={(value: number[]) => setConfidence(value[0] ?? 70)}
              className="mt-4"
            />
          </div>
        </section>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          className="w-full rounded-full bg-primary py-3 text-sm font-semibold uppercase tracking-wider disabled:bg-primary/60"
          onClick={handleApply}
          disabled={!hasChanges}
        >
          {t('categoryView.applyFilters')}
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-full border-border py-3 text-sm font-semibold text-muted transition hover:text-primary"
          onClick={handleReset}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          {t('categoryView.resetAll')}
        </Button>
      </div>
    </aside>
  )
}
