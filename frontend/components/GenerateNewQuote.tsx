'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function GenerateNewQuote(): React.JSX.Element {
    const router = useRouter()
    const { data: session } = useSession();
    const generate = async () => {
        setError(null)
        setLoading({ message : 'Generating new quote...' })

        const res = await fetch(
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

        setLoading(null)

        const error = !res.ok
        if (error) {
            setError({ message: 'Something went wrong. Please try again.' })
            await new Promise((r) => setTimeout(r, 3000))
            return
        } else {

        }

        setSuccess({ message: 'New quote generated! 🎉 Refreshing page...' })

        await new Promise((r) => setTimeout(r, 1000))
        router.refresh()
        setSuccess(null)
    }

    const [error, setError] = useState(null as { message: string } | null)
    const [success, setSuccess] = useState(null as { message: string } | null)
    const [loading, setLoading] = useState(null as { message: string } | null)

    return (
        <>
            <div className="flex">
                <div className="flex">
                    <button
                        className="flex-auto bg-primary-500 w-52 h-10 items-center rounded-md py-2 px-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
                        type="submit"
                        disabled={success !== null || loading !== null}
                        onClick={generate}
                    >
                        {!loading && !success && 'Generate new quote'}
                        {(loading || success) && (
                            <div className="flex space-x-2 justify-center items-center">
                                <span className="sr-only">Loading...</span>
                                <div
                                    className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div
                                    className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                            </div>
                        )}
                    </button>
                </div>
                <div
                    className={`flex py-2 px-4 text-sm ${loading && 'text-white'} ${error && 'text-red-500 dark:text-red-400'} ${success && 'text-green-400 dark:text-green-300'} sm:w-96`}>
                    {loading && loading.message}
                    {error && error.message}
                    {success && success.message}
                </div>
            </div>
        </>
    )
}