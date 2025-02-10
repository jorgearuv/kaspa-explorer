import type { Metadata } from 'next'

const title = 'Kaspa Token Explorer'
const description =
  'Explore KRC20 tokens on the Kaspa network. View token details, holders, and transactions in real-time.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    'Kaspa',
    'KRC20',
    'Token Explorer',
    'Blockchain',
    'Cryptocurrency',
    'DeFi',
    'Token Analytics',
  ],
  authors: [
    {
      name: 'Kaspa Community',
      url: 'https://kaspa.org',
    },
  ],
  creator: 'Kaspa Community',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tokens.kaspa.org',
    title,
    description,
    siteName: title,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
    creator: '@kaspanet',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://tokens.kaspa.org'),
}
