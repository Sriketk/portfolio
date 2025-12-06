import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostMetadata {
  title: string
  date: string
  slug: string
  description?: string
  year?: string
  draft?: boolean
}

export async function getBlogPosts(): Promise<PostMetadata[]> {
  const blogDirectory = path.join(contentDirectory, 'blog')

  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const files = fs.readdirSync(blogDirectory)
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(blogDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description,
        draft: data.draft || false,
      }
    })
    .filter((post) => !post.draft) // Filter out draft posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Return null if post is a draft
  if (data.draft === true) {
    return null
  }

  return {
    metadata: {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description,
    },
    content,
  }
}

export async function getProjects(): Promise<PostMetadata[]> {
  const projectsDirectory = path.join(contentDirectory, 'projects')

  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const files = fs.readdirSync(projectsDirectory)
  const projects = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(projectsDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        year: data.year,
        description: data.description,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

export async function getProject(slug: string) {
  const filePath = path.join(contentDirectory, 'projects', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    metadata: {
      slug,
      title: data.title || '',
      date: data.date || '',
      year: data.year,
      description: data.description,
    },
    content,
  }
}
