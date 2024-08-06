/* Best way to get error message */
export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }
  return 'Unknown Error'
}

/**
 * @returns domain URL (without a ending slash, like: https://roblesar.com)
 */
export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  if (!host) {
    throw new Error('Could not determine domain URL.')
  }
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s
}

function getOrigin(requestInfo?: { origin?: string; path: string }) {
  return requestInfo?.origin ?? 'https://roblesar.vercel.app'
}

export function getUrl(requestInfo?: { origin: string; path: string }) {
  return removeTrailingSlash(
    `${getOrigin(requestInfo)}${requestInfo?.path ?? ''}`,
  )
}

export function typedBoolean<T>(
  value: T,
): value is Exclude<T, '' | 0 | false | null | undefined> {
  return Boolean(value)
}
