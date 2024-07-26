import { Module } from '@nestjs/common'
import { QuoteController } from './quote.controller'
import { QuoteService } from './quote.service'
import { PrismaModule } from '../prisma.module'
import { JwtService } from '@nestjs/jwt'
import { TagService } from '../tag/tag.service'

@Module({
    imports: [PrismaModule],
    controllers: [QuoteController],
    providers: [QuoteService, TagService, JwtService],
})
export class QuoteModule {}
