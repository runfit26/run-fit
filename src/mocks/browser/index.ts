import { setupWorker } from 'msw/browser';
import { createPath } from '../core/path';
import { authHandlers } from '../handlers/auth';
import { bypassHandlers } from '../handlers/bypass';
import { createCrewHandlers } from '../handlers/crew';
import { createReviewHandlers } from '../handlers/review';
import { createSessionHandlers } from '../handlers/session';
import { createUserHandlers } from '../handlers/user';

const layer = 'proxy' as const;
const authMode = 'bypass' as const;
const p = createPath(layer, '');

// export const worker = setupWorker(...createMembershipHandlers(p, authMode));
export const worker = setupWorker(
  ...authHandlers,
  ...bypassHandlers,
  ...createCrewHandlers(p, authMode),
  ...createReviewHandlers(p, authMode),
  ...createSessionHandlers(p, authMode),
  ...createUserHandlers(p, authMode)
);
