'use client';
import {
  decodeToken,
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from '@/lib/utils';
import { AppStoreType, RoleType } from '@/types/jwt.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { create } from 'zustand';
import LayoutDefault from './layout-default';

export const useAppStore = create<AppStoreType>(set => ({
  isAuth: false,
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => {
    set({ role, isAuth: Boolean(role) });
    if (!role) {
      removeTokensFromLocalStorage();
    }
  },
}));
const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setRole = useAppStore(state => state.setRole);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const count = useRef(0);

  useEffect(() => {
    if (count.current === 0) {
      const accessToken = getAccessTokenFromLocalStorage();
      if (accessToken) {
        const role = decodeToken(accessToken).role;
        setRole(role);
      }
      count.current++;
    }
  }, [setRole]);

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutDefault>{children}</LayoutDefault>
    </QueryClientProvider>
  );
};

export default App;
