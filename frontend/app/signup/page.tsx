'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
    const register = async (event: FormEvent<HTMLFormElement>) => {
        setError(null)
        setSuccess(null)
        setLoading(true)
        event.preventDefault()
        const res = await fetch('http://localhost:3002/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: event.currentTarget['name-input'].value,
                email: event.currentTarget['email-input'].value,
                password: event.currentTarget['password-input'].value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const error = !res.ok
        const data = await res.json()

        if (error) {
            setError({ message: data.error + ': ' + data.message })
            setLoading(false)
            return
        }

        setSuccess({ message: 'Account created! 🎉 Redirecting to the login page...' })

        await new Promise((r) => setTimeout(r, 3000))
        router.push('/api/auth/signin')
        setLoading(false)
    }

    const router = useRouter()
    const [error, setError] = useState(null as { message: string } | null)
    const [success, setSuccess] = useState(null as { message: string } | null)
    const [loading, setLoading] = useState(false as boolean)

    return (
        <div>
            <div className="pb-6 text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Register a new account
            </div>
            <form className="text-center" onSubmit={register}>
                <div className="flex flex-col">
                    <div className="flex-auto p-2.5">
                        <label htmlFor="name-input">
                            <span className="sr-only">Name</span>
                            <input
                                autoComplete="name"
                                className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                                id="name-input"
                                name="name"
                                placeholder="Your name"
                                type="text"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex-auto p-2.5">
                        <label htmlFor="email-input">
                            <span className="sr-only">Email address</span>
                            <input
                                autoComplete="email"
                                className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                                id="email-input"
                                name="email"
                                placeholder="Your email address"
                                type="email"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex-auto p-2.5">
                        <label htmlFor="password-input">
                            <span className="sr-only">Password</span>
                            <input
                                autoComplete="new-password"
                                className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                                id="password-input"
                                name="password"
                                placeholder="Your password"
                                type="password"
                                required
                            />
                        </label>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="p-2.5 flex-auto rounded-md shadow-sm">
                        <button
                            className="bg-primary-500 w-72 h-10 rounded-md py-2 px-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
                            type="submit"
                            disabled={success !== null || loading}
                        >
                            {!loading && !success && 'Sign-up'}
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
                </div>
            </form>
            <div className="flex text-center">
                <div className={`flex-auto pt-2 text-sm ${error && 'text-red-500 dark:text-red-400'} ${success && 'text-green-400 dark:text-green-300'} sm:w-96`}>
                    {error && error.message}
                    {success && success.message}
                </div>
            </div>
        </div>
    )
}

export default SignupPage
