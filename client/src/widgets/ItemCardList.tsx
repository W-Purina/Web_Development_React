import { useContext } from "react";
import ItemCard from "../components/ItemCard";
import { OrdersContext } from "../contexts/OrdersContextProvider";

const ItemCardList = () => {
  const { orderDetails } = useContext(OrdersContext);
  return (
    <>
      <div className="p-5">
        {orderDetails.items.map((item, index) => {
          return (
            <ItemCard
              itemName={item.productname}
              amount={item.amount}
              totalPrice={item.productprice}
              key={index}
            ></ItemCard>
          );
        })}
      </div>
    </>
  );
};

export default ItemCardList;
