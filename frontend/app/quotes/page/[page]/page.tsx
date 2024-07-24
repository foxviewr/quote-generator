import React from 'react'
import Quotes from '@/components/quotes/Quotes'

export default async function QuotesBlogPagination({ params }: {
    params: { page: string }
}): Promise<React.JSX.Element> {
    const pageNumber = +params.page || 1

    return (
        <div>
            <div className="pb-6 pt-6">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Quotes
                </h1>
            </div>
            <Quotes view="blog" currentPage={pageNumber} />
        </div>
    )
}