import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from './dto/auth.dto'
import { UserService } from 'src/user/user.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

const EXPIRE_ACCESS_TOKEN = 60 * 60 * 24 // 1 day
const EXPIRE_REFRESH_TOKEN = 60 * 60 * 24 * 7 // 7 days

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto)
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        }

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: `${EXPIRE_ACCESS_TOKEN}s`,
                    secret: process.env.JWT_SECRET_KEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: `${EXPIRE_REFRESH_TOKEN}s`,
                    secret: process.env.JWT_REFRESH_TOKEN_KEY,
                }),
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_ACCESS_TOKEN * 1000),
            },
        }
    }

    async validateUser(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.username)

        if (user && (await compare(dto.password, user.password))) {
            const { ...result } = user
            return result
        }
        throw new UnauthorizedException()
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub,
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: `${EXPIRE_ACCESS_TOKEN}s`,
                secret: process.env.JWT_SECRET_KEY,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: `${EXPIRE_REFRESH_TOKEN}s`,
                secret: process.env.JWT_REFRESH_TOKEN_KEY,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_ACCESS_TOKEN * 1000),
        }
    }
}
