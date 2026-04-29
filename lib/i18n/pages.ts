import type { Locale } from './config'

type HeroCopy = {
  eyebrow: string
  title: string
  lede: string
  metadataTitle: string
  metadataDescription: string
}

type ListItem = {
  head: string
  text: string
}

type FeatureCard = {
  path: string
  title: string
  text: string
}

type PlanCopy = {
  tier: string
  price: string
  note: string
  items: string[]
  cta: string
  featured?: boolean
}

export type LegalPageCopy = HeroCopy & {
  updated: string
  sections: Array<{ title: string; body: string[] }>
}

type PublicPageCopy = {
  common: {
    recommended: string
    readDocs: string
    openAdmin: string
    testContact: string
    status: string
    passing: string
    needsWork: string
    ok: string
    check: string
    backToBlog: string
  }
  blog: HeroCopy & {
    empty: string
  }
  features: HeroCopy & {
    cards: FeatureCard[]
    defaultEyebrow: string
    defaultTitle: string
    defaultItems: ListItem[]
    optionalEyebrow: string
    optionalTitle: string
    optionalItems: ListItem[]
    links: string[]
  }
  about: HeroCopy & {
    whyTitle: string
    why: string[]
    borrowTitle: string
    borrowed: ListItem[]
    links: string[]
  }
  pricing: HeroCopy & {
    plans: PlanCopy[]
  }
  docs: HeroCopy & {
    steps: ListItem[]
    docs: FeatureCard[]
    links: string[]
  }
  contact: {
    proofTitle: string
    proof: ListItem[]
  }
  privacy: LegalPageCopy
  cookies: LegalPageCopy
  terms: LegalPageCopy
  statusPage: HeroCopy
}

