"use client";
import UserLogout from "@/actions/userLogout";
import { UserProps } from "@/types/user";
// import validateToken from "@/actions/validate-token";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserContext {
  userLogged: UserProps | null;
  setUserLogged: Dispatch<SetStateAction<UserProps | null>>;
  userLogout: () => Promise<void>;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("UseContext deve estar dentro do provider.");
  }

  return context;
};

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userLogged, setUserLogged] = useState<UserProps | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogged");
    if (storedUser) {
      setUserLogged(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (userLogged) {
      localStorage.setItem("userLogged", JSON.stringify(userLogged));
    } else {
      localStorage.removeItem("userLogged");
    }
  }, [userLogged]);

  const userLogout = async () => {
    await UserLogout();
    setUserLogged(null);
  };

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}
