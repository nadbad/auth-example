import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'providers/prisma/prisma.service';

import { PaginationParams } from 'helpers/pagination-params';
import { findManyAndCount, Many } from 'helpers/find-many';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where });
  }

  async findUsers(params: PaginationParams): Promise<Many<User>> {
    return findManyAndCount<User, 'User'>(this.prisma, 'User', params);
  }
}
