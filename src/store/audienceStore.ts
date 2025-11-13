import { create } from 'zustand'

import { type ProductCategoryId } from '@/data/productCategories'

export type AccountType = 'Savings' | 'Current' | 'Premium'
export type AccountStatus = 'Active' | 'Dormant'

export interface FiltersState {
  ageRange: [number, number]
  states: string[]
  accountTypes: AccountType[]
  statuses: AccountStatus[]
  minConfidence: number
}

interface AudienceState {
  activeCategory: ProductCategoryId
  selectedProducts: string[]
  filters: FiltersState
  pagination: {
    page: number
    limit: number
  }
  search: string
  selectedCustomerIds: Set<string>
  selectAllAcrossPages: boolean
  setActiveCategory: (category: ProductCategoryId) => void
  setSelectedProducts: (products: string[]) => void
  toggleProduct: (product: string) => void
  updateFilters: (filters: Partial<FiltersState>) => void
  resetFilters: () => void
  setPagination: (pagination: Partial<AudienceState['pagination']>) => void
  setSearch: (search: string) => void
  toggleCustomer: (id: string) => void
  selectAllOnPage: (ids: string[]) => void
  clearSelections: () => void
  setSelectAllAcrossPages: (value: boolean) => void
}

export const DEFAULT_FILTERS: FiltersState = {
  ageRange: [25, 65],
  states: [],
  accountTypes: [],
  statuses: [],
  minConfidence: 0.7,
}

export const useAudienceStore = create<AudienceState>((set) => ({
  activeCategory: 'cards',
  selectedProducts: [],
  filters: DEFAULT_FILTERS,
  pagination: {
    page: 1,
    limit: 10,
  },
  search: '',
  selectedCustomerIds: new Set(),
  selectAllAcrossPages: false,
  setActiveCategory: (category) =>
    set({
      activeCategory: category,
      selectedProducts: [],
      filters: DEFAULT_FILTERS,
      pagination: { page: 1, limit: 10 },
      search: '',
      selectedCustomerIds: new Set(),
      selectAllAcrossPages: false,
    }),
  setSelectedProducts: (products) =>
    set({
      selectedProducts: Array.from(new Set(products)),
    }),
  toggleProduct: (product) =>
    set((state) => {
      const exists = state.selectedProducts.includes(product)
      return {
        selectedProducts: exists
          ? state.selectedProducts.filter((item) => item !== product)
          : [...state.selectedProducts, product],
      }
    }),
  updateFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
      pagination: { ...state.pagination, page: 1 },
    })),
  resetFilters: () =>
    set({
      filters: DEFAULT_FILTERS,
      pagination: { page: 1, limit: 10 },
    }),
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
  setSearch: (search) =>
    set({
      search,
      pagination: { page: 1, limit: 10 },
    }),
  toggleCustomer: (id) =>
    set((state) => {
      const updated = new Set(state.selectedCustomerIds)
      if (updated.has(id)) {
        updated.delete(id)
      } else {
        updated.add(id)
      }
      return {
        selectedCustomerIds: updated,
        selectAllAcrossPages: false,
      }
    }),
  selectAllOnPage: (ids) =>
    set(() => ({
      selectedCustomerIds: new Set(ids),
      selectAllAcrossPages: false,
    })),
  clearSelections: () =>
    set({
      selectedCustomerIds: new Set(),
      selectAllAcrossPages: false,
    }),
  setSelectAllAcrossPages: (value) =>
    set({
      selectAllAcrossPages: value,
      selectedCustomerIds: value ? new Set() : new Set(),
    }),
}))
