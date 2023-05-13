export interface Order {
  _id: string;
  storename: string;
  purchaseDate: string;
  totalPrice: number;
  createdBy:
    | {
        _id: string;
        username: string;
      }
    | string;
}

export interface OrderDetails {
  _id: string;
  storename: string;
  purchaseDate: string;
  totalPrice: number;
  createdBy:
    | {
        _id: string;
        username: string;
      }
    | string;
  items: { productname: string; amount: number; productprice: number }[];
}
