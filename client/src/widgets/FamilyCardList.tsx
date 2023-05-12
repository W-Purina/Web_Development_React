import { useContext } from "react";
import FamilyCard from "../components/FamilyCard";
import { GroupsContext } from "../contexts/GroupsContextProvider";

const FamilyCardList = () => {
  const { groups } = useContext(GroupsContext);
  return (
    <>
      <div className="p-5">
        {groups.map((item, index) => {
          return (
            <FamilyCard
              groupId={item._id}
              familyName={item.groupname}
              familyMembers={item.members}
              total={item.currentMonthCost || 0}
              key={index}
            ></FamilyCard>
          );
        })}
      </div>
    </>
  );
};

export default FamilyCardList;
