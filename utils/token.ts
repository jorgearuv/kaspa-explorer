// Helper function to format large numbers with decimals
export function formatTokenAmount(amount: string, decimals: string): string {
  const dec = parseInt(decimals, 10)
  const num = BigInt(amount)
  const divisor = BigInt(10 ** dec)
  const integerPart = num / divisor
  const fractionalPart = num % divisor

  const formattedFractional = fractionalPart.toString().padStart(dec, '0')
  return `${integerPart.toLocaleString()}.${formattedFractional}`
}
