import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(`${process.env.BACKEND_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
    })

    const response = await res.json()

    return {
        ...token,
        backendTokens: response,
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'QuotesGeneratorCredentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'username' },
                password: { label: 'Password', type: 'password', placeholder: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null
                const { username, password } = credentials
                const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (res.status == 401) {
                    return null
                }
                return await res.json()
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user }

            if (new Date().getTime() < token.backendTokens.expiresIn)
                return token

            return await refreshToken(token)
        },

        async session({ token, session }) {
            session.user = token.user
            session.backendTokens = token.backendTokens

            return session
        },
    },

    pages: {
        signIn: '/login',
        newUser: '/signup',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
