import { site } from '@/lib/site'

export function GET() {
  return new Response(
    `Site: ${site.name}
Contact: ${site.email}
Languages: English, French, Spanish, German, Arabic
Policies: ${site.url}/en/privacy, ${site.url}/en/cookies, ${site.url}/en/terms
Repository: ${site.social.github}
`,
    {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    },
  )
}
