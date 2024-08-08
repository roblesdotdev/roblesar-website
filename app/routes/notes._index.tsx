import { Await, useLoaderData } from '@remix-run/react'
import { defer, type MetaFunction } from '@vercel/remix'
import { Suspense } from 'react'
import { CACHE_CONTROL } from '~/utils/http.server'
import { getUrl } from '~/utils/misc'
import { getNoteListing, type NoteListing } from '~/utils/notes.server'
import { getMetaTags } from '~/utils/seo'
import { type loader as rootLoader } from '~/root'
import { GeneralErrorBoundary } from '~/components/error-boundary'
import { NoteItem } from '~/components/notes'

export const meta: MetaFunction<typeof loader, { root: typeof rootLoader }> = ({
  error,
  matches,
}) => {
  const requestInfo = matches.find(m => m.id === 'root')?.data.requestInfo

  return [
    ...getMetaTags({
      title: error
        ? 'Error | Aldo R. Robles'
        : 'Personal Notes | Aldo R. Robles',
      description:
        'Explore my personal notes. Code, resources, experiences and more.',
      keywords: 'notes,posts',
      url: getUrl(requestInfo),
    }),
  ]
}

export async function loader() {
  return defer(
    {
      notes: getNoteListing(),
    },
    {
      headers: {
        'Cache-Control': CACHE_CONTROL.DEFAULT,
      },
    },
  )
}

export default function NotesRoute() {
  const { notes } = useLoaderData<typeof loader>()
  return (
    <div className="container py-10">
      <h1 className="text-xl font-medium">Personal Notes</h1>

      <div className="mt-8">
        <Suspense fallback={<NotesFallback />}>
          <Await resolve={notes}>{notes => <NotesList notes={notes} />}</Await>
        </Suspense>
      </div>
    </div>
  )
}

function NotesList({ notes }: { notes: NoteListing[] }) {
  return (
    <ul className="mt-8 flex flex-col gap-6">
      {notes.map(note => (
        <NoteItem note={note} key={note.slug} />
      ))}
    </ul>
  )
}

function NotesFallback() {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {Array.from({ length: 3 }, (_, idx) => (
        <li key={idx} className="h-24 w-full animate-pulse bg-panel" />
      ))}
    </ul>
  )
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
