import { createContext, useContext, useState } from "react";
import { isStringValid } from "../utils/helpers";
import { createUser } from "../sql/auth/user";
import { createNewSession, deleteSessions } from "../sql/auth/sessions";

const AuthContext = createContext({
  user: { name: "", email: "", phone: "" },
  loggedIn: false,
  login: async (id: string, password: string) => {},
  signup: async ({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {},
  logout: async () => {},
  resetPassword: async (email: string) => {},
});

export const useAuth = () => useContext(AuthContext);
type NewUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // add properties
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loggedIn, setIsLoggedIn] = useState(false);

  // add methods for authentication here
  const login = async (id: string, password: string) => {
    if ((!id && id.trim() === "") || (!password && password.trim() === "")) {
      console.log("Invalid credentials");
      return;
    }
  };
  // find a user by id
  // verify password
  // create session

  const signup = async ({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    if (!isStringValid(name, email, phone, password)) {
      console.log("Invalid input");
      return;
    }
    // create new user
    // Define the expected type for newuser

    try {
      const newuser = await createUser({
        name: "",
        email: "",
        phone: "",
        password: "",
      }) as NewUser;
      console.log("User created: ", newuser);

      if (!newuser || typeof newuser.id === "undefined") {
        console.log("Error creating user");
        return;
      }
      // create session
      console.log("creating session !");
      await deleteSessions(); // clear previous sessions
      const session = await createNewSession(newuser.id);
      console.log("session created successfully: ", session);

      setUser({
        name: newuser.name,
        email: newuser.email,
        phone: newuser.phone,
        password: newuser.password ?? "",
      })
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error creating user:", error);
      return;
    }

    // update state
    // setUser({ name: newuser.name, email: newuser.email, phone: String(newuser.phone) });
  };
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
