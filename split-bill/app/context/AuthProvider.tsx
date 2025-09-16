import { createContext, useContext, useEffect, useState } from "react";
import { isStringValid } from "../utils/helpers";
import { createUser, getUserById } from "../sql/auth/user";
import {
  createNewSession,
  deleteSessions,
  getSession,
} from "../sql/auth/sessions";

const AuthContext = createContext({
  user: { id:0, name: "", email: "", phone: "", password: "" },
  loggedIn: false,
  login: async (id: number, password: string) => {},
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
interface NewUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
};

export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // add properties
  const [user, setUser] = useState({
    id:0,
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check old session
        const session:any = await getSession();
        console.log("Existing session: ", JSON.stringify(session));

        if (!session || session.length === 0) {
          return;
        }

        // If multiple sessions exist, delete all and logout
        if (session.length > 1) {
          await deleteSessions();
          return;
        }

        // If exactly one session, get user by ID
        const userUnknown: any = await getUserById(session[0].user_id);

        if (
          userUnknown &&
          typeof userUnknown === "object" &&
          "name" in userUnknown &&
          "email" in userUnknown &&
          "phone" in userUnknown
        ) {
          const user = userUnknown as NewUser;

          if (!user) {
            return;
          }

          // Set user and mark as logged in
          setUser({id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password ?? "",
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  // add methods for authentication here
  const login = async (id: number, password: string) => {
    if (!isStringValid([password]) || !id || id === 0) {
      console.log("Invalid password or id");
      return;
    }
    try {
      // find a user by id
      const logUserUnknown = await getUserById(id);
      console.log("user retrieved: ", JSON.stringify(logUserUnknown));

      // Type assertion or runtime check
      const logUser = logUserUnknown as NewUser;

      // verify password
      const isPwdCorrect = logUser.password === password;
      if (!isPwdCorrect) {
        console.log("Invalid credentials");
        alert("Invalid pwd");
        return;
      }

      // create session
      await deleteSessions(); // clear previous sessions
      const session = await createNewSession(logUser.id);
      console.log("session created successfully: ", session);

      setUser({
        id: logUser.id,
        name: logUser.name,
        email: logUser.email,
        phone: logUser.phone,
        password: logUser.password ?? "",
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error while login: ", error);
      throw error;
    }
  };

  const signup = async ({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    console.log(
      `signup values :- name: ${name}, email: ${email}, phone: ${phone}, password: ${password}`
    );

    if (!isStringValid([name, email, phone, password])) {
      console.log("Invalid input");
      return;
    }

    try {
      // Create new user with actual input values
      const newuser = (await createUser({
        name,
        email,
        phone,
        password,
      })) as NewUser;

      console.log("User created: ", newuser);

      if (!newuser || typeof newuser.id === "undefined") {
        console.log("Error creating user");
        return;
      }

      // Create session
      // console.log("Creating session...");
      await deleteSessions(); // Clear previous sessions
      const session = await createNewSession(newuser.id);
      console.log("Session created successfully: ", session);

      // Update state
      setUser({
        id: newuser.id,
        name: newuser.name,
        email: newuser.email,
        phone: newuser.phone,
        password: newuser.password ?? "",
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await deleteSessions();
      setUser({id:0, name: "", email: "", phone: "", password: "" });
      setIsLoggedIn(false);
    }
    catch (error) { 
      console.log("Error while logout: ", error);
      throw error;
    }
  };
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
