import React from "react";
import Quotes from '@/components/quotes/Quotes'

async function getAllQuotes(): Promise<any[]> {
    const response = await fetch(
        "http://host.docker.internal:3002/quotes/get/all",
        { cache: "no-store" }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

async function getAllTags(): Promise<any[]> {
    const response = await fetch(
        "http://host.docker.internal:3002/tags/get/all",
        { cache: "no-store" }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

export default async function QuotesBlog(): Promise<React.JSX.Element> {
    const quotes = await getAllQuotes();
    const tags = await getAllTags();

    return (
        <div>
            <div className="pb-6 pt-6">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Quotes
                </h1>
            </div>
            <Quotes quotes={quotes} view="blog" tags={tags} currentPage={1} />
        </div>
    )
}