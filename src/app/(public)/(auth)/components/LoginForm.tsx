'use client';

import { InputCheckCommon } from '@/components/common/input-check';
import { InputPassword } from '@/components/common/input-password';
import { InputTextCommon } from '@/components/common/input-text';
import { useAppStore } from '@/components/providers/layout-provider';
import { handleErrorApi } from '@/lib/utils';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useLoginMutation } from '../queries/useAuth';
import { LoginBody, LoginBodyType } from '../schemaValidations/auth.schema';
export default function LoginForm() {
  const { control, handleSubmit, setError } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const loginMutation = useLoginMutation();
  const setRole = useAppStore(state => state.setRole);
  const router = useRouter();
  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(data);
      toast.success(result.payload.message);
      setRole(result.payload.data.account.role);
      router.push('/manage/dashboard');
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: setError,
      });
    }
  };
  return (
    <div className="font-poppins flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold uppercase">Login</h1>
      <Form
        onFinish={handleSubmit(onSubmit, error => {
          console.log(error);
        })}
        className="animate-slideUp flex w-[320px] flex-col gap-2"
      >
        <InputTextCommon
          label="Email"
          name="email"
          placeholder="Enter your email"
          prefix={<UserOutlined />}
          control={control}
          size="large"
        />
        <InputPassword
          label="Password"
          name="password"
          placeholder="Enter your password"
          prefix={<KeyOutlined />}
          control={control}
          size="large"
        />
        <div className="mb-2 flex items-center justify-between">
          <Link
            className="font-poppins transform text-sm font-semibold text-gray-600 transition-colors duration-300 hover:scale-105 hover:text-blue-500"
            href={'/forgot-password'}
          >
            Forgot Password?
          </Link>
          <InputCheckCommon
            label="Remember me"
            name="rememberClient"
            control={control}
            size="large"
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="btn btn-primary btn-block"
          size="large"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