const en: PublicPageCopy = {
  common: {
    recommended: 'Recommended',
    readDocs: 'Read resources',
    openAdmin: 'Open admin',
    testContact: 'Test contact',
    status: 'Status',
    passing: 'Available',
    needsWork: 'Attention',
    ok: 'ok',
    check: 'check',
    backToBlog: 'Back to blog',
  },
  blog: {
    eyebrow: 'Writing',
    title: 'Blog',
    lede: 'News, guides, and updates in one place.',
    metadataTitle: 'Blog',
    metadataDescription: 'News, notes, and updates.',
    empty: 'No posts yet.',
  },
  features: {
    eyebrow: 'Features',
    title: 'A complete website structure for visitors who need information quickly.',
    lede:
      'Clear pages, multilingual access, contact, consent, policy information, useful resources, and a distinctive visual system.',
    metadataTitle: 'Features',
    metadataDescription: 'The core website features available to visitors.',
    cards: [
      { path: 'Pages', title: 'Complete website shell', text: 'Home, features, pricing, about, resources, blog, contact, policy pages, and status.' },
      { path: 'Language', title: 'Multilingual access', text: 'Language-prefixed pages, switching controls, alternate links, and right-to-left readiness.' },
      { path: 'Contact', title: 'Working inquiry flow', text: 'A validated form that gives visitors a clear way to send messages.' },
      { path: 'Admin', title: 'Operations workspace', text: 'A private area for reviewing messages, settings, redirects, search entries, files, and site activity.' },
      { path: 'Search', title: 'Metadata discipline', text: 'Sitemap, robots, social images, structured data helpers, and clean canonical URLs.' },
      { path: 'Legal', title: 'Consent and policies', text: 'A small cookie notice plus privacy, cookie, and terms pages linked from navigation and the sitemap.' },
    ],
    defaultEyebrow: 'Default',
    defaultTitle: 'Core pieces that belong in a dependable public website.',
    defaultItems: [
      { head: 'Multilingual structure.', text: 'Language support is clearest when it is part of the site from the beginning.' },
      { head: 'Contact and trust.', text: 'A real contact flow, policy pages, and consent handling should not be afterthoughts.' },
      { head: 'Operational basics.', text: 'Admin access, site settings, redirects, and lightweight reporting give the website room to grow.' },
    ],
    optionalEyebrow: 'Optional',
    optionalTitle: 'Additional capabilities stay deliberate.',
    optionalItems: [
      { head: 'Payments.', text: 'Useful when checkout, subscriptions, invoices, or paid access are part of the service.' },
      { head: 'Heavy storage or queues.', text: 'Best added when usage patterns make them necessary.' },
      { head: 'Special workflows.', text: 'Editorial tools, automations, and advanced features should match real operating needs.' },
    ],
    links: ['Read resources', 'Review model', 'Test contact'],
  },
  about: {
    eyebrow: 'About',
    title: 'A website designed around clarity, trust, and momentum.',
    lede:
      'The site is intentionally plain-spoken: polished public pages, clear paths through the content, and dependable ways to make contact.',
    metadataTitle: 'About',
    metadataDescription: 'A clear overview of the website and its purpose.',
    whyTitle: 'Why this exists.',
    why: [
      'Visitors should be able to understand what is offered, where to read more, and how to reach the right person.',
      'The public experience should feel complete without becoming heavy or difficult to navigate.',
      'The website keeps technical details out of the way so the content can stay focused on the reader.',
    ],
    borrowTitle: 'What it prioritizes.',
    borrowed: [
      { head: 'Speed.', text: 'Small dependency surface, direct pages, and no unnecessary runtime ceremony.' },
      { head: 'Trust.', text: 'Contact, consent, policy pages, metadata, and accessibility-friendly structure.' },
      { head: 'Focus.', text: 'A clear structure that can support services, products, resources, updates, or internal workflows.' },
    ],
    links: ['Explore features', 'Check status', 'Read resources'],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Simple options, clearly presented.',
    lede:
      'A straightforward place to explain packages, services, subscriptions, or a custom offer.',
    metadataTitle: 'Pricing',
    metadataDescription: 'Available options and services.',
    plans: [
      {
        tier: 'Starter',
        price: '$0',
        note: 'start',
        items: ['Public pages', 'Contact form', 'Legal pages', 'Language switching'],
        cta: 'View features',
      },
      {
        tier: 'Project',
        price: 'Custom',
        note: 'build',
        items: ['Brand and content', 'Admin workflows', 'Reporting views', 'Launch verification'],
        cta: 'Start contact',
        featured: true,
      },
      {
        tier: 'Add-ons',
        price: 'As needed',
        note: 'scope',
        items: ['Payments', 'Scheduling', 'Content workflows', 'Automations'],
        cta: 'Read resources',
      },
    ],
  },
  docs: {
    eyebrow: 'Resources',
    title: 'Everything important should be easy to find.',
    lede:
      'A place for practical guides, support notes, project resources, and useful follow-up information.',
    metadataTitle: 'Resources',
    metadataDescription: 'Useful resources and project information.',
    steps: [
      { head: 'Getting started.', text: 'A clear first action helps visitors understand what happens next.' },
      { head: 'Support.', text: 'Set expectations for response times, contact channels, and follow-up.' },
      { head: 'Policies.', text: 'Keep privacy, cookie, and terms pages linked clearly.' },
      { head: 'Updates.', text: 'Use the blog or changelog area for ongoing notes.' },
    ],
    docs: [
      { path: 'Guide', title: 'Visitor guide', text: 'A place for practical instructions and frequently requested details.' },
      { path: 'Support', title: 'Support notes', text: 'How people can get help, send requests, or follow up.' },
      { path: 'Policies', title: 'Policy links', text: 'Privacy, cookie, and terms pages are already routed and linked.' },
    ],
    links: ['Open status', 'Open admin', 'Test contact'],
  },
  contact: {
    proofTitle: 'What this form should do',
    proof: [
      { head: 'Be clear.', text: 'Visitors know what to send and what to expect after submitting.' },
      { head: 'Be dependable.', text: 'The submission flow is ready to connect to the project’s operational workflow.' },
      { head: 'Be reusable.', text: 'The same form works for enquiries, support, applications, or general messages.' },
    ],
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Privacy policy',
    lede: 'This policy explains what information this website may collect, why it is used, and how people can contact the site owner.',
    metadataTitle: 'Privacy Policy',
    metadataDescription: 'Privacy policy for website visitors.',
    updated: 'Last updated: 29 April 2026',
    sections: [
      { title: 'Information we collect', body: ['We may collect information a visitor chooses to provide, such as name, email address, phone number, and message content submitted through a form.', 'We may also collect basic usage information, such as pages visited, approximate time of visit, browser type, device type, and referring page.'] },
      { title: 'How we use information', body: ['We use submitted information to respond to requests, provide support, maintain records, improve the website, and protect the site from misuse.', 'We do not sell personal information.'] },
      { title: 'Cookies and measurement', body: ['Essential cookies may be used to remember settings such as language, theme, login state, and consent choices.', 'Optional measurement is only used when allowed and is intended to understand site performance and improve content.'] },
      { title: 'Sharing and retention', body: ['Information may be handled by service providers that help operate the website, process messages, host data, or deliver email.', 'Keep personal information only as long as needed for the purpose it was collected, unless a longer period is required by law or legitimate business needs.'] },
      { title: 'Your choices', body: ['Visitors may request access, correction, or deletion of personal information where applicable.', 'Use the contact page or the published contact email for privacy requests.'] },
    ],
  },
  cookies: {
    eyebrow: 'Cookies',
    title: 'Cookie policy',
    lede: 'This policy explains how this website uses cookies and similar browser storage.',
    metadataTitle: 'Cookie Policy',
    metadataDescription: 'Cookie policy for website visitors.',
    updated: 'Last updated: 29 April 2026',
    sections: [
      { title: 'What cookies are', body: ['Cookies and browser storage are small pieces of data saved on a device to remember preferences, maintain sessions, or measure how a website is used.'] },
      { title: 'Essential cookies', body: ['Essential storage may be used for language, theme, authentication, security, form protection, and consent preferences. These are required for the website to work properly.'] },
      { title: 'Optional measurement', body: ['With permission, the website may collect basic usage signals to understand which pages are useful and where the experience can improve.', 'Optional measurement should not be used to build advertising profiles.'] },
      { title: 'Managing choices', body: ['Use the cookie notice or cookie settings link to accept or decline optional measurement.', 'Browser settings can also block or delete cookies, though some website features may stop working.'] },
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Terms of service',
    lede: 'These terms set basic rules for using this website.',
    metadataTitle: 'Terms of Service',
    metadataDescription: 'Terms of service for website visitors.',
    updated: 'Last updated: 29 April 2026',
    sections: [
      { title: 'Use of the website', body: ['Visitors may use this website for lawful purposes only and must not attempt to disrupt, abuse, scrape aggressively, or compromise the service.'] },
      { title: 'Information on the site', body: ['Website content is provided for general information unless a project-specific agreement says otherwise.', 'Content may change without notice.'] },
      { title: 'Messages and accounts', body: ['If a visitor submits a form or uses an account area, the information provided should be accurate and not infringe the rights of others.'] },
      { title: 'Intellectual property', body: ['Unless stated otherwise, text, design, branding, and other website materials belong to the site owner or their licensors.'] },
      { title: 'Liability', body: ['To the fullest extent permitted by law, the site owner is not responsible for indirect loss, downtime, or reliance on incomplete information.', 'Nothing in these terms limits rights that cannot be limited under applicable law.'] },
      { title: 'Contact', body: ['Questions about these terms should be sent through the contact page or published contact email.'] },
    ],
  },
  statusPage: {
    eyebrow: 'Status',
    title: 'Website status.',
    lede: 'A simple public view of whether the main website surfaces are available.',
    metadataTitle: 'Status',
    metadataDescription: 'Website status overview.',
  },
}

const fr: PublicPageCopy = {
  ...en,
  common: { ...en.common, readDocs: 'Lire les ressources', openAdmin: 'Ouvrir admin', testContact: 'Tester le contact', passing: 'Disponible', needsWork: 'Attention', backToBlog: 'Retour au blog' },
  blog: { ...en.blog, eyebrow: 'Écriture', title: 'Blog', lede: 'Utilisez cet espace pour annonces, notes, guides ou mises à jour.', metadataDescription: 'Actualités, notes et mises à jour.', empty: 'Aucun article pour le moment.' },
  features: { ...en.features, eyebrow: 'Fonctions', title: 'Une structure complète pour trouver vite les bonnes informations.', lede: 'Pages claires, accès multilingue, contact, consentement, politiques, ressources utiles et identité visuelle.', metadataTitle: 'Fonctions', metadataDescription: 'Les fonctions principales disponibles aux visiteurs.', defaultEyebrow: 'Base', defaultTitle: 'Les éléments essentiels d’un site public fiable.', optionalEyebrow: 'Optionnel', optionalTitle: 'Les capacités supplémentaires restent intentionnelles.', links: ['Lire les ressources', 'Voir les options', 'Tester le contact'] },
  about: { ...en.about, eyebrow: 'À propos', title: 'Un site pensé pour la clarté, la confiance et l’élan.', lede: 'Des pages publiques soignées, des chemins clairs dans le contenu et des moyens fiables de prendre contact.', metadataTitle: 'À propos', metadataDescription: 'Une présentation claire du site et de son objectif.', whyTitle: 'Pourquoi il existe.', borrowTitle: 'Ce qu’il priorise.', links: ['Explorer les fonctions', 'Vérifier le statut', 'Lire les ressources'] },
  pricing: { ...en.pricing, eyebrow: 'Tarifs', title: 'Des options simples et clairement présentées.', lede: 'Un endroit direct pour expliquer offres, services, abonnements ou propositions personnalisées.', metadataTitle: 'Tarifs', metadataDescription: 'Options et services disponibles.' },
  docs: { ...en.docs, eyebrow: 'Ressources', title: 'Les informations importantes doivent être faciles à trouver.', lede: 'Utilisez cette page pour guides, support, notes projet ou informations utiles.', metadataTitle: 'Ressources', metadataDescription: 'Ressources et informations utiles.', links: ['Ouvrir le statut', 'Ouvrir admin', 'Tester le contact'] },
  contact: { proofTitle: 'Ce que ce formulaire doit faire', proof: [{ head: 'Être clair.', text: 'Les visiteurs savent quoi envoyer et quoi attendre.' }, { head: 'Être fiable.', text: 'Le flux est prêt à rejoindre le workflow du projet.' }, { head: 'Être réutilisable.', text: 'Le même formulaire fonctionne pour demandes, support ou messages.' }] },
  privacy: { ...en.privacy, eyebrow: 'Confidentialité', title: 'Politique de confidentialité', lede: 'Cette politique explique quelles informations ce site peut collecter, pourquoi elles sont utilisées et comment contacter le propriétaire.', metadataTitle: 'Politique de confidentialité', metadataDescription: 'Politique de confidentialité pour les visiteurs.', updated: 'Dernière mise à jour : 29 avril 2026' },
  cookies: { ...en.cookies, eyebrow: 'Cookies', title: 'Politique cookies', lede: 'Cette politique explique comment ce site utilise les cookies et le stockage du navigateur.', metadataTitle: 'Politique cookies', metadataDescription: 'Politique cookies pour les visiteurs.', updated: 'Dernière mise à jour : 29 avril 2026' },
  terms: { ...en.terms, eyebrow: 'Conditions', title: 'Conditions d’utilisation', lede: 'Ces conditions définissent les règles de base d’utilisation du site.', metadataTitle: 'Conditions d’utilisation', metadataDescription: 'Conditions d’utilisation pour les visiteurs.', updated: 'Dernière mise à jour : 29 avril 2026' },
  statusPage: { ...en.statusPage, eyebrow: 'Statut', title: 'Statut du site.', lede: 'Une vue publique simple de la disponibilité des surfaces principales.', metadataTitle: 'Statut', metadataDescription: 'Aperçu du statut du site.' },
}

const es: PublicPageCopy = {
  ...en,
  common: { ...en.common, readDocs: 'Leer recursos', openAdmin: 'Abrir admin', testContact: 'Probar contacto', status: 'Estado', passing: 'Disponible', needsWork: 'Atención', backToBlog: 'Volver al blog' },
  blog: { ...en.blog, eyebrow: 'Escritura', title: 'Blog', lede: 'Usa esta zona para anuncios, notas, guías o novedades.', metadataDescription: 'Noticias, notas y novedades.', empty: 'Todavía no hay posts.' },
  features: { ...en.features, eyebrow: 'Funciones', title: 'Una estructura completa para encontrar información rápidamente.', lede: 'Páginas claras, acceso multilingüe, contacto, consentimiento, políticas, recursos útiles e identidad visual.', metadataTitle: 'Funciones', metadataDescription: 'Funciones principales disponibles para visitantes.', defaultEyebrow: 'Base', defaultTitle: 'Elementos esenciales de un sitio público fiable.', optionalEyebrow: 'Opcional', optionalTitle: 'Las capacidades adicionales siguen siendo deliberadas.', links: ['Leer recursos', 'Ver opciones', 'Probar contacto'] },
  about: { ...en.about, eyebrow: 'Acerca', title: 'Un sitio diseñado para claridad, confianza y avance.', lede: 'Páginas públicas pulidas, rutas claras por el contenido y formas fiables de contacto.', metadataTitle: 'Acerca', metadataDescription: 'Una explicación clara del sitio y su propósito.', whyTitle: 'Por qué existe.', borrowTitle: 'Qué prioriza.', links: ['Explorar funciones', 'Ver estado', 'Leer recursos'] },
  pricing: { ...en.pricing, eyebrow: 'Precios', title: 'Opciones simples, presentadas con claridad.', lede: 'Un lugar directo para explicar paquetes, servicios, suscripciones u ofertas personalizadas.', metadataTitle: 'Precios', metadataDescription: 'Opciones y servicios disponibles.' },
  docs: { ...en.docs, eyebrow: 'Recursos', title: 'La información importante debe ser fácil de encontrar.', lede: 'Usa esta página para guías, soporte, notas del proyecto o material útil.', metadataTitle: 'Recursos', metadataDescription: 'Recursos e información útil.', links: ['Abrir estado', 'Abrir admin', 'Probar contacto'] },
  contact: { proofTitle: 'Qué debe hacer este formulario', proof: [{ head: 'Ser claro.', text: 'Las personas saben qué enviar y qué esperar.' }, { head: 'Ser fiable.', text: 'El flujo está listo para el trabajo operativo del proyecto.' }, { head: 'Ser reutilizable.', text: 'Sirve para consultas, soporte, solicitudes o mensajes.' }] },
  privacy: { ...en.privacy, eyebrow: 'Privacidad', title: 'Política de privacidad', lede: 'Esta política explica qué información puede recoger este sitio, por qué se usa y cómo contactar al propietario.', metadataTitle: 'Política de privacidad', metadataDescription: 'Política de privacidad para visitantes.', updated: 'Última actualización: 29 de abril de 2026' },
  cookies: { ...en.cookies, eyebrow: 'Cookies', title: 'Política de cookies', lede: 'Esta política explica cómo este sitio usa cookies y almacenamiento del navegador.', metadataTitle: 'Política de cookies', metadataDescription: 'Política de cookies para visitantes.', updated: 'Última actualización: 29 de abril de 2026' },
  terms: { ...en.terms, eyebrow: 'Términos', title: 'Términos de servicio', lede: 'Estos términos establecen reglas básicas de uso del sitio.', metadataTitle: 'Términos de servicio', metadataDescription: 'Términos de servicio para visitantes.', updated: 'Última actualización: 29 de abril de 2026' },
  statusPage: { ...en.statusPage, eyebrow: 'Estado', title: 'Estado del sitio.', lede: 'Una vista pública simple de la disponibilidad de las áreas principales.', metadataTitle: 'Estado', metadataDescription: 'Resumen del estado del sitio.' },
}

const de: PublicPageCopy = {
  ...en,
  common: { ...en.common, readDocs: 'Ressourcen lesen', openAdmin: 'Admin öffnen', testContact: 'Kontakt testen', passing: 'Verfügbar', needsWork: 'Hinweis', backToBlog: 'Zurück zum Blog' },
  blog: { ...en.blog, eyebrow: 'Beiträge', title: 'Blog', lede: 'Nutze diesen Bereich für Ankündigungen, Notizen, Guides oder Updates.', metadataDescription: 'News, Notizen und Updates.', empty: 'Noch keine Beiträge.' },
  features: { ...en.features, eyebrow: 'Funktionen', title: 'Eine vollständige Struktur für schnell auffindbare Informationen.', lede: 'Klare Seiten, mehrsprachiger Zugang, Kontakt, Consent, Richtlinien, nützliche Ressourcen und visuelle Identität.', metadataTitle: 'Funktionen', metadataDescription: 'Die wichtigsten Website-Funktionen für Besucher.', defaultEyebrow: 'Basis', defaultTitle: 'Wesentliche Teile einer verlässlichen öffentlichen Website.', optionalEyebrow: 'Optional', optionalTitle: 'Zusätzliche Fähigkeiten bleiben bewusst.', links: ['Ressourcen lesen', 'Optionen ansehen', 'Kontakt testen'] },
  about: { ...en.about, eyebrow: 'Über', title: 'Eine Website für Klarheit, Vertrauen und Tempo.', lede: 'Polierte öffentliche Seiten, klare Wege durch die Inhalte und verlässliche Kontaktmöglichkeiten.', metadataTitle: 'Über', metadataDescription: 'Eine klare Beschreibung der Website und ihres Zwecks.', whyTitle: 'Warum es existiert.', borrowTitle: 'Was es priorisiert.', links: ['Funktionen ansehen', 'Status prüfen', 'Ressourcen lesen'] },
  pricing: { ...en.pricing, eyebrow: 'Preise', title: 'Einfache Optionen, klar dargestellt.', lede: 'Ein direkter Ort für Pakete, Services, Abos oder individuelle Angebote.', metadataTitle: 'Preise', metadataDescription: 'Verfügbare Optionen und Services.' },
  docs: { ...en.docs, eyebrow: 'Ressourcen', title: 'Wichtige Informationen sollten leicht zu finden sein.', lede: 'Nutze diese Seite für Guides, Support, Projektnotizen oder nützliche Materialien.', metadataTitle: 'Ressourcen', metadataDescription: 'Nützliche Ressourcen und Projektinformationen.', links: ['Status öffnen', 'Admin öffnen', 'Kontakt testen'] },
  contact: { proofTitle: 'Was dieses Formular leisten sollte', proof: [{ head: 'Klar sein.', text: 'Besucher wissen, was sie senden und was als Nächstes passiert.' }, { head: 'Zuverlässig sein.', text: 'Der Ablauf ist bereit für den operativen Workflow.' }, { head: 'Wiederverwendbar sein.', text: 'Es funktioniert für Anfragen, Support, Bewerbungen oder Nachrichten.' }] },
  privacy: { ...en.privacy, eyebrow: 'Datenschutz', title: 'Datenschutzerklärung', lede: 'Diese Richtlinie erklärt, welche Informationen diese Website erheben kann, warum sie genutzt werden und wie der Betreiber kontaktiert werden kann.', metadataTitle: 'Datenschutzerklärung', metadataDescription: 'Datenschutzerklärung für Besucher.', updated: 'Zuletzt aktualisiert: 29. April 2026' },
  cookies: { ...en.cookies, eyebrow: 'Cookies', title: 'Cookie-Richtlinie', lede: 'Diese Richtlinie erklärt, wie diese Website Cookies und Browser-Speicher verwendet.', metadataTitle: 'Cookie-Richtlinie', metadataDescription: 'Cookie-Richtlinie für Besucher.', updated: 'Zuletzt aktualisiert: 29. April 2026' },
  terms: { ...en.terms, eyebrow: 'Bedingungen', title: 'Nutzungsbedingungen', lede: 'Diese Bedingungen setzen grundlegende Regeln für die Nutzung der Website.', metadataTitle: 'Nutzungsbedingungen', metadataDescription: 'Nutzungsbedingungen für Besucher.', updated: 'Zuletzt aktualisiert: 29. April 2026' },
  statusPage: { ...en.statusPage, eyebrow: 'Status', title: 'Website-Status.', lede: 'Eine einfache öffentliche Ansicht der wichtigsten Website-Bereiche.', metadataTitle: 'Status', metadataDescription: 'Überblick zum Website-Status.' },
}

const ar: PublicPageCopy = {
  ...en,
  common: { ...en.common, readDocs: 'قراءة الموارد', openAdmin: 'فتح الإدارة', testContact: 'اختبار التواصل', status: 'الحالة', passing: 'متاح', needsWork: 'تنبيه', ok: 'جيد', check: 'تحقق', backToBlog: 'العودة للمدونة' },
  blog: { ...en.blog, eyebrow: 'كتابة', title: 'المدونة', lede: 'استخدم هذه المساحة للإعلانات أو الملاحظات أو الأدلة أو التحديثات.', metadataDescription: 'أخبار وملاحظات وتحديثات.', empty: 'لا توجد مقالات بعد.' },
  features: { ...en.features, eyebrow: 'الميزات', title: 'بنية كاملة للعثور على المعلومات بسرعة.', lede: 'صفحات واضحة، وصول متعدد اللغات، تواصل، موافقة، سياسات، موارد مفيدة وهوية بصرية.', metadataTitle: 'الميزات', metadataDescription: 'الميزات الأساسية المتاحة للزوار.', defaultEyebrow: 'أساس', defaultTitle: 'أجزاء أساسية لموقع عام موثوق.', optionalEyebrow: 'اختياري', optionalTitle: 'القدرات الإضافية تبقى مقصودة.', links: ['قراءة الموارد', 'عرض الخيارات', 'اختبار التواصل'] },
  about: { ...en.about, eyebrow: 'حول', title: 'موقع مصمم للوضوح والثقة والزخم.', lede: 'صفحات عامة مصقولة، مسارات واضحة داخل المحتوى، وطرق موثوقة للتواصل.', metadataTitle: 'حول', metadataDescription: 'نظرة واضحة على الموقع وهدفه.', whyTitle: 'لماذا يوجد.', borrowTitle: 'ما الذي يعطيه أولوية.', links: ['استكشاف الميزات', 'فحص الحالة', 'قراءة الموارد'] },
  pricing: { ...en.pricing, eyebrow: 'التسعير', title: 'خيارات بسيطة ومعروضة بوضوح.', lede: 'مكان مباشر لشرح الباقات أو الخدمات أو الاشتراكات أو العروض المخصصة.', metadataTitle: 'التسعير', metadataDescription: 'الخيارات والخدمات المتاحة.' },
  docs: { ...en.docs, eyebrow: 'الموارد', title: 'يجب أن تكون المعلومات المهمة سهلة الوصول.', lede: 'مكان للأدلة العملية وملاحظات الدعم والموارد المفيدة.', metadataTitle: 'الموارد', metadataDescription: 'موارد ومعلومات مفيدة.', links: ['فتح الحالة', 'فتح الإدارة', 'اختبار التواصل'] },
  contact: { proofTitle: 'ما الذي يجب أن يفعله هذا النموذج', proof: [{ head: 'أن يكون واضحاً.', text: 'يعرف الزائر ماذا يرسل وماذا يتوقع.' }, { head: 'أن يكون موثوقاً.', text: 'التدفق جاهز لعمل المشروع التشغيلي.' }, { head: 'أن يكون قابلاً لإعادة الاستخدام.', text: 'يناسب الاستفسارات والدعم والطلبات والرسائل.' }] },
  privacy: { ...en.privacy, eyebrow: 'الخصوصية', title: 'سياسة الخصوصية', lede: 'تشرح هذه السياسة المعلومات التي قد يجمعها الموقع، وسبب استخدامها، وكيفية التواصل مع مالك الموقع.', metadataTitle: 'سياسة الخصوصية', metadataDescription: 'سياسة خصوصية للزوار.', updated: 'آخر تحديث: 29 أبريل 2026' },
  cookies: { ...en.cookies, eyebrow: 'الكوكيز', title: 'سياسة الكوكيز', lede: 'تشرح هذه السياسة كيف يستخدم هذا الموقع الكوكيز وتخزين المتصفح.', metadataTitle: 'سياسة الكوكيز', metadataDescription: 'سياسة كوكيز للزوار.', updated: 'آخر تحديث: 29 أبريل 2026' },
  terms: { ...en.terms, eyebrow: 'الشروط', title: 'شروط الخدمة', lede: 'تضع هذه الشروط قواعد أساسية لاستخدام الموقع.', metadataTitle: 'شروط الخدمة', metadataDescription: 'شروط خدمة للزوار.', updated: 'آخر تحديث: 29 أبريل 2026' },
  statusPage: { ...en.statusPage, eyebrow: 'الحالة', title: 'حالة الموقع.', lede: 'عرض عام بسيط لتوفر الواجهات الرئيسية للموقع.', metadataTitle: 'الحالة', metadataDescription: 'نظرة عامة على حالة الموقع.' },
}

const copies: Record<Locale, PublicPageCopy> = { en, fr, es, de, ar }

export function getPageCopy(locale: Locale) {
  return copies[locale] ?? copies.en
}
