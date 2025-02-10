import { useState } from 'react'
import type { TokenData } from '@/types/token'
import { API_URL } from '@/constants/environment'

export function useToken() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchToken = async (ticker: string) => {
    setIsLoading(true)
    setTokenData(null)
    setError(null)

    try {
      const response = await fetch(
        `${API_URL}/krc20/token/${ticker.toLowerCase()}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data received from the server')
      }

      setTokenData(data.result[0] as TokenData)
      return data.result[0] as TokenData
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    tokenData,
    isLoading,
    error,
    fetchToken,
  }
}
