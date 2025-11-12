import React, { createContext, useContext, useState, useEffect } from "react";
import authService, {
  UserData,
  LoginData,
  SignupData,
} from "../services/authService";

interface AuthContextData {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<UserData>) => Promise<void>;
  deleteUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        const userData = await authService.getUserData();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      const { user: userData } = await authService.login(data);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const { user: userData } = await authService.signup(data);
      setUser(userData);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<UserData>) => {
    try {
      await authService.updateUserData(updates);
      const updatedUser = await authService.getUserData();
      setUser(updatedUser);
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  };

  const deleteUser = async () => {
    try {
      await Promise.all([
        authService.removeAuthToken(),
        await authService.removeUserData(),
      ]);
      setUser(null);
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
