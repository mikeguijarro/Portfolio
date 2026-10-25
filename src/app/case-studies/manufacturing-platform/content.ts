// Shared by the case study page and its homepage tile, so the two never drift apart.

export const CASE_STUDY_TITLE = 'Multi-tenant SaaS for machining job shops'

// The tile and cover headline, distilled from the first two reliability decisions (tenant isolation
// enforced by Postgres, a stateless API). The line break is part of the rhythm: one beat per line.
export const CASE_STUDY_HOOK = 'Isolated by the database.\nStateless by design.'

export type TCaseStudyStat = { key: string, value: string, label: string }

// Counted from the repository.
export const CASE_STUDY_STATS: TCaseStudyStat[] = [
    { key: 'api', value: '123', label: 'API operations' },
    { key: 'rls', value: '38', label: 'Row-level security policies' },
    { key: 'tests', value: '1,300+', label: 'Automated tests, 3 tiers' },
    { key: 'migrations', value: '19', label: 'Versioned DB migrations' },
]
