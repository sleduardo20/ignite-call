import { toast } from 'react-toastify';
import { notification } from '..';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

describe('Notification Component', () => {
  const toastErrorMock = toast.error as jest.Mock;
  const toastSuccessMock = toast.success as jest.Mock;
  const toastInfoMock = toast.info as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.error with the correct message', () => {
    const errorMessage = 'Something went wrong';
    notification.error(errorMessage);
    expect(toastErrorMock).toHaveBeenCalledWith(
      errorMessage,
      expect.any(Object),
    );
  });

  it('should call toast.success with the correct message', () => {
    const successMessage = 'Action completed successfully';
    notification.success(successMessage);
    expect(toastSuccessMock).toHaveBeenCalledWith(
      successMessage,
      expect.any(Object),
    );
  });

  it('should call toast.info with the correct message', () => {
    const infoMessage = 'New notification';
    notification.notify(infoMessage);
    expect(toastInfoMock).toHaveBeenCalledWith(infoMessage, expect.any(Object));
  });
});
