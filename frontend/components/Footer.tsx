import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
    return (
        <footer>
            <div className="mt-16 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
                    <SocialIcon kind="mail" href={ `mailto:${ siteMetadata.email }` } size={ 6 }/>
                    <SocialIcon kind="github" href={ siteMetadata.github } size={ 6 }/>
                    <SocialIcon kind="linkedin" href={ siteMetadata.linkedin } size={ 6 }/>
                </div>
                <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div>{ `© ${ new Date().getFullYear() }` }</div>
                    <div>{ ` • ` }</div>
                    <Link href="/">{ siteMetadata.title }</Link>
                </div>
                <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                    <Link href={ siteMetadata.github } target="_blank" rel="noopener noreferrer">
                        Made with ❤️ by { siteMetadata.author }
                    </Link>
                </div>
            </div>
        </footer>
    )
}
