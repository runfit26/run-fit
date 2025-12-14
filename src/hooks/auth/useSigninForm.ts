'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { postSignin } from '@/api/auth';
import {
  SigninFormValues,
  signinSchema,
} from '@/lib/validations/auth/signinSchema';
import type { ResponseErrorData } from '@/types';

export function useSigninForm() {
  const router = useRouter();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  // const signinMutation = useSigninMutation();
  const mutation = useMutation({
    mutationFn: postSignin,
    onSuccess: () => {
      router.push('/');
    },
    onError: ({ error }: ResponseErrorData) => {
      switch (error.code) {
        case 'INVALID_CREDENTIALS':
          form.setError('root', {
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
          break;

        default:
          form.setError('root', {
            message: '로그인 중 오류가 발생했습니다.',
          });
      }
    },
  });

  const submit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    form,
    submit,
    isPending: mutation.isPending,
  };
}
