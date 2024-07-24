import Link from 'next/link'
import Tag from '@/components/Tag'
import React from 'react'
import { Tinos } from 'next/font/google'

const formatDate = (date: string, locale = 'en-US') => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return new Date(date).toLocaleDateString(locale, options)
}

const tinos = Tinos({ subsets: ['latin'], weight: '400' })

export default function QuotesList({ quotes, maxDisplay = 5 }: any): React.JSX.Element {
    return (
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    { !quotes.length && 'No quotes found.' }
                    { quotes.slice(0, maxDisplay).map((quote: any) => {
                        const { uuid, author, content, tags, createdAt, updatedAt } = quote
                        return (
                            <li key={ uuid } className="py-12">
                                <article>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                        <dl>
                                            <dt className="text-base">Generated on</dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={ createdAt }>{ formatDate(createdAt, 'en-US') }</time>
                                            </dd>
                                        </dl>
                                        <div className="space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div
                                                    className={`${ tinos.className } prose max-w-none text-2xl text-gray-500 dark:text-white`}>
                                                    <em>&ldquo; {content} &rdquo;</em>
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                        {author}
                                                    </h2>
                                                    <div className="flex flex-wrap">
                                                        {tags.map((tag: any) => (
                                                            <Tag key={tag.tag.slug} text={tag.tag.name} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {quotes.length > maxDisplay && (
                <div className="flex justify-end text-base font-medium leading-6">
                    <Link
                        href="/quotes"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="All posts"
                    >
                        All Quotes &rarr;
                    </Link>
                </div>
            )}
        </>
    )
}