import { Controller, Get, Param } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag as TagModel } from '@prisma/client';

@Controller()
export class TagController {
    constructor(
        private readonly tagService: TagService,
    ) {}

    @Get('tags/get/all')
    async getTags(): Promise<TagModel[]> {
        return await this.tagService.tags({})
    }

    @Get('tags/get/by-slug/:slug')
    async getTagBySlug(@Param('slug') slug: string): Promise<TagModel> {
        return this.tagService.tag({ slug: slug });
    }
}