'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Input from '@/components/Input'

export default function SignupPage(): React.JSX.Element {
    const register = async (event: FormEvent<HTMLFormElement>) => {
        setError(null)
        setSuccess(null)
        setLoading(true)
        event.preventDefault()
        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
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
    }

    const router = useRouter()
    const [error, setError] = useState<{ message: string } | null>(null)
    const [success, setSuccess] = useState<{ message: string } | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div>
            <div className="pb-6 text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Register a new
                account
            </div>
            <form className="text-center" onSubmit={register}>
                <div className="flex flex-col">
                    <div className="flex-auto p-2.5">
                        <Input name="name" title="Name" type="text" placeholder="Your name" autoComplete="name"
                               required />
                    </div>
                    <div className="flex-auto p-2.5">
                        <Input name="email" title="Email address" type="email" placeholder="Your email address"
                               autoComplete="email" required />
                    </div>
                    <div className="flex-auto p-2.5">
                        <Input name="password" title="Password" type="password" placeholder="Your password"
                               autoComplete="new-password" required />
                    </div>
                </div>
                <div className="flex">
                    <div className="p-2.5 flex-auto rounded-md">
                        <Button loading={loading} text="Sign-up"></Button>
                    </div>
                </div>
            </form>
            <div className="flex text-center">
                <div
                    className={`flex-auto pt-2 text-sm ${error && 'text-red-500 dark:text-red-400'} ${success && 'text-green-700 dark:text-green-300'} sm:w-96`}>
                    {error && error.message}
                    {success && success.message}
                </div>
            </div>
        </div>
    )
}
