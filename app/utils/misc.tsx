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

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Error} if condition is falsey
 */
export function invariant(
  condition: unknown,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message)
  }
}
