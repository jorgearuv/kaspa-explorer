import { TokenHolder } from '@/types/token'
import { formatTokenAmount } from '@/utils/token'

interface HoldersListProps {
  holders: TokenHolder[]
  decimals: string
}

export default function HoldersList({ holders, decimals }: HoldersListProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-card-border">
        <h3 className="text-lg font-semibold text-foreground">Top Holders</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {holders?.length || 0} addresses hold this token
        </p>
      </div>
      <div className="divide-y divide-card-border">
        {holders?.map((holder, index) => (
          <div
            key={holder.address}
            className="px-6 py-4 hover:bg-hover-bg transition-colors"
          >
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center min-w-0">
                <span className="flex-shrink-0 w-8 text-gray-500 dark:text-gray-400 text-sm">
                  #{index + 1}
                </span>
                <div className="truncate">
                  <span
                    title={holder.address}
                    className="font-mono text-sm text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {holder.address.slice(0, 8)}...{holder.address.slice(-8)}
                  </span>
                </div>
              </div>
              <div
                title={formatTokenAmount(holder.amount, decimals)}
                className="flex-shrink-0 text-right"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatTokenAmount(holder.amount, decimals)}
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {(
                    (Number(holder.amount) /
                      Number(
                        holders.reduce((acc, h) => acc + Number(h.amount), 0),
                      )) *
                    100
                  ).toFixed(2)}
                  %
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
