import { useContext, useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { Order } from "../types/Order";

const OrderCardList = () => {
  const { groupDetails } = useContext(GroupsContext);
  const [orderData, setOrderData] = useState<Order[]>([]);
  useEffect(() => {
    setOrderData(groupDetails.orders.reverse());
    console.log(orderData);
  }, [groupDetails, orderData]);

  return (
    <>
      <div className="p-5">
        {/* Date indecator */}
        {orderData.map((item, index) => {
          return (
            <div key={index}>
              <div className=" my-2 ml-1 text-lg font-bold text-gray-600">
                {new Date(item.purchaseDate).toDateString()}
              </div>
              <OrderCard
                storeName={item.storename}
                createdBy={item.createdBy}
                total={item.totalPrice}
                orderId={item._id}
              ></OrderCard>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderCardList;
