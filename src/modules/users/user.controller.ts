import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';

import { PaginationParams } from 'helpers/pagination-params';
import { Public, GetCurrentUserId, GetCurrentUser } from 'common/decorators';
import { Many } from 'helpers/find-many';
import { omit } from 'lodash';
import { ApiTagsAndBearer } from 'common/decorators/api-tags-bearer.decorator';

import { Actions } from 'providers/casl/casl-ability.factory';
import { PoliciesGuard, CheckAbilities } from 'providers/casl/casl.guard';

@ApiTagsAndBearer('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckAbilities({ action: Actions.ReadMany, subject: 'User' })
  public async findAll(
    @Query() params: PaginationParams,
  ): Promise<Many<Omit<User, 'hash'>>> {
    return this.usersService.findUsers(params).then((many) => {
      many.data = many.data.map((user) =>
        omit(user, ['hash', 'hashRt']),
      ) as any;
      return many;
    });
  }

  @Get('/:userId')
  public async findOne(
    @Param('userId') userId: number,
  ): Promise<Omit<User, 'hash'>> {
    return this.usersService
      .findUser({ id: userId })
      .then((user) => omit(user, ['hash', 'hashRt']));
  }
}
