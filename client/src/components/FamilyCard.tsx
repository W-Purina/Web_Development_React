import { Card } from "antd-mobile";
import styles from "./FamilyCard.module.css";
import { Link } from "react-router-dom";

interface FamilyCardProps {
  groupId: string;
  familyName: string;
  familyMembers: string[];
  total: number;
}
const FamilyCard = ({
  groupId,
  familyName,
  familyMembers,
  total,
}: FamilyCardProps) => {
  return (
    <>
      <Link to={`/group/${groupId}`}>
        <Card title={familyName} className={`${styles.familyCard} mb-8`}>
          <div className="flex items-center">
            <div className="flex h-full flex-grow">
              <span className="pr-3">{familyMembers.join(", ")}</span>
            </div>
            <span
              className={`${styles.shadowText} text-grey-700 mb-1 h-full text-right text-3xl`}
            >
              ${Number(total).toFixed(2)}
            </span>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default FamilyCard;
