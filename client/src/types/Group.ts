export interface Group {
  groupname: string;
  description?: string;
  members: string[];
  createdBy?: {
    $oid: string;
  };
  orders?: {
    $oid: string;
  }[];
  currentMonthCost?: number;
}
