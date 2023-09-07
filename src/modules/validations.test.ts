import { validateEmail, validateMatchField, validatePassword, validatePhone } from './validations';

describe('validateEmail', () => {
  it('should validate properly', () => {
    expect(validateEmail('test@example.com')).toBeTrue();
    expect(validateEmail('test@example')).toBe('Invalid email address');
  });
});

describe('validateMatchField', () => {
  it('should validate properly', () => {
    expect(validateMatchField('test', 'test')).toBeTrue();
    expect(validateMatchField('test', 'test2')).toBe("Confirmation doesn't match");
  });
});

describe('validatePassword', () => {
  it('should validate properly', () => {
    expect(validatePassword('1234')).toBe('Password must be at least 6 characters long');
    expect(validatePassword('123456')).toBe(
      'Password must have at least 1 number, 1 lowercase, 1 uppercase and 1 special character',
    );
    expect(validatePassword('123456Aa@')).toBeTrue();
    expect(
      validatePassword('123456Aa@', {
        minLength: 16,
        minLengthMessage: 'Password must be at least 16 characters long',
      }),
    ).toBe('Password must be at least 16 characters long');
  });
});

describe('validatePhone', () => {
  it('should validate properly', () => {
    expect(validatePhone()).toBeUndefined();
    expect(validatePhone('123')).toBe('Invalid phone');
    expect(validatePhone('1234567890')).toBeTrue();
  });
});
