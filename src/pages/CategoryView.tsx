import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { FilterPanel } from '@/components/FilterPanel'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/data/productCategories'
import { PRODUCT_DESCRIPTIONS } from '@/data/productDescriptions'
import { useAudienceStore } from '@/store/audienceStore'

const getProductDescription = (productName: string) => {
  return PRODUCT_DESCRIPTIONS[productName]?.description || 'Innovative banking solutions tailored to your needs.'
}

const getProductTarget = (productName: string) => {
  return PRODUCT_DESCRIPTIONS[productName]?.target || 'Customers seeking upgraded banking experiences'
}

export const CategoryView = () => {
  const { id } = useParams<{ id: ProductCategory['id'] }>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setActiveCategory = useAudienceStore((state) => state.setActiveCategory)
  const toggleProduct = useAudienceStore((state) => state.toggleProduct)
  const selectedProducts = useAudienceStore((state) => state.selectedProducts)

  const category = PRODUCT_CATEGORIES.find((c) => c.id === id) ?? PRODUCT_CATEGORIES[0]

  useEffect(() => {
    if (id && category) {
      setActiveCategory(category.id)
    }
  }, [id, category, setActiveCategory])

  const handleToggle = (product: string) => {
    toggleProduct(product)
  }

  const handleGenerateList = () => {
    navigate('/customers')
  }

  return (
    <div className="min-h-screen bg-background pb-32 text-foreground">
      <header className="border-b border-border bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('categoryView.back')}
          </button>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
            <p className="text-sm text-muted">{category.description}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-10 flex max-w-6xl flex-col gap-8 px-6 lg:flex-row">
        <div className="w-full shrink-0 lg:w-[320px]">
          <FilterPanel />
        </div>
        <section className="flex-1 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {category.subcategories.map((product) => (
              <ProductCard
                key={product}
                name={product}
                description={getProductDescription(product)}
                target={getProductTarget(product)}
                selected={selectedProducts.includes(product)}
                onToggle={() => handleToggle(product)}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedProducts.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 shadow-[0_-8px_30px_rgba(15,23,42,0.1)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-semibold text-foreground">
              {t('categoryView.selectedCount', { count: selectedProducts.length })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full border-border px-6 text-sm font-semibold text-muted"
                onClick={() => selectedProducts.forEach((product) => toggleProduct(product))}
              >
                Clear
              </Button>
              <Button
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wide"
                onClick={handleGenerateList}
              >
                {t('categoryView.generateCustomerList')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
