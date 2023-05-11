import { Card } from "antd-mobile";
import styles from "./FamilyCard.module.css";

interface FamilyCardProps {
  familyName: string;
  familyMembers: string[];
  total: number;
}
const FamilyCard = ({ familyName, familyMembers, total }: FamilyCardProps) => {
  return (
    <>
      <Card title={familyName} className={`${styles.familyCard} mb-8`}>
        <div className="flex items-center">
          <div className="flex h-full flex-grow">
            <span className="pr-3">{familyMembers.join(", ")}</span>
          </div>
          <span
            className={`${styles.shadowText} text-grey-700 mb-1 h-full text-right text-3xl`}
          >
            ${total}
          </span>
        </div>
      </Card>
    </>
  );
};

export default FamilyCard;