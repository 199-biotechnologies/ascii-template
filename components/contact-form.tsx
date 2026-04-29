'use client'

import { useState, type FormEvent } from 'react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'

type ContactFormProps = {
  locale: Locale
  dictionary: Dictionary
  compact?: boolean
  source?: string
}

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm({ locale, dictionary, compact = false, source = 'contact-page' }: ContactFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState<string>('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    setMessage('')

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      message: String(data.get('message') || ''),
      company: String(data.get('company') || ''),
      locale,
      source,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(dictionary.contact.failed)

      form.reset()
      setState('sent')
      setMessage(dictionary.contact.stored)
    } catch (error) {
      setState('error')
      setMessage(dictionary.contact.failed)
    }
  }

  return (
    <form className={compact ? 'form-stack compact' : 'form-stack'} onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          <span>{dictionary.contact.fields.name}</span>
          <input name="name" required minLength={2} maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>{dictionary.contact.fields.email}</span>
          <input name="email" type="email" required maxLength={180} autoComplete="email" />
        </label>
      </div>
      {compact ? null : (
        <label>
          <span>{dictionary.contact.fields.phone}</span>
          <input name="phone" maxLength={80} autoComplete="tel" />
        </label>
      )}
      <label>
        <span>{dictionary.contact.fields.message}</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={compact ? 4 : 7} />
      </label>
      <label className="hp-field" aria-hidden="true">
        <span>{dictionary.contact.fields.company}</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="btn btn-primary btn-arrow" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? dictionary.contact.sending : dictionary.contact.submit}
      </button>
      {message ? (
        <p className={state === 'error' ? 'form-status error' : 'form-status'} role="status">
          {message}
        </p>
      ) : null}
    </form>
  )
}
