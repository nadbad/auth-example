import { Injectable } from '@nestjs/common';
import { User, Role } from '@prisma/client';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { AbilityBuilder, PureAbility } from '@casl/ability';

export enum CustomActions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Actions = CustomActions;
export const Actions = { ...CustomActions };

export type AppSubjects = Subjects<{
  User: User;
}>;

export type AppAbility = PureAbility<[Actions, AppSubjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    if (user.role === Role.SUPERVISER) {
    }
  }
}
