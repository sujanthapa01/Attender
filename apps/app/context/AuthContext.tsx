import React, { useState, useEffect, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    courseId: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Restore session from SecureStore
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedUser = await SecureStore.getItemAsync("userData");
        const savedToken = await SecureStore.getItemAsync("userToken");

        if (savedUser && savedToken) {
          const parsedUser: User = JSON.parse(savedUser);

          setUser(parsedUser);
          setToken(savedToken);
          setIsLoggedIn(true);

          console.log("Session restored:", parsedUser);
        }
      } catch (error) {
        console.log("Failed to restore session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // 🔹 Login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        "http://192.168.29.223:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      await SecureStore.setItemAsync("userToken", data.token);
      await SecureStore.setItemAsync("userData", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      setIsLoggedIn(true);

      console.log("Login success:", data.user);
    } catch (error: any) {
      console.log("Login error:", error.message);
      throw error;
    }
  };

  // 🔹 Register
  const register = async (
    name: string,
    email: string,
    password: string,
    courseId: string
  ) => {
    try {
      const response = await fetch(
        "http://192.168.29.223:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            courseId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration success");

      // auto login
      await login(email, password);
    } catch (error: any) {
      console.log("Registration error:", error.message);
      throw error;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userData");

      setToken(null);
      setUser(null);
      setIsLoggedIn(false);

      console.log("User logged out");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};