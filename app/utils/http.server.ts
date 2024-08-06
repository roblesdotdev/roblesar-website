export const CACHE_CONTROL = {
  /**
   * Keep it in the browser (and CDN) for 1h so when they click
   * back/forward/etc. it's super fast. SWR for 1 week on CDN so it stays fast,
   * but people get typos/fixes and stuff too.
   */
  DEFAULT: 'max-age=3600, stale-while-revalidate=604800',
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
