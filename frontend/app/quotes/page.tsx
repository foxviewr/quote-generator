import Link from "next/link";
import React from "react";
import GenerateNewQuote from "./GenerateNewQuote";

async function getAllQuotes(): Promise<any[]> {
    const response = await fetch(
        "http://host.docker.internal:3002/get_all_quotes",
        { cache: "no-store" }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

export default async function QuotesPage(): Promise<React.JSX.Element> {
    return (
        <div>
            <h2>All your beautiful and wonderful quotes:</h2>
            <AllQuotes />
        </div>
    )
}

async function AllQuotes(): Promise<React.JSX.Element> {
    const quotes = await getAllQuotes();

    return (
        <div>
            <div>
                <GenerateNewQuote />
            </div>
            <div>
                {quotes.map((quote) => {
                    return <Quote key={quote.uuid} quote={quote}/>;
                })}
            </div>
        </div>
    )
}

function Quote({ quote }: any): React.JSX.Element {
    const { uuid, author, content, tags } = quote;
    return <Link href={`/quotes/${uuid}`}>
        <h3>{author}</h3>
        <h5>{content}</h5>
        <p>{author}</p>
    </Link>;
}