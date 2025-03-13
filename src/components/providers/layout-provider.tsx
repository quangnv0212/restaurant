'use client';
import {
  decodeToken,
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from '@/lib/utils';
import { AppStoreType, RoleType } from '@/types/jwt.types';
import { UserOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import LayoutWrapperMotion from './layout-wrapper-motion';
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: '/account',
    icon: <UserOutlined />,
    label: (
      <Link href="/account" className="font-medium">
        Account
      </Link>
    ),
  },
];

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
  const [collapsed, setCollapsed] = useState(false);
  const pathNames = usePathname();
  const pathName = '/' + pathNames.split('/')[1];
  const [openKeys, setOpenKeys] = useState<string[]>([]);
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
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            items={items}
            className="font-poppins"
            selectedKeys={[pathName]}
            openKeys={openKeys}
            onOpenChange={keys => setOpenKeys(keys)}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <LayoutWrapperMotion>{children}</LayoutWrapperMotion>
            </div>
          </Content>
        </Layout>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
