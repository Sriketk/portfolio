import Link from "next/link"

const projects = [
  {
    slug: "project-one",
    title: "Project Alpha",
    description: "A minimal task management app built with React and TypeScript, focusing on simplicity and speed.",
    year: "2024",
  },
  {
    slug: "project-two",
    title: "Design System",
    description: "A comprehensive design system for building consistent and accessible web applications.",
    year: "2023",
  },
  {
    slug: "project-three",
    title: "Portfolio Template",
    description: "A minimal portfolio template for designers and developers, built with Next.js and Tailwind CSS.",
    year: "2023",
  },
]

export default function Projects() {
  return (
    <>
      <div className="space-y-12">
        {projects.map((project) => (
          <article key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h2>
                <span className="text-lg text-muted-foreground">{project.year}</span>
              </div>
              <p className="leading-relaxed text-muted-foreground">{project.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}
