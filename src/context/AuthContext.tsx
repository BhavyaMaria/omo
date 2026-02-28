import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@models/User";
import { backend } from "@services/backendService";
import { saveJSON, storageKeys } from "@services/localStorageService";

interface AuthContextType {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
  updateUser: (partial: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    backend.getUser().then((stored) => {
      if (stored) {
        setUser(stored);
      }
    });
  }, []);

  const syncAndSet = async (next: User | null) => {
    setUser(next);
    if (next) {
      await backend.saveUser(next);
    } else {
      saveJSON(storageKeys.USER_KEY, null);
    }
  };

  const login = async (userData: User) => {
    await syncAndSet(userData);
  };

  const updateUser = async (partial: Partial<User>) => {
    if (!user) return;
    const next: User = { ...user, ...partial };
    await syncAndSet(next);
  };

  const logout = () => {
    syncAndSet(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

