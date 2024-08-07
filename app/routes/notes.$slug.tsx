import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, type MetaFunction, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '~/components/error-boundary'
import { CACHE_CONTROL } from '~/utils/http.server'
import { getUrl } from '~/utils/misc'
import { getNoteBySlug } from '~/utils/notes.server'
import { getMetaTags } from '~/utils/seo'
import { type loader as rootLoader } from '~/root'
import { type HeadersFunction } from '@vercel/remix'

export const meta: MetaFunction<typeof loader, { root: typeof rootLoader }> = ({
  data,
  matches,
}) => {
  const requestInfo = matches.find(m => m.id === 'root')?.data.requestInfo
  const { title, summary, tags } = data?.note.frontmatter || {}

  return [
    ...getMetaTags({
      title,
      description: summary,
      keywords: tags?.join(','),
      url: getUrl(requestInfo),
    }),
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug
  if (typeof slug !== 'string') {
    throw new Error('Slug is required')
  }

  const note = await getNoteBySlug(slug)

  if (!note) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    note,
  })
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': CACHE_CONTROL.DEFAULT,
})

export default function NoteRoute() {
  const { note } = useLoaderData<typeof loader>()
  return (
    <div className="container py-16">
      <div className="mb-6">
        <Link
          to=".."
          replace
          className="inline-flex items-center gap-1 text-fg-muted"
        >
          <svg
            viewBox="0 0 15 15"
            className="h-4 w-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Back
        </Link>
      </div>
      <time
        dateTime={note.frontmatter.date}
        className="text-sm italic text-fg-muted"
      >
        {note.frontmatter.dateDisplay}
      </time>
      <h1 className="text-2xl font-medium">{note.frontmatter.title}</h1>
      <div className="mt-8">
        <div
          dangerouslySetInnerHTML={{ __html: note.html }}
          className="prose !max-w-none"
        />
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
