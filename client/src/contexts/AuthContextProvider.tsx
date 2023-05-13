import { createContext, useState } from "react";
import { User } from "../types/User";

interface UserContextProviderProps {
  children: React.ReactNode;
}

const initialValue = {
  authed: false,
  setAuthed: (value: boolean) => console.log(value),
};

export const AuthContext = createContext(initialValue);

const AuthContextProvider = (props: UserContextProviderProps) => {
  const initVal = localStorage.getItem("token") ? true : false;
  const [authed, setAuthed] = useState(initVal);

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
