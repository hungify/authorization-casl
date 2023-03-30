import { createContext, useEffect, useState } from 'react';
import buildAbilityFor, { AppAbility } from '~/configs/ability';
import { Roles } from '~/configs/auth';
import { useAuth } from '~/hooks/useAuth';

export const AbilityContext = createContext<AppAbility>(undefined!);
AbilityContext.displayName = 'AbilityContext';

interface AbilityProviderProps {
  children: React.ReactNode;
}
export default function AbilityProvider({ children }: AbilityProviderProps) {
  const { user } = useAuth();
  const [ability, setAbility] = useState(buildAbilityFor(user?.role || Roles.Guest));

  useEffect(() => {
    setAbility(buildAbilityFor(user?.role || Roles.Guest));
  }, [user?.role]);

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
}
