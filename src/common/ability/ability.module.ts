import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [AbilityFactory],
  providers: [AbilityFactory],
})
export class AbilityModule {}
