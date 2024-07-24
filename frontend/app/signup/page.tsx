'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
    const register = async (event: FormEvent<HTMLFormElement>) => {
        setError(null)
        setSuccess(null)
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
            return
        }

        setSuccess({ message: 'Account created! 🎉 Redirecting to the login page...' })

        await new Promise((r) => setTimeout(r, 3000))
        router.push('/api/auth/signin')
    }

    const router = useRouter()
    const [error, setError] = useState(null as { message: string } | null)
    const [success, setSuccess] = useState(null as { message: string } | null)
    const [loading, setLoading] = useState(null as { message: string } | null)

    return (
        <div>
            <div className="pb-6 text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Register a new
                account
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
                            className="bg-primary-500 w-72 rounded-md py-2 px-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
                            type="submit"
                        >
                            Sign-up
                        </button>
                    </div>
                </div>
            </form>
            {
                error && (
                    <div className="flex text-center">
                        <div className="flex-auto pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{error.message}</div>
                    </div>
                )
            }
            {
                success && (
                    <div className="flex text-center">
                        <div
                            className="flex-auto pt-2 text-sm text-green-400 dark:text-green-300 sm:w-96">{success.message}</div>
                    </div>
                )
            }
        </div>
    )
}

export default SignupPage
