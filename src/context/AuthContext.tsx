'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
   token: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, token }: { children: ReactNode; token?: string | undefined }) {
   return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
