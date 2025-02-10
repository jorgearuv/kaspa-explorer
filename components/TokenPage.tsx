'use client'

import TokenDetails from '@/components/TokenDetails'
import SearchBar from '@/components/Searchbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import ThemeToggle from '@/components/ThemeToggle'
import { useToken } from '@/hooks/useToken'
import { useTransactions } from '@/hooks/useTransactions'
import { useEffect } from 'react'
import TransactionList from './TransactionList'
import { formatTokenAmount } from '@/utils/token'

interface TokenPageProps {
  initialToken?: string
}

function EmptyState() {
  return (
    <div className="text-center mt-12 p-8 bg-card-bg border border-card-border rounded-lg">
      <svg
        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        No token selected
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Search for a KRC20 token using the search bar above
      </p>
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="text-center mt-12">
      <div className="bg-red-100 dark:bg-red-900/50 backdrop-blur-sm border-2 border-red-400 dark:border-red-700 p-6 rounded-lg inline-block max-w-lg mx-auto">
        <svg
          className="h-10 w-10 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-red-700 dark:text-red-300 font-medium text-lg mb-2">
          Error occurred
        </p>
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-12">
      <LoadingSpinner size="lg" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse font-medium">
          Loading token data...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This may take a few seconds
        </p>
      </div>
    </div>
  )
}

export function TokenPage({ initialToken }: TokenPageProps) {
  const {
    tokenData,
    isLoading: tokenLoading,
    error: tokenError,
    fetchToken,
  } = useToken()
  const {
    transactions,
    isLoading: txLoading,
    error: txError,
    fetchTransactions,
  } = useTransactions({
    ticker: tokenData?.tick || '',
    limit: 50,
  })

  useEffect(() => {
    if (initialToken) {
      fetchToken(initialToken)
    }
  }, [initialToken])

  useEffect(() => {
    if (tokenData?.tick) {
      fetchTransactions()
    }
  }, [tokenData?.tick])

  const isLoading = tokenLoading || txLoading
  const error = tokenError || txError

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

        <div className="glass-card p-6 mb-8 transform transition-all duration-300 hover:scale-[1.01]">
          <SearchBar onSearch={fetchToken} />
        </div>

        <div className="transition-all duration-500 ease-in-out">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : tokenData ? (
            <div className="animate-fadeIn">
              <TokenDetails token={tokenData} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Top Holders
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Showing the largest token holders
                    </p>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tokenData.holder.map(holder => (
                      <div
                        key={holder.address}
                        className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {holder.address.slice(0, 8)}...
                            {holder.address.slice(-6)}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {formatTokenAmount(holder.amount, tokenData.dec)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <TransactionList transactions={transactions} />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  )
}
