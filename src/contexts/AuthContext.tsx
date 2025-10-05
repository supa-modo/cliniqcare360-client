import React, { createContext, useContext, useState, useEffect } from "react";
import api, {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  clearTokens,
} from "../lib/api";
import { User, LoginCredentials, AuthContextType } from "../types/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface DecodedToken {
  staff_id: string;
  username: string;
  email: string;
  role: string;
  exp: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Try to restore session on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          setLoading(false);
          return;
        }

        // Decode token to get user info
        const decoded: DecodedToken = jwtDecode(accessToken);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token expired, clear it
          clearTokens();
          setUser(null);
        } else {
          // Token still valid, restore user
          setUser({
            id: decoded.staff_id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            full_name: "", // Will be populated on actual login
          });
        }
      } catch (error) {
        // Invalid token, clear it
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken, user: userData } = response.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed";
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
