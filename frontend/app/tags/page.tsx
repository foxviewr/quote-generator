import Link from '@/components/Link'
import Tag from '@/components/Tag'

async function getAllTags(): Promise<any[]> {
  const response = await fetch(
      "http://host.docker.internal:3002/tags/get/all",
      { cache: "no-store" }
  );
  const data = await response.json();
  return (data ? data : []) as any[];
}

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          { tags.length === 0 && 'No tags found.'}
          { tags.map((tag: any) => {
            const { name, slug, _count } = tag
            return (
              <div key={ name } className="mb-2 mr-5 mt-2">
                <Tag text={ name } />
                <Link
                  href={`/tags/${ slug }`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${ name }`}
                >
                  {` (${ _count.quotes })`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
