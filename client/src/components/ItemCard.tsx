import { Card } from "antd-mobile";
import styles from "./FamilyCard.module.css";

interface FamilyCardProps {
  itemName: string;
  amount: number;
  totalPrice: number;
}
const ItemCard = ({ itemName, amount, totalPrice }: FamilyCardProps) => {
  return (
    <>
      <Card title={itemName} className={`${styles.familyCard} mb-8`}>
        <div className="flex items-center">
          <div className="flex h-full flex-grow">
            <span className="pr-3">{`Amount: ${amount}`}</span>
          </div>
          <span
            className={`${styles.shadowText} text-grey-700 mb-1 h-full text-right text-3xl`}
          >
            ${Number(totalPrice).toFixed(2)}
          </span>
        </div>
      </Card>
    </>
  );
};

export default ItemCard;
