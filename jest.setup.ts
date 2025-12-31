import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

globalThis.jest = jest;

// next/navigation mock
export const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

if (process.env.NEXT_PUBLIC_USE_MSW === 'true') {
  beforeAll(async () => {
    const { server } = await import('@/mocks/jest');
    server.listen();

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
  });
}
