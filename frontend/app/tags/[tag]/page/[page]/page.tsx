import { Quotes, getQuotesByTagSlug } from '@/components/quotes/Quotes'
import { getTagBySlug } from '@/components/Tags'
import React from 'react'

export default async function TagBlogPagination({ params }: {
    params: { tag: string, page: string }
}): Promise<React.JSX.Element> {
    const tag = await getTagBySlug(params.tag)
    const quotes = await getQuotesByTagSlug(params.tag)
    const pageNumber = +params.page || 1

    return (
        <div>
            <div className="pb-6 pt-6">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Quotes with tag <em>{tag.name}</em>
                </h1>
            </div>
            <Quotes view="blog" quotes={quotes} currentPage={pageNumber} />
        </div>
    )
}