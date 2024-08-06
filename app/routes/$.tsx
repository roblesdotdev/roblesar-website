import { GeneralErrorBoundary } from '~/components/error-boundary'

export function loader() {
  throw new Response('Not found', { status: 404 })
}

export default function NotFoundRoute() {
  return <GeneralErrorBoundary />
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
