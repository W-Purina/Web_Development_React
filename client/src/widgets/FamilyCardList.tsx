import FamilyCard from "../components/FamilyCard";
import { Group } from "../types/Group";

interface FamilyCardListProps {
  groupsData: Group[];
}
const FamilyCardList = ({ groupsData }: FamilyCardListProps) => {
  return (
    <>
      <div className="p-5">
        {groupsData.map((item, index) => {
          return (
            <FamilyCard
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
