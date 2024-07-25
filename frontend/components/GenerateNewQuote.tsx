'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function GenerateNewQuote(): React.JSX.Element {
    const router = useRouter()
    const { data: session } = useSession();
    const generate = async () => {
        await fetch(
            `${process.env.BACKEND_API_URL}/quotes/generate`,
            {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            },
        )
        router.refresh()
    }

    return (
        <button
            className={`bg-primary-500 w-100 h-10 rounded-md py-2 px-4 font-medium text-white sm:py-0 hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black`}
            type="submit"
            onClick={generate}
        >
            Generate new quote
        </button>
    )
}