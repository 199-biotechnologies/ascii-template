import type { Locale } from './config'

export type Dictionary = {
  nav: {
    home: string
    features: string
    showcase: string
    system: string
    blog: string
    pricing: string
    about: string
    docs: string
    status: string
    privacy: string
    cookies: string
    terms: string
    language: string
    contact: string
    admin: string
  }
  home: {
    eyebrow: string
    title: string
    lede: string
    primaryCta: string
    sourceCta: string
  }
  admin: {
    title: string
    lede: string
    loginTitle: string
    loginCta: string
  }
  contact: {
    title: string
    lede: string
    submit: string
    sending: string
    stored: string
    failed: string
    fields: {
      name: string
      email: string
      phone: string
      message: string
      company: string
    }
  }
  privacyNotice: {
    text: string
    decline: string
    privacy: string
    cookies: string
    allow: string
    settings: string
  }
  footer: {
    sections: string
    system: string
    legal: string
    connect: string
    made: string
    cookieSettings: string
  }
}

const en: Dictionary = {
  nav: {
    home: 'Home',
    features: 'Features',
    showcase: 'Showcase',
    system: 'System',
    blog: 'Blog',
    pricing: 'Pricing',
    about: 'About',
    docs: 'Resources',
    status: 'Status',
    privacy: 'Privacy',
    cookies: 'Cookies',
    terms: 'Terms',
    language: 'Language',
    contact: 'Contact',
    admin: 'Admin',
  },
  home: {
    eyebrow: 'Multilingual website · v0.2',
    title: 'A polished website for clear services, resources, and contact.',
    lede:
      'Find the main information quickly, read useful updates, choose your language, and send a message when you need follow-up.',
    primaryCta: 'Explore the site',
    sourceCta: 'View source',
  },
  admin: {
    title: 'Admin',
    lede: 'Operational control for contacts, support, analytics, SEO, files, settings, and health.',
    loginTitle: 'Admin login',
    loginCta: 'Send magic link',
  },
  contact: {
    title: 'Contact',
    lede: 'Send questions, enquiries, or support requests.',
    submit: 'Send message',
    sending: 'Sending...',
    stored: 'Thanks. Your message has been received.',
    failed: 'The message could not be sent. Please try again.',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      company: 'Company',
    },
  },
  privacyNotice: {
    text: 'We use essential cookies and optional measurement to improve this website.',
    decline: 'Decline',
    privacy: 'Privacy',
    cookies: 'Cookie policy',
    allow: 'Allow',
    settings: 'Cookie settings',
  },
  footer: {
    sections: 'Sections',
    system: 'Resources',
    legal: 'Legal',
    connect: 'Connect',
    made: 'Clear pages, useful resources, and easy contact.',
    cookieSettings: 'Cookie settings',
  },
}

const fr: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Accueil',
    features: 'Fonctions',
    showcase: 'Aperçu',
    system: 'Système',
    pricing: 'Tarifs',
    about: 'À propos',
    docs: 'Ressources',
    status: 'Statut',
    privacy: 'Confidentialité',
    cookies: 'Cookies',
    terms: 'Conditions',
    language: 'Langue',
  },
  home: {
    eyebrow: 'Site multilingue · v0.2',
    title: 'Un site soigné pour services, ressources et contact.',
    lede:
      'Trouvez rapidement les informations principales, lisez les mises à jour utiles, choisissez votre langue et envoyez un message si besoin.',
    primaryCta: 'Explorer le site',
    sourceCta: 'Voir la source',
  },
  admin: {
    title: 'Admin',
    lede: 'Contrôle opérationnel pour contacts, support, analytics, SEO, fichiers, réglages et santé.',
    loginTitle: 'Connexion admin',
    loginCta: 'Envoyer le lien magique',
  },
  contact: {
    title: 'Contact',
    lede: 'Utilisez ce formulaire pour une question, une demande projet ou du support.',
    submit: 'Envoyer le message',
    sending: 'Envoi...',
    stored: 'Merci. Votre message a bien été reçu.',
    failed: 'Le message n’a pas pu être envoyé. Réessayez.',
    fields: {
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
      company: 'Entreprise',
    },
  },
  privacyNotice: {
    text: 'Nous utilisons des cookies essentiels et une mesure optionnelle pour améliorer ce site.',
    decline: 'Refuser',
    privacy: 'Confidentialité',
    cookies: 'Politique cookies',
    allow: 'Autoriser',
    settings: 'Réglages cookies',
  },
  footer: {
    sections: 'Sections',
    system: 'Ressources',
    legal: 'Légal',
    connect: 'Contact',
    made: 'Pages claires, ressources utiles et contact simple.',
    cookieSettings: 'Réglages cookies',
  },
}

