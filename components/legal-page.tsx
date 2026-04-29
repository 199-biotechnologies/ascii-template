import type { LegalPageCopy } from '@/lib/i18n/pages'

export function LegalPage({ copy }: { copy: LegalPageCopy }) {
  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">{copy.eyebrow}</div>
        <h1>{copy.title}</h1>
        <p className="lede">{copy.lede}</p>
        <p className="policy-updated">{copy.updated}</p>

        <div className="legal-copy">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
