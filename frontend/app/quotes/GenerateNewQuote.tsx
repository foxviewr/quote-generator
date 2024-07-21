'use client';

import { useRouter } from "next/navigation";
import React from "react";

export default function generateNewQuote(): React.JSX.Element {
    const router = useRouter();

    const generate = async () => {
        const response = await fetch(
            "http://localhost:3002/generate_new_quote",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: "no-store"
            }
        );
        router.refresh();
    };

    return <button onClick={generate}>Generate new quote</button>;
}