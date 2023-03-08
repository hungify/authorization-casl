import { AbilityBuilder, createMongoAbility, PureAbility } from '@casl/ability';
import { Actions, Roles, Subjects } from '~/interfaces/auth';
import { ACTIONS, ROLES, SUBJECTS } from './auth';

export type AppAbility = PureAbility<[Actions, Subjects]>;

export default function buildAbilityFor(role: Roles): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

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

  return build();
}

export function findReason(ability: AppAbility, action: Actions) {
  const rules = ability.rules.filter((rule) => rule.inverted);
  return rules.find((rule) => rule.action === action)?.reason;
}
