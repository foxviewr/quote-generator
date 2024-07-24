import Link from 'next/link'
import slugify from 'slugify'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Props {
    text: string
}

export async function getAllTags(): Promise<any[]> {
    const session = await getServerSession(authOptions)
    const response = await fetch(
        `${process.env.BACKEND_URL}/tags/get/all`,
        {
            headers: {
                authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        },
    )
    const data = await response.json()
    return (data ? data : []) as any[]
}

export async function getTagBySlug(slug: string): Promise<any> {
    const session = await getServerSession(authOptions)
    const response = await fetch(
        `${process.env.BACKEND_URL}/tags/get/by-slug/${slug}`,
        {
            headers: {
                authorization: `Bearer ${session?.backendTokens?.accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        },
    )
    const data = await response.json()
    return (data ? data : []) as any[]
}

export function Tag({ text }: Props): React.JSX.Element {
    return (
        <Link
            href={`/tags/${slugify(text, { lower: true })}`}
            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
            {text.split(' ').join('-')}
        </Link>
    )
}

export default Tag
