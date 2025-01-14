import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get(':uuid')
    async getUserProfile(@Param('uuid') uuid: string) {
        return await this.userService.findByUuid(uuid)
    }
}
