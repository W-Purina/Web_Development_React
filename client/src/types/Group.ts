import { Order } from "./Order";

export interface Group {
  _id: string;
  groupname: string;
  description?: string;
  members: string[];
  createdBy?: {
    _id: string;
    username: string;
  };
  orders?: {
    $oid: string;
  }[];
  currentMonthCost: number;
}

export interface GroupDetails {
  _id: string;
  groupname: string;
  members: {
    username: string;
    _id: string;
  }[];
  createdBy: {
    _id: string;
    username: string;
  };
  currentMonthCost: number;
  orders: Order[];
}