const es: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Inicio',
    features: 'Funciones',
    showcase: 'Vista',
    system: 'Sistema',
    pricing: 'Precios',
    about: 'Acerca',
    docs: 'Recursos',
    status: 'Estado',
    privacy: 'Privacidad',
    cookies: 'Cookies',
    terms: 'Términos',
    language: 'Idioma',
    contact: 'Contacto',
  },
  home: {
    eyebrow: 'Sitio web multilingüe · v0.2',
    title: 'Un sitio pulido para servicios, recursos y contacto.',
    lede:
      'Encuentra la información principal, lee novedades útiles, cambia de idioma y envía un mensaje cuando necesites seguimiento.',
    primaryCta: 'Explorar el sitio',
    sourceCta: 'Ver fuente',
  },
  admin: {
    title: 'Admin',
    lede: 'Control operativo para contactos, soporte, analítica, SEO, archivos, ajustes y salud.',
    loginTitle: 'Acceso admin',
    loginCta: 'Enviar enlace mágico',
  },
  contact: {
    title: 'Contacto',
    lede: 'Usa este formulario para preguntas, proyectos o soporte.',
    submit: 'Enviar mensaje',
    sending: 'Enviando...',
    stored: 'Gracias. Hemos recibido tu mensaje.',
    failed: 'El mensaje no se pudo enviar. Inténtalo de nuevo.',
    fields: {
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      message: 'Mensaje',
      company: 'Empresa',
    },
  },
  privacyNotice: {
    text: 'Usamos cookies esenciales y medición opcional para mejorar este sitio.',
    decline: 'Rechazar',
    privacy: 'Privacidad',
    cookies: 'Política de cookies',
    allow: 'Permitir',
    settings: 'Ajustes de cookies',
  },
  footer: {
    sections: 'Secciones',
    system: 'Recursos',
    legal: 'Legal',
    connect: 'Conectar',
    made: 'Páginas claras, recursos útiles y contacto fácil.',
    cookieSettings: 'Ajustes de cookies',
  },
}

const de: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Start',
    features: 'Funktionen',
    showcase: 'Überblick',
    system: 'System',
    pricing: 'Preise',
    about: 'Über',
    docs: 'Ressourcen',
    status: 'Status',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    terms: 'Bedingungen',
    language: 'Sprache',
    contact: 'Kontakt',
  },
  home: {
    eyebrow: 'Mehrsprachiger Website-Starter · v0.2',
    title: 'Eine polierte Basis für schnelle, mehrsprachige Websites.',
    lede:
      'Eine klare Website-Grundlage mit Seiten, Kontakt, Admin-Abläufen, Consent, Richtlinien, Metadaten und einprägsamer ASCII-Identität.',
    primaryCta: 'Template ansehen',
    sourceCta: 'Quellcode ansehen',
  },
  admin: {
    title: 'Admin',
    lede: 'Operative Kontrolle für Kontakte, Support, Analytics, SEO, Dateien, Einstellungen und Health.',
    loginTitle: 'Admin-Login',
    loginCta: 'Magic Link senden',
  },
  contact: {
    title: 'Kontakt',
    lede: 'Nutze dieses Formular für Fragen, Projektanfragen oder Support.',
    submit: 'Nachricht senden',
    sending: 'Senden...',
    stored: 'Danke. Deine Nachricht wurde empfangen.',
    failed: 'Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Telefon',
      message: 'Nachricht',
      company: 'Firma',
    },
  },
  privacyNotice: {
    text: 'Wir verwenden notwendige Cookies und optionale Messung, um diese Website zu verbessern.',
    decline: 'Ablehnen',
    privacy: 'Datenschutz',
    cookies: 'Cookie-Richtlinie',
    allow: 'Erlauben',
    settings: 'Cookie-Einstellungen',
  },
  footer: {
    sections: 'Bereiche',
    system: 'Ressourcen',
    legal: 'Rechtliches',
    connect: 'Kontakt',
    made: 'MIT-lizenziert · Für Builder gemacht.',
    cookieSettings: 'Cookie-Einstellungen',
  },
}

const ar: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'الرئيسية',
    features: 'الميزات',
    showcase: 'عرض',
    system: 'النظام',
    blog: 'المدونة',
    pricing: 'التسعير',
    about: 'حول',
    docs: 'الموارد',
    status: 'الحالة',
    privacy: 'الخصوصية',
    cookies: 'الكوكيز',
    terms: 'الشروط',
    language: 'اللغة',
    contact: 'تواصل',
    admin: 'الإدارة',
  },
  home: {
    eyebrow: 'قالب موقع متعدد اللغات · v0.2',
    title: 'نقطة بداية مصقولة لمواقع سريعة ومتعددة اللغات.',
    lede:
      'أساس أنيق للمواقع مع صفحات وتواصل وإدارة وموافقة وسياسات وبيانات وصفية وهوية ASCII مميزة.',
    primaryCta: 'استكشاف القالب',
    sourceCta: 'عرض المصدر',
  },
  admin: {
    title: 'الإدارة',
    lede: 'تحكم تشغيلي في جهات الاتصال والدعم والتحليلات وSEO والملفات والإعدادات والصحة.',
    loginTitle: 'تسجيل دخول الإدارة',
    loginCta: 'إرسال رابط الدخول',
  },
  contact: {
    title: 'تواصل',
    lede: 'استخدم هذا النموذج للأسئلة أو طلبات المشاريع أو الدعم.',
    submit: 'إرسال الرسالة',
    sending: 'جار الإرسال...',
    stored: 'شكراً. تم استلام رسالتك.',
    failed: 'تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    fields: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      message: 'الرسالة',
      company: 'الشركة',
    },
  },
  privacyNotice: {
    text: 'نستخدم كوكيز أساسية وقياساً اختيارياً لتحسين هذا الموقع.',
    decline: 'رفض',
    privacy: 'الخصوصية',
    cookies: 'سياسة الكوكيز',
    allow: 'السماح',
    settings: 'إعدادات الكوكيز',
  },
  footer: {
    sections: 'الأقسام',
    system: 'الموارد',
    legal: 'قانوني',
    connect: 'تواصل',
    made: 'برخصة MIT · مصنوع للبناة.',
    cookieSettings: 'إعدادات الكوكيز',
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, fr, es, de, ar }

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en
}
