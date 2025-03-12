'use client';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathNames = usePathname();
  const pathName = '/' + pathNames.split('/')[1];
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const queryClient = new QueryClient();

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
