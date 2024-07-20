import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import {Quote as QuoteModel} from '@prisma/client';
import axios from "axios";

@Controller()
export class QuoteController {
    constructor(private readonly quoteService: QuoteService) {}

    @Get('get_quote/:uuid')
    async getQuoteByUuid(@Param('uuid') uuid: string): Promise<QuoteModel> {
        return this.quoteService.quote({ uuid: String(uuid) });
    }

    @Get('get_all_quotes')
    async getQuotes(): Promise<QuoteModel[]> {
        return this.quoteService.quotes({});
    }

    @Get('generate_new_quote')
    async getNewQuote(): Promise<QuoteModel[]> {
        const response = await axios({
            url: 'https://api.quotable.io/quotes/random?limit=1',
            method: 'get',
        });

        if (!response.data) {
            throw new Error('Something went wrong while getting a new quote. Quote not created.');
        }

        let quotes = [];
        for (const quote of response.data) {
            quotes.push(
                await this.quoteService.createQuote({
                    external_id: quote._id,
                    author: quote.author,
                    content: quote.content,
                    tags: quote.tags,
                    authorSlug: quote.authorSlug,
                    length: quote.length,
                    createdAt: new Date(quote.dateAdded),
                    updatedAt: new Date(quote.dateModified)
                })
            );

        }

        return quotes;
    }

}