import { clsx, type ClassValue } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { EntityError } from './http';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const isBrowser = typeof window !== 'undefined';
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('accessToken') : null;

export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('refreshToken') : null;
export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('accessToken', value);

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('refreshToken', value);
export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('accessToken');
  isBrowser && localStorage.removeItem('refreshToken');
};

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  console.log(duration);
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(item => {
      setError(item.field, {
        type: 'server',
        message: item.message,
      });
    });
  } else {
    console.log(error);
    // toast(error?.payload?.message ?? 'Lỗi không xác định');
  }
};
