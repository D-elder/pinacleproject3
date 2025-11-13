import { motion } from 'framer-motion'
import {
  Briefcase,
  CreditCard,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  User,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAudienceStore } from '@/store/audienceStore'
import { type ProductCategory } from '@/data/productCategories'

const ICON_MAP: Record<string, LucideIcon> = {
  User,
  CreditCard,
  Smartphone,
  Briefcase,
  TrendingUp,
  ShoppingCart,
}

interface CategoryCardProps {
  category: ProductCategory
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setActiveCategory = useAudienceStore((state) => state.setActiveCategory)

  const Icon = ICON_MAP[category.icon] ?? User

  const handleExplore = () => {
    setActiveCategory(category.id)
    navigate(`/category/${category.id}`)
  }

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }}>
      <Card className="h-full border border-border/80 bg-white shadow-sm transition hover:border-primary/30">
        <CardContent className="flex h-full flex-col justify-between space-y-6 p-7">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {category.name}
              </h3>
              <p className="text-sm text-muted">{category.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="group w-fit px-0 text-primary"
            onClick={handleExplore}
          >
            {t('categories.explore')}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
