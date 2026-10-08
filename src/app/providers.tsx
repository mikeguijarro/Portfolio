'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import dynamic from 'next/dynamic'

// ssr: false is only allowed inside Client Components
const PostHogPageView = dynamic(() => import('@/app/post-hog-page-view'), { ssr: false })

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        capture_pageview: false,
        capture_pageleave: true
    })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider client={posthog}>
            <PostHogPageView />
            {children}
        </PostHogProvider>
    )
}