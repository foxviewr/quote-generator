'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

interface PaginationProps {
    totalPages: number
    currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps): React.JSX.Element {
    const currentPathname = usePathname()
    let basePath = '';
    const paths = currentPathname.split('/')
    for (let i = 0; i < paths.length; i ++) {
        if (paths[i].length) {
            if (paths[i] === 'page') {
                break;
            }
            basePath = `${ basePath }/${ paths[i] }`
        }
    }

    const prevPage = currentPage - 1 > 0
    const nextPage = currentPage + 1 <= totalPages

    return (
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <nav className="flex justify-between">
                { !prevPage && (
                    <button className="cursor-auto disabled:opacity-50" disabled={ !prevPage }>
                        Previous
                    </button>
                )}
                { prevPage && (
                    <Link
                        href={ currentPage - 1 === 1 ? `${ basePath }/` : `${ basePath }/page/${ currentPage - 1 }`}
                        rel="prev"
                    >
                        Previous
                    </Link>
                )}
                <span>
          {currentPage} of {totalPages}
        </span>
                { !nextPage && (
                    <button className="cursor-auto disabled:opacity-50" disabled={ !nextPage }>
                        Next
                    </button>
                )}
                { nextPage && (
                    <Link href={`${ basePath }/page/${ currentPage + 1 }`} rel="next">
                        Next
                    </Link>
                )}
            </nav>
        </div>
    )
}