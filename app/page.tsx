'use client'

import { useState } from 'react'

import TokenDetails from '@/components/TokenDetails'
import SearchBar from '@/components/Searchbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import ThemeToggle from '@/components/ThemeToggle'
import type { TokenData } from '@/types/token'
import { API_URL } from '@/constants/environment'

export default function Home() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchToken = async (ticker: string) => {
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
    } catch (error) {
      console.error('Error fetching token data:', error)
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-radial from-background via-background to-slate-900/5 dark:to-indigo-950/20 py-12 px-4 sm:px-6 lg:px-8">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 mb-4">
            Kaspa Token Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Search and explore KRC20 tokens on the Kaspa network
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 ease-in-out transform hover:shadow-xl">
          <SearchBar onSearch={searchToken} />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-12">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 dark:text-gray-300 animate-pulse">
              Loading...
            </p>
          </div>
        ) : error ? (
          <div className="text-center mt-12">
            <div className="bg-red-100 dark:bg-red-900/50 backdrop-blur-sm border-2 border-red-400 dark:border-red-700 p-4 rounded-lg inline-block">
              <p className="text-red-700 dark:text-red-300">
                <span className="font-semibold">Error:</span> {error}
              </p>
            </div>
          </div>
        ) : (
          tokenData && <TokenDetails token={tokenData} />
        )}
      </div>
    </main>
  )
}
