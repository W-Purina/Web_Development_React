import { createContext, useState } from "react";
import { Group } from "../types/Group";

interface GroupsContextProviderProps {
  children: React.ReactNode;
}

const initialValue = {
  groups: [] as Group[],
  setCurrentGroups: (value: Group[]) => console.log(value),
};

export const GroupsContext = createContext(initialValue);

const GroupsContextProvider = (props: GroupsContextProviderProps) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const setCurrentGroups = (value: Group[]) => {
    setGroups(value);
  };

  return (
    <GroupsContext.Provider value={{ groups, setCurrentGroups }}>
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsContextProvider;
