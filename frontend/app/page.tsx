import React from "react";
import Quotes from '@/components/quotes/Quotes'
import GenerateNewQuote from '@/components/GenerateNewQuote'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAllQuotes(): Promise<any[]> {
    const response = await fetch(
        "http://host.docker.internal:3002/quotes/get/all",
        {
            cache: "no-store"
        }
    );
    const data = await response.json();
    return (data ? data : []) as any[];
}

export default async function MainPage(): Promise<React.JSX.Element> {
    const quotes = await getAllQuotes();
    const session = await getServerSession(authOptions);

    return (
        <div>
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Welcome { session?.user?.name }!
                </h1>
                <GenerateNewQuote />
                {quotes.length ? (
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        Your latest generated quotes:
                    </p>
                ) : (<></>)}
            </div>
            <Quotes quotes={quotes} view="list" />
        </div>
    )
}