import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { QuoteModule } from './quote/quote.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { TagModule } from './tag/tag.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        QuoteModule,
        TagModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
