export interface User {
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  groups?: {
    $oid: string;
  }[];
}
