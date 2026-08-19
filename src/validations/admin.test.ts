import { describe, expect, it } from 'vitest';
import {
  adminBannerSchema,
  adminCategoryHomeConfigSchema,
  adminCategorySchema,
  adminDailyArrivalSchema,
  adminLoginSchema,
  adminProductComboConfigSchema,
  adminProductSchema,
  adminRoleSchema,
  adminStockAdjustmentSchema,
  adminUserRoleAssignSchema,
} from '@/validations/admin';

describe('Admin Validations', () => {
  describe('Admin Login Validation', () => {
    it('should validate valid admin login payload', () => {
      const result = adminLoginSchema.safeParse({
        email: 'admin@seafood.vn',
        password: 'AdminPassword123@',
      });
      expect(result.success).toBeTruthy();
    });

    it('should reject invalid email format', () => {
      const result = adminLoginSchema.safeParse({
        email: 'not-an-email',
        password: 'password',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Admin Product Validation', () => {
    it('should validate correct product creation payload', () => {
      const result = adminProductSchema.safeParse({
        name: 'Cua Gạch Cà Mau',
        price: 450_000,
        stock: 20,
        categoryId: 1,
        unit: 'kg',
        productType: 'REGULAR',
      });
      expect(result.success).toBeTruthy();
    });

    it('should reject product price less than 1000', () => {
      const result = adminProductSchema.safeParse({
        name: 'Cua Gạch',
        price: 500,
        stock: 10,
        categoryId: 1,
        productType: 'REGULAR',
      });
      expect(result.success).toBeFalsy();
    });

    it('should reject negative stock value', () => {
      const result = adminProductSchema.safeParse({
        name: 'Tôm Sú',
        price: 300_000,
        stock: -5,
        categoryId: 2,
        productType: 'REGULAR',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Admin Category & Bento Home Config Validation', () => {
    it('should validate valid category payload', () => {
      const result = adminCategorySchema.safeParse({
        name: 'Tôm & Cua',
        description: 'Các loại tôm cua tươi sống',
        active: true,
      });
      expect(result.success).toBeTruthy();
    });

    it('should validate bento home config payload', () => {
      const result = adminCategoryHomeConfigSchema.safeParse({
        badge: 'BÁN CHẠY #1',
        badgeType: 'hot',
        iconName: 'fish',
        homeDisplayStyle: 'main',
        homeSortOrder: 1,
        homeIsActive: true,
      });
      expect(result.success).toBeTruthy();
    });
  });

  describe('Admin Banner & Daily Arrival Validation', () => {
    it('should validate banner payload', () => {
      const result = adminBannerSchema.safeParse({
        title: 'Hải Sản Tươi Sống Hôm Nay',
        sortOrder: 1,
        isActive: true,
      });
      expect(result.success).toBeTruthy();
    });

    it('should validate daily arrival payload', () => {
      const result = adminDailyArrivalSchema.safeParse({
        productId: 5,
        arrivalDate: '2026-08-17',
        title: 'Cập bến cảng Phan Thiết',
      });
      expect(result.success).toBeTruthy();
    });

    it('should validate stock adjustment schema', () => {
      const result = adminStockAdjustmentSchema.safeParse({
        quantity: 15,
        action: 'increase',
      });
      expect(result.success).toBeTruthy();
    });
  });

  describe('Admin Combo Config & RBAC Validation', () => {
    it('should validate product combo config schema', () => {
      const result = adminProductComboConfigSchema.safeParse({
        comboCategory: 'COMBO TIỆC GIA ĐÌNH',
        comboTheme: 'dark',
        comboTag: 'TIẾT KIỆM 20%',
        comboCtaText: 'Đặt Set Ngay',
        comboHref: '/combos/set-hoang-gia',
        isBreakout: false,
        comboSortOrder: 1,
      });
      expect(result.success).toBeTruthy();
    });

    it('should validate role schema', () => {
      const result = adminRoleSchema.safeParse({
        name: 'ROLE_MODERATOR',
        description: 'Kiểm duyệt viên nội dung',
      });
      expect(result.success).toBeTruthy();
    });

    it('should validate user role assign schema', () => {
      const result = adminUserRoleAssignSchema.safeParse({
        roleIds: [1, 2],
      });
      expect(result.success).toBeTruthy();
    });
  });
});
