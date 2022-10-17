import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { UsersModule } from 'modules/users/user.module';
import { AuthModule } from 'modules/auth/auth.module';
import { PrismaModule } from 'providers/prisma/prisma.module';
import { AtGuard } from 'common/guards/at.guard';
import { CaslModule } from 'providers/casl/casl.module';
import { ForbiddenErrorFilter } from 'filters/forbidden-error.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CaslModule,
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenErrorFilter,
    },
  ],
})
export class AppModule {}
