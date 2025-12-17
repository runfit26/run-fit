'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSignup } from '@/api/mutations/authMutations';
import {
  signupSchema,
  type SignupFormValues,
} from '@/lib/validations/auth/signupSchema';
import type { UseAuthFormOptions } from './types';

export function useSignupForm(options: UseAuthFormOptions) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const mutation = useSignup();

  const submit = form.handleSubmit((values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        options?.onSuccess?.();
      },
      onError: (error) => {
        options?.onError?.(error.message);

        form.setError('root', {
          message: error.message,
        });

        form.reset();
      },
    });
  });

  return {
    form,
    submit,
    isPending: mutation.isPending,
  };
}
