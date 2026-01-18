import { Input } from '@/shared/ui/input';
import { validateField } from '@/widgets/form/lib/validateField.ts';

import React from 'react';

import { useForm } from '../lib/useForm.ts';
import styles from './Form.module.css';

export const Form = () => {
  const { formData, setFormData, errors, setErrors } = useForm();
  const [submitted, setSubmitted] = React.useState(false);
  const [isShaking, setIsShaking] = React.useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);

  const validateAll = React.useCallback(() => {
    const nextErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };

    setErrors(nextErrors);
    return nextErrors;
  }, [formData.email, formData.firstName, formData.lastName, formData.password, setErrors]);

  const focusFirstInvalid = (nextErrors: Record<string, string>) => {
    const order = ['firstName', 'lastName', 'email', 'password'] as const;
    const firstInvalid = order.find((key) => !!nextErrors[key]);
    if (!firstInvalid) return;

    const el = document.getElementById(firstInvalid);
    if (el && 'focus' in el) {
      (el as HTMLInputElement).focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!hasTriedSubmit) return;

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!hasTriedSubmit) return;

    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    const nextErrors = validateAll();
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setIsShaking(true);
      window.setTimeout(() => setIsShaking(false), 420);
      focusFirstInvalid(nextErrors);
      return;
    }

    const mailerUrl = '/IntroComponentWithSignupForm/send';

    setSending(true);
    setSendError(null);

    void (async () => {
      try {
        const payload = {
          to: formData.email,
          subject: 'Intro signup form',
          text: `New signup form submission:\n\nFirst name: ${formData.firstName}\nLast name: ${formData.lastName}\nEmail: ${formData.email}`,
        };

        const res = await fetch(mailerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `HTTP ${res.status}`);
        }

        setSubmitted(true);
      } catch (err) {
        setSendError(err instanceof Error ? 'Error: Mailer not connected to Vercel' : 'Ошибка отправки.');
        setIsShaking(true);
        window.setTimeout(() => setIsShaking(false), 420);
      } finally {
        setSending(false);
      }
    })();
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    setSubmitted(false);
    setHasTriedSubmit(false);
    setSendError(null);
  };

  return (
    <section className={styles.form}>
      <h2 className={styles.formHeader}>
        <span>Try it free 7 days</span> then $20/mo. thereafter
      </h2>
      <form onSubmit={handleSubmit} noValidate className={isShaking ? styles.shake : undefined}>
        <Input
          name="firstName"
          placeholder="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasTriedSubmit ? errors.firstName : ''}
          autoComplete="given-name"
          required
          disabled={submitted || sending}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasTriedSubmit ? errors.lastName : ''}
          autoComplete="family-name"
          required
          disabled={submitted || sending}
        />
        <Input
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasTriedSubmit ? errors.email : ''}
          autoComplete="email"
          required
          disabled={submitted || sending}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={hasTriedSubmit ? errors.password : ''}
          autoComplete="new-password"
          required
          disabled={submitted || sending}
        />
        <Input
          value={submitted ? 'Submitted' : sending ? 'Sending...' : 'Claim your free trial'}
          type="submit"
          disabled={submitted || sending}
        />
        {submitted && !sending && (
          <button type="button" onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        )}
        <p className={styles.formText}>
          By clicking the button, you are agreeing to our <span>Terms and Services</span>
        </p>
        {sendError && <p className={styles.errorText}>{sendError}</p>}
        {submitted && <p className={styles.successText}>Thank you! Your demo submission was received.</p>}
      </form>
    </section>
  );
};
