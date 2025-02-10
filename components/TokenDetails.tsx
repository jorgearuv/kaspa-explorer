import type { TokenData } from '@/types/token'
import { formatTokenAmount } from '@/utils/token'

interface TokenDetailsProps {
  token: TokenData
}

export default function TokenDetails({ token }: TokenDetailsProps) {
  const formattedSupply = formatTokenAmount(token.minted, token.dec)
  const formattedMax = formatTokenAmount(token.max, token.dec)

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl">
        <div className="px-6 py-8 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center text-4xl font-bold text-indigo-600">
                {token.tick[0]}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {token.tick} Token
              </h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white">
                <span className="text-sm font-medium">KRC20</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Total Supply
              </dt>
              <dd className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                {formattedSupply}
              </dd>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4 mb-2">
                Max Supply
              </dt>
              <dd className="text-lg font-semibold text-indigo-600/80 dark:text-indigo-300/80">
                {formattedMax}
              </dd>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Holders
              </dt>
              <dd className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                {parseInt(token.holderTotal).toLocaleString()}
              </dd>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4 mb-2">
                Total Transfers
              </dt>
              <dd className="text-lg font-semibold text-indigo-600/80 dark:text-indigo-300/80">
                {parseInt(token.transferTotal).toLocaleString()}
              </dd>
            </div>
          </div>
        </div>
      </div>

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
          {token.holder.map(holder => (
            <div
              key={holder.address}
              className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {holder.address.slice(0, 12)}...{holder.address.slice(-8)}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatTokenAmount(holder.amount, token.dec)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
