// Default to development API URL if not provided
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Validate API URL is set
if (!API_URL) {
  throw new Error(
    'API_URL is not defined. Please set NEXT_PUBLIC_API_URL in your .env.local file',
  )
}
