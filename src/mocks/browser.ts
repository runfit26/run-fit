import { setupWorker } from 'msw/browser';

import { postsHandlers } from '@/mocks/handlers/posts';

export const worker = setupWorker(...postsHandlers);
