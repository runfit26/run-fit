import '@testing-library/jest-dom';

import { server } from '@/mocks/index';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
