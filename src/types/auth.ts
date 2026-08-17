export type {
  ForgotPasswordRequest,
  LoginRequest,
  OtpPurpose,
  OtpVerifyRequest,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordFormValues,
  ResetPasswordRequest,
} from '@/validations/auth';
export {
  emailSchema,
  forgotPasswordRequestSchema,
  loginRequestSchema,
  otpPurposeSchema,
  otpVerifyRequestSchema,
  registerRequestSchema,
  resendOtpRequestSchema,
  resetPasswordFormSchema,
  resetPasswordRequestSchema,
} from '@/validations/auth';

export type UserAuthDto = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string | null;
  roles: string[];
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserAuthDto;
};

export type UserResponseDto = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  isActive: boolean;
  roles: string[];
};

export type VerifyOtpResponse = {
  accessToken?: string;
  refreshToken?: string;
  actionToken?: string;
};
