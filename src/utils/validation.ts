import type { ServiceRequest } from '../types/index.ts';

export interface ValidationErrors {
  [field: string]: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequest(
  input: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>,
): ValidationErrors {
  const errors: ValidationErrors = {};
  if (input.name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!emailRe.test(input.email.trim())) errors.email = 'Enter a valid email address.';
  if (input.company.trim().length < 2) errors.company = 'Company is required.';
  if (!input.service) errors.service = 'Choose a service.';
  if (!input.budget) errors.budget = 'Select a budget range.';
  if (input.message.trim().length < 12)
    errors.message = 'Tell us a little more (min 12 characters).';
  return errors;
}

export function validateContact(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  if (input.name.trim().length < 2) errors.name = 'Name is required.';
  if (!emailRe.test(input.email.trim())) errors.email = 'Enter a valid email.';
  if (input.subject.trim().length < 3) errors.subject = 'Subject is required.';
  if (input.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.';
  return errors;
}
