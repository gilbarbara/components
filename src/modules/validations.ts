import { isValidEmail, validatePassword as checkPassword } from '@gilbarbara/helpers';

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

export function validatePassword(value: string) {
  try {
    checkPassword(value);

    return true;
  } catch (error: any) {
    return error.message;
  }
}

/**
 * Validate phone
 */
export function validatePhoneBR(value?: string) {
  if (!value) {
    return undefined;
  }

  return /^\d{10,11}$/.test(clearNumber(value)) || 'Invalid phone';
}
