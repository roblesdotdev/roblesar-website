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

export function typedBoolean<T>(
  value: T,
): value is Exclude<T, '' | 0 | false | null | undefined> {
  return Boolean(value)
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
