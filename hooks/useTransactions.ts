'use client'

import { useState, useCallback } from 'react'
import type { Transaction } from '@/types/token'
import { API_URL } from '@/constants/environment'

interface UseTransactionsProps {
  ticker: string
}

export function useTransactions({ ticker }: UseTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    if (!ticker) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_URL}/krc20/oplist?tick=${ticker.toLowerCase()}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data?.result || !Array.isArray(data.result)) {
        throw new Error('Invalid transaction data received')
      }

      setTransactions(data.result)
      return data.result
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch transactions'
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [ticker])

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
  }
}
