import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LayoutWrapperMotion from './layout-wrapper-motion';
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
export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathNames = usePathname();
  const pathName = '/' + pathNames.split('/')[1];
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  return (
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
  );
}
