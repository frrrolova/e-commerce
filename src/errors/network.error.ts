import { ResponseErrorMessages } from '@/enums/responseErrors.enum';

class NetworkError extends Error {
  public body = {
    errors: [
      {
        message: ResponseErrorMessages.NO_INTERNET,
      },
    ],
  };

  constructor() {
    super();
    this.name = 'NetworkError';
    this.message = ResponseErrorMessages.NO_INTERNET;
  }
}

export default NetworkError;
