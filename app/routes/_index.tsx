import { useLoaderData } from '@remix-run/react'
import { json } from '@vercel/remix'
import { GeneralErrorBoundary } from '~/components/error-boundary'
import { type ProjectListing } from '~/types'
import { getProjects } from '~/utils/projects.server'

export async function loader() {
  return json({
    projects: getProjects(),
  })
}

export default function Index() {
  const { projects } = useLoaderData<typeof loader>()
  return (
    <div className="container py-8">
      <h1 className="text-xl font-medium">Aldo R. Robles</h1>
      <p className="text-fg-muted">Full-stack Web Developer</p>

      <div className="h-6" />

      <div className="mt-8">
        <ProjectsSection projects={projects} />
      </div>
    </div>
  )
}

function ProjectsSection({ projects }: { projects: ProjectListing[] }) {
  const hasProjects = projects.length > 0
  return (
    <div className="mt-8">
      <h2 className="text-sm italic text-fg-muted">Recent Projects</h2>
      {hasProjects ? (
        <ul className="mt-8 grid grid-cols-1 gap-6">
          {projects.map(project => (
            <li key={project.slug} className="flex flex-col gap-1">
              <h2 className="text-base font-medium">{project.title}</h2>
              <p className="text-sm text-fg-muted">{project.summary}</p>
              <ul className="mt-2 flex flex-wrap items-center gap-2">
                {project.tags.map(tag => (
                  <Tag label={tag} key={tag} />
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-4">
                {Object.entries(project.links).map(([key, href]) => (
                  <ExternalLink key={key} href={href}>
                    {key}
                  </ExternalLink>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-fg-muted">
          No projects yet. I&apos; working to improve this section. You can
          check the updates in the{' '}
          <a
            className="underline"
            href="https://github.com/roblesdotdev/roblesar.com"
            target="_blank"
            rel="noreferrer"
          >
            repo
          </a>
          .
        </p>
      )}
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <li className="inline-flex cursor-default whitespace-nowrap rounded-md bg-fg/5 px-2 py-0.5 text-xs">
      {label}
    </li>
  )
}

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-1 text-sm leading-none text-fg-muted hover:text-fg-accent hover:underline"
    >
      {children}
      <svg
        viewBox="0 0 15 15"
        className="h-3 w-3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  )
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
