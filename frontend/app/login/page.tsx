"use client";
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function LoginPage(): React.JSX.Element {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const error = searchParams.get('error')

    return (
        <div>
            <div className="pb-6 text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Welcome!</div>
            <form
                className="text-center"
                key="credentials"
                action={(formData) => {
                    "use client";
                    signIn('credentials', {
                        callbackUrl: callbackUrl ?? '/',
                        username: formData.get('username'),
                        password: formData.get('password')
                    });
                }}
            >
                <div className="flex flex-col">
                    { error === 'CredentialsSignin' && (
                        <div className="flex-auto p-2.5">
                        <span
                            className="w-72 inline-block p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Your email or password is incorrect
                        </span>
                        </div>
                    )}
                    <div className="flex-auto p-2.5">
                        <label htmlFor="name-input">
                            <span className="sr-only">Email address</span>
                            <input
                                autoComplete="email"
                                className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                                id="username-input"
                                name="username"
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
                            Login
                        </button>
                    </div>
                </div>
                <div className="flex text-center">
                    <div className="flex-auto pt-2 sm:w-96">
                        Register a new account <a href="/signup"
                                                  className="text-primary-600 hover:underline dark:text-primary-500">here</a>.
                    </div>
                </div>
            </form>
        </div>
    )
}