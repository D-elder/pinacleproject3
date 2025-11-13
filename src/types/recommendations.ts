import { type ProductCategoryId } from '@/data/productCategories'

export interface RecommendationRequestParams {
  page?: number
  limit?: number
  product_category?: ProductCategoryId
  products?: string[]
  min_age?: number
  max_age?: number
  state?: string
  account_type?: string
  status?: string
  min_confidence?: number
  search?: string
}

export interface RecommendationRecord {
  customer_id: string
  customer_name: string
  gender: string
  age: number
  city: string
  state: string
  occupation: string
  income_bracket: string
  recommended_product: string
  confidence_score: number
  reason?: string
}

export interface RecommendationResponse {
  data: RecommendationRecord[]
  pagination: {
    current_page: number
    total_pages: number
    total_records: number
    page_size: number
    has_next: boolean
    has_previous: boolean
  }
}
