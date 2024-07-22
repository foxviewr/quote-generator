import Link from 'next/link'
import slugify from 'slugify'
interface Props {
  text: string
}

const Tag = ({ text }: Props): React.JSX.Element => {
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
