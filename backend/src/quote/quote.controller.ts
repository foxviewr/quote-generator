import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { QuoteService } from './quote.service'
import { Quote as QuoteModel } from '@prisma/client'
import { TagService } from '../tag/tag.service'
import axios from 'axios'
import slugify from 'slugify'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller()
export class QuoteController {
    constructor(
        private readonly quoteService: QuoteService,
        private readonly tagService: TagService
    ) {}

    @UseGuards(JwtGuard)
    @Get('quotes/get/all')
    async getQuotes(): Promise<QuoteModel[]> {
        return await this.quoteService.quotes({ orderBy: { createdAt: 'desc' } })
    }

    @UseGuards(JwtGuard)
    @Get('quotes/get/:uuid')
    async getQuoteByUuid(@Param('uuid') uuid: string): Promise<QuoteModel> {
        return this.quoteService.quote({ uuid: String(uuid) })
    }

    @UseGuards(JwtGuard)
    @Get('quotes/get/by-tag-slug/:slug')
    async getQuotesByTagSlug(@Param('slug') slug: string): Promise<QuoteModel[]> {
        return this.quoteService.quotes({
            where: {
                tags: {
                    some: {
                        tag: { slug: slug },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })
    }

    @UseGuards(JwtGuard)
    @Get('quotes/generate')
    async getNewQuote(): Promise<QuoteModel[]> {
        const response = await axios({
            url: 'https://api.quotable.io/quotes/random?limit=1',
            method: 'get',
        })

        if (!response.data) {
            throw new Error('Something went wrong while getting a new quote. Quote not created.')
        }

        const quotes = []
        for (const quoteData of response.data) {
            const tags = []
            const tagsNames = []

            for (const tagName of quoteData.tags) {
                const tagSlug = slugify(tagName, { lower: true })
                const tagExists = await this.tagService.tags({ where: { slug: tagSlug } })

                if (!tagExists.length) {
                    const tag = await this.tagService.createTag({
                        slug: tagSlug,
                        name: tagName,
                    })
                    tags.push({ tagUuid: tag.uuid })
                    tagsNames.push(tag.name)
                } else {
                    tags.push({ tagUuid: tagExists[0].uuid })
                    tagsNames.push(tagExists[0].name)
                }
            }

            const quote = await this.quoteService.createQuote({
                external_id: quoteData._id,
                author: quoteData.author,
                content: quoteData.content,
                authorSlug: quoteData.authorSlug,
                length: quoteData.length,
                tags: { create: tags },
            })

            quotes.push({ ...quote, tags: tagsNames })
        }

        return quotes
    }
}
