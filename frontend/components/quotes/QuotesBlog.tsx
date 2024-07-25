import Link from 'next/link'
import Tag from '@/components/Tags'
import Pagination from '@/components/quotes/Pagination'
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

export default function QuotesBlog({ quotes, tags, pagination, maxPerPage }: any): React.JSX.Element {
    const quotesToDisplay = quotes.length ? quotes.slice(
        maxPerPage * (pagination.currentPage - 1),
        maxPerPage * pagination.currentPage
    ) : []

    const pathname = '/quotes'
    const displayQuotes = quotesToDisplay.length > 0 ? quotesToDisplay : quotes

    return (
        <>
            <div className="flex sm:space-x-24">
                <div
                    className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
                    <div className="px-6 py-4">
                        {!tags.length && 'No tags found'}
                        {tags.length > 0 && (<>
                            <h3 className="font-bold uppercase text-primary-500">All Tags</h3>
                            <ul>
                                {tags.map((tag: any) => {
                                    const { uuid, slug, name, _count } = tag
                                    return (
                                        <li key={uuid} className="my-3">
                                            { pathname.split('/tags/')[1] === slug ? (
                                                <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                                                    {`${ name } (${ _count.quotes })`}
                                                </h3>
                                            ) : (
                                                <Link
                                                    href={`/tags/${ slug }`}
                                                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                                                    aria-label={`View posts tagged ${ name }`}
                                                >
                                                    {`${ name } (${ _count.quotes })`}
                                                </Link>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </>)}
                    </div>
                </div>
                <div>
                    {!displayQuotes.length && (
                        <div className="text-lg mt-5 text-gray-500 dark:text-gray-400">
                            No quotes found
                        </div>
                    )}
                    <ul>
                        {displayQuotes.map((quote: any) => {
                            const { uuid, author, content, tags, createdAt } = quote
                            return (
                                <li key={ uuid } className="py-5">
                                    <article className="flex flex-col space-y-2 xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">Generated on</dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={ createdAt }>{formatDate(createdAt, 'en-US')}</time>
                                            </dd>
                                        </dl>
                                        <div className="space-y-3 pt-2">
                                            <div
                                                className="font-serif max-w-none text-xl text-gray-500 dark:text-white">
                                                <em>&ldquo; {content} &rdquo;</em>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                    {author}
                                                </h2>
                                                <div className="flex flex-wrap">
                                                    {tags?.map((tag: any) => <Tag key={tag.tag.slug}
                                                                                  text={tag.tag.name} />)}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </li>
                            )
                        })}
                    </ul>
                    {pagination && pagination.totalPages > 1 && (
                        <Pagination currentPage={ pagination.currentPage } totalPages={ pagination.totalPages } />
                    )}
                </div>
            </div>
        </>
    )
}