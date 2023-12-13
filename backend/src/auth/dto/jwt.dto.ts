export interface JwtPayload {
  sub: string;
  email: string; // email
  TFAEnabled: boolean;
  TFAVerified: boolean;
  iat?: number; // issued at
  exp?: number; // expiration
  id: string;
  login: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  isOnline: boolean;
  score: number;
}

export interface AuthTokens {
  accessToken: string;
}
