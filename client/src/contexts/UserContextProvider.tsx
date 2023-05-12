import { createContext, useState } from "react";
import { User } from "../types/User";

interface UserContextProviderProps {
  children: React.ReactNode;
}

const initialValue = {
  user: {
    username: "Not Login",
    email: "not login",
    firstName: "Not",
    lastName: "Login",
  },
  setCurrentUser: (value: User) => {
    console.log(value);
  },
};

export const UserContext = createContext(initialValue);

const UserContextProvider = (props: UserContextProviderProps) => {
  const [user, setUser] = useState<User>({
    username: "Not Login",
    email: "not login",
    firstName: "Not",
    lastName: "Login",
  });

  const setCurrentUser = (value: User) => {
    setUser(value);
  };

  return (
    <UserContext.Provider value={{ user, setCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
