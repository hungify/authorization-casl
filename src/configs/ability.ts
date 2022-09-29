import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Actions, Roles, Subjects } from '~/interfaces/auth';
import { ACTIONS, ROLES, SUBJECTS } from './auth';

export type AppAbility = Ability<[Actions, Subjects]>;
export const appAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: Roles) {
  const { can, cannot, rules } = new AbilityBuilder(appAbility);

  // defined permissions
  switch (role) {
    case ROLES.Admin:
      can([ACTIONS.delete, ACTIONS.read], SUBJECTS.Todo);
      cannot(ACTIONS.create, SUBJECTS.Todo).because('Only editor can create Todos');
      break;
    case ROLES.Editor:
      can([ACTIONS.create, ACTIONS.read], SUBJECTS.Todo);
      cannot('delete', SUBJECTS.Todo).because('Only admins can delete Todos');
      break;
    case ROLES.Subscriber:
      can(ACTIONS.read, SUBJECTS.Todo);
      cannot(ACTIONS.delete, SUBJECTS.Todo).because('Only admins can delete Todos');
      cannot(ACTIONS.create, SUBJECTS.Todo).because('Only editor can create Todos');
      break;
    case ROLES.Guest:
      can(ACTIONS.read, SUBJECTS.Auth);
      break;
  }

  return rules;
}

export function buildAbilityFor(role: Roles): AppAbility {
  return new appAbility(defineRulesFor(role), {
    detectSubjectType: (object: any) => object!.type,
  });
}

export function findReason(ability: AppAbility, action: Actions) {
  const rules = ability.rules.filter((rule) => rule.inverted);
  return rules.find((rule: any) => rule.action === action)?.reason;
}
