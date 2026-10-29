// Feature: react-migration
// Property 10: Newsletter rejects empty and whitespace-only email — Validates: Requirements 11.3
// Property 11: Newsletter rejects invalid email formats — Validates: Requirements 11.4
// Property 12: Newsletter accepts valid email and clears input — Validates: Requirements 11.5

import { describe, it } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import Newsletter from '../Newsletter';

// Shared helper: render a fresh Newsletter, type a value into the email input, submit.
function submitNewsletter(emailValue) {
  cleanup(); // ensure a clean DOM between property iterations
  render(<Newsletter />);

  const input = screen.getByPlaceholderText(/your email address/i);
  const button = screen.getByRole('button', { name: /sign up/i });

  fireEvent.change(input, { target: { value: emailValue } });
  fireEvent.click(button);

  return { input };
}

// ---------------------------------------------------------------------------
// Property 10 — rejects empty / whitespace-only email
// ---------------------------------------------------------------------------
describe('Property 10: Newsletter rejects empty and whitespace-only email', () => {
  it('shows "required" error and no success for any whitespace-only (or empty) string', () => {
    fc.assert(
      fc.property(
        // Produce strings that contain only whitespace chars (including "")
        fc.string().map(s => s.replace(/[^\s]/g, '')),
        (whitespaceEmail) => {
          submitNewsletter(whitespaceEmail);

          // Error message must be visible
          const errorEl = document.querySelector('.newsletter-error');
          expect(errorEl).not.toBeNull();
          expect(errorEl.textContent.toLowerCase()).toContain('required');

          // Success message must NOT be present
          const successEl = document.querySelector('.newsletter-success');
          expect(successEl).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 11 — rejects invalid email formats
// ---------------------------------------------------------------------------
describe('Property 11: Newsletter rejects invalid email formats', () => {
  it('shows a format error and no success for any non-empty string that fails the email regex', () => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fc.assert(
      fc.property(
        // Non-empty strings that do not pass the email regex AND are not purely whitespace
        fc
          .string({ minLength: 1 })
          .filter(s => s.trim() !== '' && !EMAIL_REGEX.test(s)),
        (invalidEmail) => {
          submitNewsletter(invalidEmail);

          // Error message must be visible
          const errorEl = document.querySelector('.newsletter-error');
          expect(errorEl).not.toBeNull();
          expect(errorEl.textContent.toLowerCase()).toContain('valid email');

          // Success message must NOT be present
          const successEl = document.querySelector('.newsletter-success');
          expect(successEl).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 12 — accepts valid email and clears input
// ---------------------------------------------------------------------------
describe('Property 12: Newsletter accepts valid email and clears input', () => {
  it('shows success message and clears the input for any valid email address', () => {
    fc.assert(
      fc.property(
        // fast-check built-in generates RFC-compliant email addresses
        fc.emailAddress(),
        (validEmail) => {
          const { input } = submitNewsletter(validEmail);

          // Success message must be visible
          const successEl = document.querySelector('.newsletter-success');
          expect(successEl).not.toBeNull();

          // No error message
          const errorEl = document.querySelector('.newsletter-error');
          expect(errorEl).toBeNull();

          // Input must be cleared after successful submission
          expect(input.value).toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });
});
