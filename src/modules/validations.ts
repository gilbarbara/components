import { isValidEmail, validatePassword as validatePasswordHelper } from '@gilbarbara/helpers';

import { ValidatePasswordOptions } from '~/types';

import { clearNumber } from './helpers';

export function validateEmail(value: string) {
  return isValidEmail(value) || 'Invalid email address';
}

export function validateMatchField(
  compare: string,
  value: string,
  message = "Confirmation doesn't match",
) {
  return compare === value || message;
}

export function validatePassword(value: string, options?: ValidatePasswordOptions) {
  try {
    validatePasswordHelper(value, options);

    return true;
  } catch (error: any) {
    return error.message;
  }
}

/**
 * Validate phone
 */
export function validatePhone(value?: string) {
  if (!value) {
    return undefined;
  }

  return /^\d{10,11}$/.test(clearNumber(value)) || 'Invalid phone';
}
