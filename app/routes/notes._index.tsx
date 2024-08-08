import { Await, Link, useLoaderData } from '@remix-run/react'
import { defer } from '@vercel/remix'
import { Suspense } from 'react'
import { getNoteListing, type NoteListing } from '~/utils/notes.server'

export async function loader() {
  return defer({
    notes: getNoteListing(),
  })
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
        <li key={note.slug} className="flex flex-col gap-1">
          <time
            className="text-sm italic text-fg-muted"
            dateTime={note.dateDisplay}
          >
            {note.dateDisplay}
          </time>
          <Link
            to={`/notes/${note.slug}`}
            prefetch="intent"
            className="self-start"
          >
            <h1>{note.title}</h1>
          </Link>
          <p className="text-sm text-fg-muted">{note.summary}</p>
          <div className="pt-3">
            <Link
              to={`/notes/${note.slug}`}
              prefetch="intent"
              className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg-accent"
            >
              Read more
              <span className="sr-only">{note.title}</span>
              <svg
                className="h-3 w-3"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </li>
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
