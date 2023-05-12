import { useContext } from "react";
import OrderCard from "../components/OrderCard";
import { GroupsContext } from "../contexts/GroupsContextProvider";

const OrderCardList = () => {
  const { groupDetails } = useContext(GroupsContext);
  return (
    <>
      <div className="p-5">
        {/* Date indecator */}
        {groupDetails.orders.reverse().map((item, index) => {
          return (
            <div key={index}>
              <div className=" my-2 ml-1 text-lg font-bold text-gray-600">
                {new Date(item.purchaseDate).toDateString()}
              </div>
              <OrderCard
                storeName={item.storename}
                createdBy={item.createdBy}
                total={item.totalPrice}
              ></OrderCard>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderCardList;
