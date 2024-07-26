import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { PrismaModule } from '../prisma.module'
import { JwtService } from '@nestjs/jwt'
import { QuoteService } from '../quote/quote.service'

@Module({
    imports: [PrismaModule],
    controllers: [TagController],
    providers: [TagService, QuoteService, JwtService],
})
export class TagModule {}
