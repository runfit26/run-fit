import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import SignupForm from '.';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('SignupForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('이미 존재하는 이메일이면 에러 메시지를 표시한다', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        data: null,
        error: {
          code: 'ALREADY_EXISTS_EMAIL',
          message: '이미 사용중인 이메일입니다.',
        },
      }),
    } as Response);

    renderWithProviders(<SignupForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('이름'), {
      target: { value: '홍길동' },
    });

    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    expect(
      await screen.findByText('이미 사용중인 이메일입니다.')
    ).toBeInTheDocument();
  });

  it('서버 VALIDATION_ERROR 발생 시 루트 에러 메시지를 표시한다', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        data: null,
        error: {
          code: 'VALIDATION_ERROR',
          message: '요청 데이터가 유효하지 않습니다.',
        },
      }),
    } as Response);

    renderWithProviders(<SignupForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('이름'), {
      target: { value: '홍길동' },
    });

    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    expect(
      await screen.findByText('요청 데이터가 유효하지 않습니다.')
    ).toBeInTheDocument();
  });

  it('비밀번호와 비밀번호 확인이 다르면 API 요청을 보내지 않는다', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');

    renderWithProviders(<SignupForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: 'password456' },
    });
    fireEvent.change(screen.getByLabelText('이름'), {
      target: { value: '홍길동' },
    });

    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    expect(
      await screen.findByText('비밀번호가 일치하지 않습니다.')
    ).toBeInTheDocument();

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
