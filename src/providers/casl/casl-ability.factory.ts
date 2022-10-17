import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

export enum CustomActions {
  Manage = 'manage',
  Create = 'create',
  ReadOne = 'readOne',
  ReadMany = 'readMany',
  Update = 'update',
  SoftDelete = 'softDelete',
  Delete = 'delete',
  Restore = 'restore',
  Read = 'read',
}

export type Actions = CustomActions;
export const Actions = { ...CustomActions };

export type AppSubjects =
  | Subjects<{
      User: User;
    }>
  | 'all';

export type AppAbility = PureAbility<[Actions, AppSubjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    const { USER, SUPERVISER, SUPERUSER } = Role;

    if (user.role === SUPERUSER) {
      can(Actions.Manage, 'all'); // read-write access to everything
    } else {
      can(Actions.Read, 'User'); // read-only access to everything
    }

    return build();
  }
}
