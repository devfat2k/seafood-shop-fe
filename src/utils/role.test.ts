import { describe, expect, it } from 'vitest';
import { hasAdminRole } from './role';

describe('hasAdminRole helper', () => {
  it('should return true for ROLE_ADMIN string array', () => {
    expect(hasAdminRole(['ROLE_ADMIN'])).toBeTruthy();
    expect(hasAdminRole(['ROLE_USER', 'ROLE_ADMIN'])).toBeTruthy();
  });

  it('should return true for ADMIN string array (without ROLE_ prefix)', () => {
    expect(hasAdminRole(['ADMIN'])).toBeTruthy();
    expect(hasAdminRole(['USER', 'ADMIN'])).toBeTruthy();
    expect(hasAdminRole(['admin'])).toBeTruthy();
  });

  it('should return true for SUPER_ADMIN or MANAGER', () => {
    expect(hasAdminRole(['SUPER_ADMIN'])).toBeTruthy();
    expect(hasAdminRole(['ROLE_SUPER_ADMIN'])).toBeTruthy();
    expect(hasAdminRole(['ROLE_MANAGER'])).toBeTruthy();
    expect(hasAdminRole(['STAFF'])).toBeTruthy();
  });

  it('should return true for single string role', () => {
    expect(hasAdminRole('ROLE_ADMIN')).toBeTruthy();
    expect(hasAdminRole('admin')).toBeTruthy();
    expect(hasAdminRole('ADMIN')).toBeTruthy();
  });

  it('should return true for object roles', () => {
    expect(hasAdminRole([{ name: 'ROLE_ADMIN' }])).toBeTruthy();
    expect(hasAdminRole([{ name: 'ADMIN' }])).toBeTruthy();
    expect(hasAdminRole([{ roleName: 'admin' }])).toBeTruthy();
    expect(hasAdminRole([{ code: 'ROLE_ADMIN' }])).toBeTruthy();
  });

  it('should return false for non-admin roles', () => {
    expect(hasAdminRole(['ROLE_CUSTOMER'])).toBeFalsy();
    expect(hasAdminRole(['USER'])).toBeFalsy();
    expect(hasAdminRole([])).toBeFalsy();
    expect(hasAdminRole(null)).toBeFalsy();
    expect(hasAdminRole()).toBeFalsy();
  });
});
