import OrderCard from "../components/OrderCard";

const OrderCardList = () => {
  return (
    <>
      <div className="p-5">
        {/* Date indecator */}
        <div className=" my-2 ml-1 text-lg font-bold text-gray-600">11/5</div>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
        <OrderCard
          storeName="Countdown"
          createdBy={"Bo Pang"}
          total={732}
        ></OrderCard>
      </div>
    </>
  );
};

export default OrderCardList;
