import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
} from '@remix-run/react'
import '~/styles/global.css'
import { getMetaTags } from './utils/seo'
import { getDomainUrl } from './utils/http.server'
import { json, type LoaderFunctionArgs } from '@vercel/remix'
import { getUrl } from './utils/misc'

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
  const requestInfo = data?.requestInfo
  const title = error ? 'Error | Aldo R. Robles' : 'Aldo R. Robles'
  return [
    ...getMetaTags({
      keywords: 'full-stack,react,typescript,developer',
      url: getUrl(requestInfo),
      title,
    }),
  ]
}

export function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="relative">
        <header className="h-[60px] w-full">
          <nav className="container flex h-[inherit] items-center justify-between">
            <Link
              to="/"
              className="flex size-8 items-center justify-center rounded-md border border-border/50 outline-none ring-border transition-all focus-visible:ring-2"
            >
              <span className="text-xl font-medium">r.</span>
            </Link>
          </nav>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
