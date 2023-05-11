import { Card } from "antd-mobile";
import styles from "./FamilyCard.module.css";
import { Link, NavLink } from "react-router-dom";

interface FamilyCardProps {
  storeName: string;
  createdBy: string;
  total: number;
}
const FamilyCard = ({ storeName, createdBy, total }: FamilyCardProps) => {
  return (
    <>
      <Link to={"/order/1"}>
        <Card title={storeName} className={`${styles.familyCard} mb-8`}>
          <div className="flex items-center">
            <div className="flex h-full flex-grow">
              <span className="pr-3">{`Created By: ${createdBy}`}</span>
            </div>
            <span
              className={`${styles.shadowText} text-grey-700 mb-1 h-full text-right text-3xl`}
            >
              ${total}
            </span>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default FamilyCard;
