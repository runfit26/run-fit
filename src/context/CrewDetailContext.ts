import { createContext, useContext } from 'react';

export const CrewDetailContext = createContext<
  'LEADER' | 'STAFF' | 'MEMBER' | undefined
>(undefined);

export const useCrewRole = () => {
  const context = useContext(CrewDetailContext);
  return context;
};
