import { Module } from '@nestjs/common'
import { QuoteController } from './quote.controller'
import { QuoteService } from './quote.service'
import { HttpConfigService } from '../common/services/http-config.service'
import { PrismaModule } from '../prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { TagModule } from '../tag/tag.module'

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY, // Ensure this is set in your environment
            signOptions: { expiresIn: '60s' }, // Adjust expiration as needed
        }),
        TagModule, // Importing TagModule to access TagService
    ],
    controllers: [QuoteController],
    providers: [QuoteService, HttpConfigService],
})
export class QuoteModule {}
