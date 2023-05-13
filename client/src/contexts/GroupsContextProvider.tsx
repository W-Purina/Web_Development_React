import { createContext, useState } from "react";
import { Group, GroupDetails } from "../types/Group";

interface GroupsContextProviderProps {
  children: React.ReactNode;
}

const initialValue = {
  groups: [] as Group[],
  setCurrentGroups: (value: Group[]) => console.log(value),
  groupDetails: {
    _id: "",
    groupname: "Default name",
    members: [],
    createdBy: { _id: "", username: "" },
    currentMonthCost: 0,
    orders: [],
  } as GroupDetails,
  setCurrentGroupDetails: (value: GroupDetails) => console.log(value),
};

export const GroupsContext = createContext(initialValue);

const GroupsContextProvider = (props: GroupsContextProviderProps) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const setCurrentGroups = (value: Group[]) => {
    setGroups(value);
  };

  const [groupDetails, setGroupDetails] = useState<GroupDetails>({
    _id: "",
    groupname: "Default name",
    members: [],
    createdBy: { _id: "", username: "null" },
    currentMonthCost: 0,
    orders: [],
  });

  const setCurrentGroupDetails = (value: GroupDetails) => {
    setGroupDetails(value);
  };

  return (
    <GroupsContext.Provider
      value={{ groups, setCurrentGroups, groupDetails, setCurrentGroupDetails }}
    >
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsContextProvider;
