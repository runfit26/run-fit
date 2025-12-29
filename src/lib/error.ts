export type ApiErrorOptions = {
  message: string;
  status: number;
  code?: string;
};

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor({ message, status, code }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}
