type ErrorResponse = {
  code: number;
  message: string;
};

type SuccessResponse<Data = undefined> = {
  code: number;
  message: string;
  data?: Data;
};

export type { ErrorResponse, SuccessResponse };
