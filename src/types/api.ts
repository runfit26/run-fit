export type ResponseData<T, E extends ResponseError> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: E;
    };

export interface ResponseError {
  code: string;
  message: string;
}

export type PaginationQueryParams = {
  page?: number;
  size?: number;
};
