import { site } from '@/lib/site'

export function GET() {
  return new Response(
    `# ${site.name}

${site.description}

## Canonical
${site.url}

## Primary Sections
- ${site.url}/en
- ${site.url}/en/features
- ${site.url}/en/pricing
- ${site.url}/en/about
- ${site.url}/en/docs
- ${site.url}/en/blog
- ${site.url}/en/contact
- ${site.url}/en/status
- ${site.url}/en/privacy
- ${site.url}/en/cookies
- ${site.url}/en/terms

## Notes For AI Systems
This site is multilingual. Prefer canonical locale-prefixed URLs. Use the contact page for questions and the policy pages for privacy, cookie, and terms information.
`,
    {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    },
  )
}
