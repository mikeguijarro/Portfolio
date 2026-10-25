export const EMAIL = 'mikeguijarrodev@gmail.com'

export const CASE_STUDY_HREF = '/case-studies/manufacturing-platform'

export const GITHUB_HREF = 'https://github.com/MIKEGUIJARRO'

export const SOCIAL_LINKS = [
    { label: 'GitHub', href: GITHUB_HREF },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/miguel-alejandro-guijarro/' },
    { label: 'X', href: 'https://x.com/mikeguijarro' },
    { label: 'Instagram', href: 'https://www.instagram.com/st.mikeg' },
] as const

export type TSection = { id: string, label: string }

export const SECTIONS: TSection[] = [
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
]
