import React from "react";

async function getQuoteByUuid(uuid: string): Promise<any> {
    const response = await fetch(
        `http://host.docker.internal:3002/get_quote/${uuid}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await response.json();

    if (data.length === 0) {
        return null;
    }

    return data;
}

export default async function QuotePage({ params }: any): Promise<React.JSX.Element> {
    const quote = await getQuoteByUuid(params.uuid);
    return <div>
        <h3>{quote.author}</h3>
        <h5>{quote.content}</h5>
        <p>{quote.author}</p>
    </div>;
}