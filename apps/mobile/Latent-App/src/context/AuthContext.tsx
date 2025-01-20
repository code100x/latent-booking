import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  token: string | null;
  storeToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const retrieveToken = async () => {
    try {
      setLoading(true);
      const storedToken = await SecureStore.getItemAsync('token');
      setToken(storedToken || null);
    } catch (error) {
      console.error('Error retrieving token:', error);
    } finally {
      setLoading(false);
    }
  };

  const storeToken = async (newToken: string) => {
    try {
      await SecureStore.setItemAsync('token', newToken);
      setToken(newToken);
      console.log('Token stored successfully');
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const clearToken = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setToken(null);
      console.log('Token cleared successfully');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        storeToken,
        clearToken,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
