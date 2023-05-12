export interface Order {
  _id: string;
  storename: string;
  purchaseDate: string;
  totalPrice: number;
  createdBy: string;
}

export interface OrderDetails {
  _id: string;
  storename: string;
  purchaseDate: string;
  totalPrice: number;
  createdBy: string;
  items: { productname: string; amount: number; productprice: number }[];
}
