import { randomUUID } from 'crypto';

export const REQUEST_ID_HEADER = 'x-request-id';

export function generateRequestId() {
  return randomUUID();
}
