import { CreditCard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  name: string
  description: string
  target?: string
  selected?: boolean
  onToggle: () => void
}

export const ProductCard = ({
  name,
  description,
  target,
  selected = false,
  onToggle,
}: ProductCardProps) => {
  return (
    <Card
      className={cn(
        'h-full border border-border/70 bg-white transition hover:border-primary/40',
        selected && 'border-primary shadow-card',
      )}
    >
      <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
        <div className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted">{description}</p>
            {target && (
              <p className="text-sm font-medium text-primary/80">Target: {target}</p>
            )}
          </div>
        </div>
        <Button
          variant={selected ? 'default' : 'outline'}
          className={cn(
            'w-full rounded-full transition',
            selected ? 'bg-primary text-white' : 'border-primary text-primary',
          )}
          onClick={onToggle}
        >
          {selected ? 'Selected' : 'Select Product'}
        </Button>
      </CardContent>
    </Card>
  )
}
