'use client';
import { Modal as AntdModal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <AntdModal
      open={open}
      onCancel={() => {
        setOpen(false);
        if (!open) router.back();
      }}
    >
      hi
      {children}
    </AntdModal>
  );
}
