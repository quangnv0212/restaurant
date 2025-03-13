import { Role } from '@/constants/type';
import { TokenType } from '@/constants/type';

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType];
export type RoleType = (typeof Role)[keyof typeof Role];
export interface TokenPayload {
  userId: number;
  role: RoleType;
  tokenType: TokenTypeValue;
  exp: number;
  iat: number;
}

export interface TableTokenPayload {
  iat: number;
  number: number;
  tokenType: (typeof TokenType)['TableToken'];
}

export type AppStoreType = {
  isAuth: boolean;
  role: RoleType | undefined;
  setRole: (role?: RoleType | undefined) => void;
};
