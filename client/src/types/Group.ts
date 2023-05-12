export interface Group {
  groupname: string;
  description?: string;
  members: {
    $oid: string;
  }[];
  createdBy: {
    $oid: string;
  };
  orders: {
    $oid: string;
  }[];
}
