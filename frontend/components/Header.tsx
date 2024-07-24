'use client'

import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import UserHeaderButton from '@/components/UserHeaderButton'
import { useSession } from 'next-auth/react'
import React from 'react'

export function Header(): React.JSX.Element {
    const session = useSession()

    return (
        <header className={`flex items-center justify-${session.data?.user ? 'between' : 'center'} py-10`}>
            <div>
                <Link href="/" aria-label="QuoteGenerator">
                    <div className="flex items-center justify-between">
                        <div className="mr-3">
                            <Image
                                src="/static/logo.svg"
                                alt="Quote Generator Logo"
                                width={50}
                                height={40}
                                priority
                            />
                        </div>
                        <div className="hidden h-6 text-2xl font-semibold sm:inline-block">
                            QuoteGenerator
                        </div>
                    </div>
                </Link>
            </div>
            { session.data?.user && (
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                    {headerNavLinks
                        .filter((link) => link.href !== '/')
                        .map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400
                  sm:block"
                            >
                                {link.title}
                            </Link>
                        ))}
                    <UserHeaderButton />
                    <ThemeSwitch />
                    <MobileNav />
                </div>
            )}
        </header>
    )
}

export default Header
