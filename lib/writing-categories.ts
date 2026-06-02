export const WRITING_CATEGORIES = ['All', 'Technology', 'Media', 'Sports', 'Life'] as const
export type WritingCategory = (typeof WRITING_CATEGORIES)[number]

export interface PostMetadata {
  title: string
  date: string
  slug: string
  description?: string
  year?: string
  draft?: boolean
  category?: string
}
