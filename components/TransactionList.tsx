import { formatTokenAmount } from '@/utils/token'
import { Transaction } from '@/types/token'

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[]
}) {
  return (
    <div className="bg-card-bg border border-card-border rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-card-border">
        <h3 className="text-lg font-semibold text-foreground">
          Latest Transactions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last {transactions.length} transfers
        </p>
      </div>

      <div className="divide-y divide-card-border">
        {transactions.map(tx => (
          <div
            key={tx.hashRev}
            className="px-6 py-4 hover:bg-hover-bg transition-colors"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Transaction Info */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                    {tx.op}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(parseInt(tx.mtsAdd)).toLocaleString()}
                  </span>
                </div>

                {/* Addresses */}
                <div className="flex flex-col gap-1 text-sm">
                  <div className="text-gray-500 dark:text-gray-400">
                    From:{' '}
                    <span className="font-mono">
                      {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    To:{' '}
                    <span className="font-mono">
                      {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount and Status */}
              <div className="flex flex-col items-end gap-1">
                <div className="text-base font-medium text-foreground">
                  {formatTokenAmount(tx.amt, '8')} {tx.tick}
                </div>
                <div className="flex items-center gap-2">
                  {tx.opAccept === '1' ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                      Confirmed
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300">
                      Pending
                    </span>
                  )}
                  {tx.opError && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                      Error
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
