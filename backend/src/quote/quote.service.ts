import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Quote, Prisma } from '@prisma/client';

@Injectable()
export class QuoteService {
    constructor(private prisma: PrismaService) {}

    async quote(
        postWhereUniqueInput: Prisma.QuoteWhereUniqueInput,
    ): Promise<Quote | null> {
        return this.prisma.quote.findUnique({
            where: postWhereUniqueInput,
        });
    }

    async quotes(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.QuoteWhereUniqueInput;
        where?: Prisma.QuoteWhereInput;
        orderBy?: Prisma.QuoteOrderByWithRelationInput;
    }): Promise<Quote[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.quote.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                tags: {
                    select: {
                        tag: {
                            select: {
                                uuid: true,
                                name: true,
                                slug: true
                            }
                        }
                    }
                }
            }
        });
    }

    async createQuote(data: Prisma.QuoteCreateInput): Promise<Quote> {
        return this.prisma.quote.create({
            data,
        });
    }

    async updateQuote(params: {
        where: Prisma.QuoteWhereUniqueInput;
        data: Prisma.QuoteUpdateInput;
    }): Promise<Quote> {
        const { data, where } = params;
        return this.prisma.quote.update({
            data,
            where,
        });
    }

    async deleteQuote(where: Prisma.QuoteWhereUniqueInput): Promise<Quote> {
        return this.prisma.quote.delete({
            where,
        });
    }
}