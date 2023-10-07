import { useContext } from 'react';
import { AbilityContext } from '~/context/Ability';
import { AppAction, AppSubject } from '~/interfaces/auth';

export function useAbility() {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within a AbilityProvider');
  }
  const findReason = (action: AppAction, subject: AppSubject, inverted = true) => {
    const rules = context.rules.filter((rule) => rule.inverted === inverted);
    const foundRule = rules.find((rule) => rule.action === action && rule.subject === subject);

    return foundRule?.reason || 'Default reason';
  };
  context.findReason = findReason;

  return context;
}
