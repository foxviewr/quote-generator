import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Tag, Prisma } from '@prisma/client'

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}

    async tags(params: {
        skip?: number
        take?: number
        cursor?: Prisma.TagWhereUniqueInput
        where?: Prisma.TagWhereInput
        orderBy?: Prisma.TagOrderByWithRelationInput
        include?: Prisma.TagInclude
    }): Promise<Tag[]> {
        const { skip, take, cursor, where, orderBy, include } = params
        return this.prisma.tag.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        })
    }

    async createTag(data: Prisma.TagCreateInput): Promise<Tag> {
        return this.prisma.tag.create({
            data,
        })
    }
}
