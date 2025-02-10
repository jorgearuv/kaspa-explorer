import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TokenPage } from '@/components/TokenPage'
import { useToken } from '@/hooks/useToken'

interface TokenPageParams {
  params: {
    token: string
  }
}

export async function generateMetadata({
  params,
}: TokenPageParams): Promise<Metadata> {
  return {
    title: `${params.token.toUpperCase()} Token | Kaspa Explorer`,
    description: `View details for ${params.token.toUpperCase()} token on the Kaspa network`,
  }
}

export default async function TokenPageWrapper({ params }: TokenPageParams) {
  const { token } = params

  try {
    // We just use the hook for the initial fetching
    const { fetchToken } = useToken()
    await fetchToken(token)

    return <TokenPage initialToken={token} />
  } catch (error) {
    notFound()
  }
}
