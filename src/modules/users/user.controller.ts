import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';

import { Public, GetCurrentUserId, GetCurrentUser } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/users.dto';
import { RenderUser } from './RenderUser';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @UseGuards(RtGuard)
  @Get('me')
  public async me(@Request() req) {
    return new RenderUser(req.user);
  }

  @Public()
  @UseGuards(RtGuard)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }
}
