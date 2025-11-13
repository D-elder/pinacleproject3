import { useQuery, keepPreviousData } from '@tanstack/react-query'

import {
  type RecommendationRequestParams,
  type RecommendationResponse,
} from '@/types/recommendations'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const buildQueryString = (params: RecommendationRequestParams) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        searchParams.append(key, value.join(','))
      }
      return
    }

    if (typeof value === 'number') {
      searchParams.append(key, value.toString())
      return
    }

    searchParams.append(key, value)
  })

  return searchParams.toString()
}

export const fetchRecommendations = async (
  params: RecommendationRequestParams,
): Promise<RecommendationResponse> => {
  const query = buildQueryString(params)
  const url =
    query.length > 0
      ? `${API_BASE_URL}/api/recommendations_table?${query}`
      : `${API_BASE_URL}/api/recommendations_table`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch customer recommendations')
  }

  const data = (await response.json()) as RecommendationResponse

  return data
}

export const useRecommendationsQuery = (params: RecommendationRequestParams) =>
  useQuery<RecommendationResponse, Error>({
    queryKey: ['recommendations', params],
    queryFn: () => fetchRecommendations(params),
    placeholderData: keepPreviousData,
  })
