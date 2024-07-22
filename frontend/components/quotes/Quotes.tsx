import React from 'react'
import QuotesBlog from '@/components/quotes/QuotesBlog'
import QuotesList from '@/components/quotes/QuotesList'

const LIST_MAX_DISPLAY = 8
const BLOG_MAX_PER_PAGE = 8

export default function Quotes({ quotes, view, tags, currentPage }: any): React.JSX.Element {

    if (!quotes) {
        return (<></>)
    }

    if (view === 'list') {
        return (
            <>
                <QuotesList quotes={ quotes } maxDisplay={ LIST_MAX_DISPLAY } />
            </>
        )
    }

    if (view === 'blog') {
        let totalPages = 1;
        switch (view) {
            case 'list':
                totalPages = Math.ceil(quotes.length / LIST_MAX_DISPLAY)
                break;
            case 'blog':
                totalPages = Math.ceil(quotes.length / BLOG_MAX_PER_PAGE)
                break;
        }

        const pagination = {
            currentPage: currentPage,
            totalPages: totalPages,
        }

        return (
            <>
                <QuotesBlog quotes={ quotes } tags={ tags } pagination={ pagination } maxPerPage={ BLOG_MAX_PER_PAGE }  />
            </>
        )
    }

    return (<></>)
}
