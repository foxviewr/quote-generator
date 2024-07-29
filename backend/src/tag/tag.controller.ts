import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag as TagModel } from '@prisma/client'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @UseGuards(JwtGuard)
    @Get('tags/get/all')
    async getTags(@Req() request: Request): Promise<TagModel[]> {
        return await this.tagService.tags({
            where: {
                quotes: {
                    some: {
                        quote: {
                            user: {
                                is: { email: request['user'].username },
                            },
                        },
                    },
                },
            },
            include: {
                _count: {
                    select: {
                        quotes: {
                            where: {
                                quote: {
                                    user: {
                                        is: {
                                            email: request['user'].username,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
    }
}
