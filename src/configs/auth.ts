import { Roles, Subjects } from '~/interfaces/auth';

export enum ROLES {
  Admin = 'Admin',
  Editor = 'Editor',
  Subscriber = 'Subscriber',
}

export enum ACTIONS {
  Create = 'Create',
  Delete = 'Delete',
  Edit = 'Edit',
  Read = 'Read',
}

export enum SUBJECTS {
  Auth = 'Auth',
  Todo = 'Todo',
}

export const ABILITIES = {
  [SUBJECTS.Auth]: {
    [ROLES.Admin]: [ACTIONS.Delete, ACTIONS.Edit, ACTIONS.Create],
    [ROLES.Editor]: [ACTIONS.Edit, ACTIONS.Create],
    [ROLES.Subscriber]: [ACTIONS.Create],
  },
  [SUBJECTS.Todo]: {
    [ROLES.Admin]: [ACTIONS.Delete, ACTIONS.Read],
    [ROLES.Editor]: [ACTIONS.Edit, ACTIONS.Create],
    [ROLES.Subscriber]: [ACTIONS.Read],
  },
};

export function defineRulesFor(role: Roles) {
  return {
    abilities: {
      [SUBJECTS.Auth]: ABILITIES[SUBJECTS.Auth][role],
      [SUBJECTS.Todo]: ABILITIES[SUBJECTS.Todo][role],
    },
  };
}
