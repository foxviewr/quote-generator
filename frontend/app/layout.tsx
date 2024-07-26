'use client'

import '@/css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk, Tinos } from 'next/font/google'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import { ThemeProviders } from '@/app/theme-providers'
import { SessionProvider } from 'next-auth/react'

const space_grotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space-grotesk',
})

const tinos = Tinos({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
    variable: '--font-space-tinos',
})

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <html
            lang="en"
            className={`${ space_grotesk.variable } ${ tinos.variable } scroll-smooth`}
            suppressHydrationWarning
        >
            <link
                rel="apple-touch-icon"
                sizes="76x76"
                href={`/static/favicons/apple-touch-icon.png`}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={`/static/favicons/favicon-32x32.png`}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={`/static/favicons/favicon-16x16.png`}
            />
            <link rel="manifest" href={`/static/favicons/site.webmanifest`} />
            <link
                rel="mask-icon"
                href={`/static/favicons/safari-pinned-tab.svg`}
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
            <link rel="alternate" type="application/rss+xml" href={'/feed.xml'} />
            <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
            <ThemeProviders>
                <SectionContainer>
                    <SessionProvider>
                        <div className="flex h-screen flex-col justify-between font-sans">
                            <Header />
                            <main className="mb-auto">{children}</main>
                            <Footer />
                        </div>
                    </SessionProvider>
                </SectionContainer>
            </ThemeProviders>
            </body>
        </html>
    )
}
