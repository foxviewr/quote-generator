'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'

export default function LoginPage(): React.JSX.Element {

    const action = (formData: FormData) => {
        setLoading(true)
        login(formData)
    }

    const login = async (formData: FormData) => {
        signIn('credentials', {
            callbackUrl: callbackUrl ?? '/',
            username: formData.get('username'),
            password: formData.get('password'),
        })
    }

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const error = searchParams.get('error')
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div>
            <div className="pb-6 text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Welcome!</div>
            <form
                className="text-center"
                key="credentials"
                action={action}
            >
                <div className="flex flex-col">
                    {error === 'CredentialsSignin' && (
                        <div className="flex-auto p-2.5">
                        <span
                            className="w-72 inline-block p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            Your email or password is incorrect
                        </span>
                        </div>
                    )}
                    <div className="flex-auto p-2.5">
                        <Input name="email" title="Email address" type="email" placeholder="Your email address"
                               autoComplete="email" required />
                    </div>
                    <div className="flex-auto p-2.5">
                        <Input name="password" title="Password" type="password" placeholder="Your password"
                               autoComplete="current-password" required />
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="p-2.5 flex-auto rounded-md shadow-sm">
                        <Button loading={loading} text="Login"></Button>
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