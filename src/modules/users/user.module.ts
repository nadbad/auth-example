import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaService } from 'providers/prisma/prisma.service';
import { CaslModule } from 'providers/casl/casl.module';

@Module({
  imports: [CaslModule],
  exports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
