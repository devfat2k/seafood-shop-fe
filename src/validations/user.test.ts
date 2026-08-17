import { describe, expect, it } from 'vitest';
import { addressFormSchema, changePasswordSchema, updateProfileSchema } from '@/validations/user';

describe('User & Address Validation Schemas', () => {
  describe('addressFormSchema validation rules', () => {
    it('should validate a valid address', () => {
      const validData = {
        recipientName: 'Nguyễn Văn A',
        phone: '0912345678',
        province: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        addressDetail: '123 Đường Lê Lợi',
        tag: 'Nhà Riêng',
        defaultAddress: true,
      };
      const result = addressFormSchema.safeParse(validData);
      expect(result.success).toBeTruthy();
    });

    it('should fail when recipientName is empty or phone is invalid', () => {
      const invalidData = {
        recipientName: '',
        phone: '12345',
        province: '',
        district: '',
        ward: '',
        addressDetail: '12',
        tag: 'Nhà Riêng',
        defaultAddress: false,
      };
      const result = addressFormSchema.safeParse(invalidData);
      expect(result.success).toBeFalsy();
    });
  });

  describe('changePasswordSchema validation rules', () => {
    it('should validate when passwords match and are long enough', () => {
      const validData = {
        oldPassword: 'currentPassword123',
        newPassword: 'newSecretPassword123',
        confirmPassword: 'newSecretPassword123',
      };
      const result = changePasswordSchema.safeParse(validData);
      expect(result.success).toBeTruthy();
    });

    it('should fail when passwords do not match', () => {
      const invalidData = {
        oldPassword: 'currentPassword123',
        newPassword: 'newSecretPassword123',
        confirmPassword: 'mismatchPassword',
      };
      const result = changePasswordSchema.safeParse(invalidData);
      expect(result.success).toBeFalsy();
      expect(result.error?.issues[0]?.message).toContain('không khớp');
    });
  });

  describe('updateProfileSchema validation rules', () => {
    it('should validate valid profile data', () => {
      const validData = {
        fullName: 'Nguyễn Văn Hải',
        phone: '0987654321',
        avatarUrl: 'https://example.com/avatar.jpg',
      };
      const result = updateProfileSchema.safeParse(validData);
      expect(result.success).toBeTruthy();
    });

    it('should fail when fullName is too short', () => {
      const invalidData = {
        fullName: 'A',
      };
      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBeFalsy();
    });
  });
});
