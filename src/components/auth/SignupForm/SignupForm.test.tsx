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
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
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
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('이미 존재하는 이메일이면 에러 메시지를 표시한다', async () => {
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
});
