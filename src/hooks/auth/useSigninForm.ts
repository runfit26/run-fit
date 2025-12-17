'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSignin } from '@/api/mutations/authMutations';
import {
  signinSchema,
  type SigninFormValues,
} from '@/lib/validations/auth/signinSchema';
import type { UseAuthFormOptions } from './types';

export function useSigninForm(options: UseAuthFormOptions) {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const mutation = useSignin();

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
