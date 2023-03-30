import { AbilityBuilder, createMongoAbility, PureAbility } from '@casl/ability';
import { AppAction, AppRole, AppSubject } from '~/interfaces/auth';
import { Actions, Roles, Subjects } from './auth';

export type AppAbility = PureAbility<[Actions, Subjects]>;

export default function buildAbilityFor(role: AppRole): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  // defined permissions
  switch (role) {
    case Roles.Admin:
      can([Actions.Delete, Actions.Read], Subjects.Todo);
      cannot(Actions.Create, Subjects.Todo).because('Only editor can create Todos');
      break;
    case Roles.Editor:
      can([Actions.Create, Actions.Read], Subjects.Todo);
      cannot(Actions.Delete, Subjects.Todo).because('Only admins can delete Todos');
      break;
    case Roles.Subscriber:
      can(Actions.Read, Subjects.Todo);
      cannot(Actions.Delete, Subjects.Todo).because('Only admins can delete Todos');
      cannot(Actions.Create, Subjects.Todo).because('Only editor can create Todos');
      break;
    case Roles.Guest:
      cannot(Actions.Read, Subjects.Auth).because('Only authenticated users can read auth');
      cannot(Actions.Read, Subjects.Todo).because('Only authenticated users can read todo');
      break;
  }

  return build();
}

export function findReason(ability: AppAbility, action: AppAction, subject: AppSubject) {
  const rules = ability.rules.filter((rule) => rule.inverted);
  // return rules.find((rule) => rule.action === action)?.reason || 'Default reason';
  return (
    rules.find((rule) => rule.action === action && rule.subject === subject)?.reason ||
    'Default reason'
  );
}
