'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (ticker: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [ticker, setTicker] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticker.trim()) {
      onSearch(ticker.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Enter token ticker (e.g., NACHO)"
          value={ticker}
          onChange={e => setTicker(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-base bg-white/80 dark:bg-gray-800/80 
                   border border-gray-200 dark:border-gray-700 
                   text-gray-900 dark:text-gray-100
                   rounded-l-xl backdrop-blur-sm
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                   focus:border-transparent
                   transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 
                 dark:bg-indigo-600 dark:hover:bg-indigo-700
                 text-white font-medium rounded-r-xl
                 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                 disabled:opacity-50 disabled:cursor-not-allowed
                 shadow-sm hover:shadow-md"
        disabled={!ticker.trim()}
      >
        Search
      </button>
    </form>
  )
}
