'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/components/Button'

export default function GenerateNewQuote(): React.JSX.Element {
    const router = useRouter()
    const { data: session } = useSession()
    const generate = async () => {
        setError(null)
        setLoading({ message: 'Generating new quote...' })

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

        const error = !res.ok
        if (error) {
            setLoading(null)
            setError({ message: 'Something went wrong. Please try again.' })
            return
        } else {

        }

        setSuccess({ message: 'New quote generated! 🎉 Refreshing page...' })

        await new Promise((r) => setTimeout(r, 1000))
        router.refresh()
        setLoading(null)
        setSuccess(null)
    }

    const [error, setError] = useState<{ message: string } | null>(null)
    const [success, setSuccess] = useState<{ message: string } | null>(null)
    const [loading, setLoading] = useState<{ message: string } | null>(null)

    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div>
                    <Button loading={!!loading} text="Generate new quote" onClick={() => generate()} />
                </div>
                <div
                    className={`py-2 px-0 text-sm ${loading && !success && 'text-gray-500 dark:text-white'} ${error && 'text-red-500 dark:text-red-400'} ${success && 'text-green-700 dark:text-green-300'} sm:py-2 sm:px-4`}>
                    {loading && !success && loading.message}
                    {error && error.message}
                    {success && success.message}
                </div>
            </div>
        </>
    )
}