import { ForbiddenError } from '@casl/ability';
import { RequiredRule } from './casl.guard';
import { AppAbility } from './casl-ability.factory';

export function checkAbilities(
  ability: AppAbility,
  rules: RequiredRule[],
): boolean {
  rules.forEach((rule) => {
    if (rule.fields?.length > 0) {
      rule.fields.forEach((field) => {
        ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          rule.subject,
          field,
        );
      });
    } else {
      ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
    }
  });

  return true;
}
