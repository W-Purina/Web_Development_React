import { useContext, useEffect, useState } from "react";
import styles from "./DashboardProfile.module.css";
import { OrdersContext } from "../contexts/OrdersContextProvider";

const OrderProfile = () => {
  const { orderDetails } = useContext(OrdersContext);
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const date = new Date(orderDetails.purchaseDate);

    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    const year = date.getFullYear();

    setFormattedDate(day + "/" + month + "/" + year);
  }, [orderDetails]);
  return (
    <>
      {/* The profile box */}
      <div className={`${styles.profileBox} relative h-[240px] w-full`}>
        {/* To assist background blur */}
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
        {/* Avatar and username box */}
        <div className="absolute mt-16 flex w-full pl-5">
          {/* Username area */}
          <div className="ml-3 flex flex-grow flex-col justify-center">
            <span className={`${styles.shadowText} mb-2 text-2xl text-white`}>
              {orderDetails.storename}
            </span>
            <span
              className={`${styles.shadowText} text-base text-white`}
              style={{ maxWidth: "13em" }}
            >
              Created By: {orderDetails.createdBy}
            </span>
            <span
              className={`${styles.shadowText} text-base text-white`}
              style={{ maxWidth: "13em" }}
            >
              Date: {formattedDate}
            </span>
          </div>
          {/* Total summary */}
          <div className="mr-3 flex flex-col justify-center">
            <span className={`${styles.shadowText} mb-1 text-base text-white`}>
              Total:
            </span>
            <span
              className={`${styles.shadowText} mb-1 text-right text-3xl text-white`}
            >
              ${orderDetails.totalPrice}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderProfile;
