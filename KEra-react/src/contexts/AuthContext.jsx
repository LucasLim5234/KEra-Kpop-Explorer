import { createContext, useContext, useEffect, useState } from "react";
import { loadUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(undefined); 

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await loadUser();
      setAuthUser(userData ?? null);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
