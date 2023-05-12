import { Order } from "./Order";

export interface Group {
  _id: string;
  groupname: string;
  description?: string;
  members: string[];
  createdBy?: {
    $oid: string;
  };
  orders?: {
    $oid: string;
  }[];
  currentMonthCost: number;
}

export interface GroupDetails {
  _id: string;
  groupname: string;
  members: string[];
  createdBy: {
    $oid: string;
  };
  currentMonthCost: number;
  orders: Order[];
}
