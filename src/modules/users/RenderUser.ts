import { Exclude, Type } from 'class-transformer';
import { User } from '@prisma/client';
export class RenderUser {
  @Exclude()
  password: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
