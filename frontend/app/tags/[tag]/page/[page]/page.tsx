import React from "react";
import Quotes from '@/components/quotes/Quotes'

async function getAllTags(): Promise<any[]> {
    const response = await fetch(
        "http://host.docker.internal:3002/tags/get/all",
        { cache: "no-store" }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

async function getTagBySlug(slug: string): Promise<any> {
    const response = await fetch(
        `http://host.docker.internal:3002/tags/get/by-slug/${ slug }`,
        { cache: "no-store" }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

async function getQuotesByTagSlug(slug: string): Promise<any[]> {
    const response = await fetch(
        `http://host.docker.internal:3002/quotes/get/by-tag-slug/${ slug }`,
        { cache: "no-store" }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

export default async function TagBlogPagination({ params }: { params: { tag: string, page: string } }): Promise<React.JSX.Element> {
    const tags = await getAllTags()
    const tag = await getTagBySlug(params.tag)
    const quotes = await getQuotesByTagSlug(params.tag);
    const pageNumber = +params.page || 1

    console.log('lolada')
    console.log(params.tag)
    console.log(tags)

  return (
      <div>
          <div className="pb-6 pt-6">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                  Quotes with tag <em>{tag.name}</em>
              </h1>
          </div>
          <Quotes quotes={ quotes } view="blog" tags={ tags } currentPage={ pageNumber } />
      </div>
  )
}