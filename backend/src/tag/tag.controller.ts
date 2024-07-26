import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag as TagModel } from '@prisma/client'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @UseGuards(JwtGuard)
    @Get('tags/get/all')
    async getTags(): Promise<TagModel[]> {
        return await this.tagService.tags({})
    }

    @UseGuards(JwtGuard)
    @Get('tags/get/by-slug/:slug')
    async getTagBySlug(@Param('slug') slug: string): Promise<TagModel> {
        return this.tagService.tag({ slug: slug })
    }
}
