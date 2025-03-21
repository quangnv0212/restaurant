import authApiRequest from '@/app/(public)/(auth)/apiRequests/auth';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) {
    return Response.json(
      {
        message: 'Can not get refresh token',
      },
      {
        status: 401,
      },
    );
  }
  try {
    const { payload } = await authApiRequest.sRefreshToken({
      refreshToken,
    });

    const decodedAccessToken = jwt.decode(payload.data.accessToken) as {
      exp: number;
    };
    const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as {
      exp: number;
    };
    cookieStore.set('accessToken', payload.data.accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set('refreshToken', payload.data.refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });
    return Response.json(payload);
  } catch (error: any) {
    console.log(error);
    return Response.json(
      {
        message: error.message ?? 'Error when calling API to server backend',
      },
      {
        status: 401,
      },
    );
  }
}
