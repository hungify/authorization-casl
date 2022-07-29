import { useContext } from 'react';
import { AbilityContext } from '~/context/Ability';

export function useAbility() {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within a AbilityProvider');
  }
  return context;
}
