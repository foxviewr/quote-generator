import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <html>
            <body>
                <nav>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/quotes">
                        Quotes
                    </Link>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}