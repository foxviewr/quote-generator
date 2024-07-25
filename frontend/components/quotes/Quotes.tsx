import React from 'react'
import QuotesBlog from '@/components/quotes/QuotesBlog'
import QuotesList from '@/components/quotes/QuotesList'
import { getAllTags } from '@/components/Tags'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const LIST_MAX_DISPLAY = 8
const BLOG_MAX_PER_PAGE = 8

export async function getAllQuotes(): Promise<any[]> {
    const session = await getServerSession(authOptions)
    const response = await fetch(
        `${process.env.BACKEND_API_URL}/quotes/get/all`,
        {
            headers: {
                authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        },
    )
    const data = await response.json()
    return (data ? data : []) as any[]
}

export async function getQuotesByTagSlug(slug: string): Promise<any[]> {
    const session = await getServerSession(authOptions)
    const response = await fetch(
        `${process.env.BACKEND_API_URL}/quotes/get/by-tag-slug/${slug}`,
        {
            headers: {
                authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        },
    )
    const data = await response.json()
    return (data ? data : []) as any[]
}

export async function Quotes({ view, quotes, currentPage }: any): Promise<React.JSX.Element> {
    quotes = quotes ? quotes : await getAllQuotes()
    const tags = await getAllTags()

    if (view === 'list') {
        return (
            <>
                <QuotesList quotes={quotes} maxDisplay={LIST_MAX_DISPLAY} />
            </>
        )
    }

    if (view === 'blog') {
        let totalPages = 1
        switch (view) {
            case 'list':
                totalPages = Math.ceil(quotes.length / LIST_MAX_DISPLAY)
                break
            case 'blog':
                totalPages = Math.ceil(quotes.length / BLOG_MAX_PER_PAGE)
                break
        }

        const pagination = {
            currentPage: currentPage,
            totalPages: totalPages,
        }

        return (
            <>
                <QuotesBlog quotes={quotes} tags={tags} pagination={pagination} maxPerPage={BLOG_MAX_PER_PAGE} />
            </>
        )
    }

    return (<></>)
}

export default Quotes