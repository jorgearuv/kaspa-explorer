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
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Enter token ticker (e.g., NACHO)"
        value={ticker}
        onChange={e => setTicker(e.target.value)}
        className="flex-grow appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-indigo-500 transition-colors duration-200"
      />
      <button
        type="submit"
        className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
      >
        Search
      </button>
    </form>
  )
}
