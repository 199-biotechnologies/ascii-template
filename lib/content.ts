import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt?: string
  author?: string
  tags?: string[]
}

export type Post = PostMeta & {
  html: string
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(md|mdx)$/, ''))
}

// YAML parses unquoted ISO dates as Date objects. Coerce to string so the
// value is React-renderable and easy to compare.
function asDateString(v: unknown): string {
  if (!v) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  return String(v)
}

export function listPosts(): PostMeta[] {
  return readDir(CONTENT_DIR)
    .map((slug) => {
      const file = path.join(CONTENT_DIR, `${slug}.md`)
      const raw = fs.readFileSync(file, 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: asDateString(data.date),
        excerpt: data.excerpt as string | undefined,
        author: data.author as string | undefined,
        tags: data.tags as string[] | undefined,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const html = marked.parse(content, { async: false }) as string
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: asDateString(data.date),
    excerpt: data.excerpt as string | undefined,
    author: data.author as string | undefined,
    tags: data.tags as string[] | undefined,
    html,
  }
}
