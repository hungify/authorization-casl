import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';
import { Actions, Roles, Subjects } from '~/interfaces/auth';

export type AppAbility = Ability<[Actions, Subjects]>;
export const appAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: Roles) {
  const { can, cannot, rules } = new AbilityBuilder(appAbility);

  // defined permissions
  if (role === 'Admin') {
    can(['delete', 'read'], 'Todo');
    cannot('create', 'Todo').because('Only editor can create Todos');
  } else if (role === 'Editor') {
    can(['create', 'read'], 'Todo');
    cannot('delete', 'Todo').because('Only admins can delete Todos');
  } else if (role === 'Subscriber') {
    can(['read'], 'Todo');
    cannot('delete', 'Todo').because('Only admins can delete Todos');
    cannot('create', 'Todo').because('Only editor can create Todos');
  } else {
    cannot('read', 'Todo').because('You are not logged in');
  }

  return rules;
}

export function buildAbilityFor(role: Roles): AppAbility {
  return new appAbility(defineRulesFor(role), {
    detectSubjectType: (object: any) => object!.type,
  });
}
