import { createContextualCan } from '@casl/react';
import { AbilityContext } from '~/context/Ability';

const Can = createContextualCan(AbilityContext.Consumer);

export default Can;
