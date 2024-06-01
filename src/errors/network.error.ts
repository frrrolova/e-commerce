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
  }
}

export default NetworkError;
