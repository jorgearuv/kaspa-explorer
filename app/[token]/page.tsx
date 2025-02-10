import { notFound } from 'next/navigation'

import { TokenPageClient } from '@/components/TokenPageClient'
import { API_URL } from '@/constants/environment'
import type { TokenData } from '@/types/token'
interface TokenPageParams {
  token: string
}

async function getInitialToken(ticker: string): Promise<TokenData> {
  const response = await fetch(
    `${API_URL}/krc20/token/${ticker.toLowerCase()}`,
    { next: { revalidate: 60 } },
  )

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

  const data = await response.json()
  if (!data?.result?.[0]) throw new Error('Token not found')

  return data.result[0]
}

export async function generateMetadata({
  params,
}: {
  params: TokenPageParams
}) {
  return {
    title: `${params.token.toUpperCase()} Token | Kaspa Explorer`,
    description: `View details for ${params.token.toUpperCase()} token on the Kaspa network`,
  }
}

export default async function TokenPage({
  params,
}: {
  params: { token: string }
}) {
  try {
    const initialData = await getInitialToken(params.token)
    return (
      <TokenPageClient initialToken={params.token} initialData={initialData} />
    )
  } catch {
    notFound()
  }
}
