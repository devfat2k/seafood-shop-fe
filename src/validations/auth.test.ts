import { describe, expect, it } from 'vitest';
import {
  forgotPasswordRequestSchema,
  loginRequestSchema,
  otpVerifyRequestSchema,
  registerRequestSchema,
  resetPasswordFormSchema,
} from '@/validations/auth';

describe('Auth Validations', () => {
  describe('Login Request Validation', () => {
    it('should validate valid login credentials', () => {
      const result = loginRequestSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(result.success).toBeTruthy();
    });

    it('should reject invalid email format', () => {
      const result = loginRequestSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBeFalsy();
    });

    it('should reject empty password', () => {
      const result = loginRequestSchema.safeParse({
        email: 'user@example.com',
        password: '',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Register Request Validation', () => {
    it('should validate a correct register payload', () => {
      const result = registerRequestSchema.safeParse({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phoneNumber: '0987654321',
        password: 'Password123@',
      });
      expect(result.success).toBeTruthy();
    });

    it('should reject short password under 8 characters', () => {
      const result = registerRequestSchema.safeParse({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phoneNumber: '0987654321',
        password: '123',
      });
      expect(result.success).toBeFalsy();
    });

    it('should reject invalid phone numbers', () => {
      const result = registerRequestSchema.safeParse({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phoneNumber: 'abc1234',
        password: 'Password123@',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('OTP Verify Validation', () => {
    it('should validate 6-digit numeric OTP', () => {
      const result = otpVerifyRequestSchema.safeParse({
        email: 'user@example.com',
        otpCode: '123456',
        purpose: 'REGISTER_VERIFICATION',
      });
      expect(result.success).toBeTruthy();
    });

    it('should reject OTP length less than 6 digits', () => {
      const result = otpVerifyRequestSchema.safeParse({
        email: 'user@example.com',
        otpCode: '12345',
        purpose: 'REGISTER_VERIFICATION',
      });
      expect(result.success).toBeFalsy();
    });

    it('should reject non-numeric OTP', () => {
      const result = otpVerifyRequestSchema.safeParse({
        email: 'user@example.com',
        otpCode: '12345A',
        purpose: 'REGISTER_VERIFICATION',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Forgot Password Validation', () => {
    it('should validate valid email', () => {
      const result = forgotPasswordRequestSchema.safeParse({
        email: 'test@domain.com',
      });
      expect(result.success).toBeTruthy();
    });
  });

  describe('Reset Password Form Validation', () => {
    it('should validate matching passwords >= 8 chars', () => {
      const result = resetPasswordFormSchema.safeParse({
        newPassword: 'NewPassword123@',
        confirmPassword: 'NewPassword123@',
      });
      expect(result.success).toBeTruthy();
    });

    it('should reject mismatched passwords', () => {
      const result = resetPasswordFormSchema.safeParse({
        newPassword: 'NewPassword123@',
        confirmPassword: 'DifferentPassword123@',
      });
      expect(result.success).toBeFalsy();
    });
  });
});
