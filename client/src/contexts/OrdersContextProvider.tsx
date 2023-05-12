import { createContext, useState } from "react";
import { OrderDetails } from "../types/Order";

interface OrdersContextProviderProps {
  children: React.ReactNode;
}

const initialValue = {
  orderDetails: {
    _id: "777",
    storename: "defalut store",
    purchaseDate: "Not exist",
    totalPrice: 0,
    createdBy: "default user",
    items: [],
  } as OrderDetails,
  setCurrentOrderDetails: (value: OrderDetails) => {
    console.log(value);
  },
};

export const OrdersContext = createContext(initialValue);

const OrdersContextProvider = (props: OrdersContextProviderProps) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    _id: "777",
    storename: "defalut store",
    purchaseDate: "Not exist",
    totalPrice: 0,
    createdBy: "default user",
    items: [],
  });

  const setCurrentOrderDetails = (value: OrderDetails) => {
    setOrderDetails(value);
  };

  return (
    <OrdersContext.Provider value={{ orderDetails, setCurrentOrderDetails }}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersContextProvider;
