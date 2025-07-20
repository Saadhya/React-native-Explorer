import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  loggedIn: false,
  login: async (userData: any) => {},
  signup: async ({
    name,
    password,
    phone,
  }: {
    name: string;
    password: string;
    phone: string;
  }) => {},
  logout: async () => {},
  resetPassword: async (email: string) => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // add properties
  const [user, setUser] = useState(null);
  const [loggedIn, setIsLoggedIn] = useState(false);

  // add methods for authentication here
  const login = async (userData: any) => {
    setUser(userData);
    
  };
  const signup = async ({
    name,
    password,
    phone,
  }: {
    name: string;
    password: string;
    phone: string;
  }) => {};
  const logout = async () => {};
  const resetPassword = async (email: string) => {};

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, login, signup, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
