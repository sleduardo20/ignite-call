import { toast } from 'react-toastify';
import { notification } from '..';

jest.mock('react-toastify');

describe('Notification Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.error with the correct message', () => {
    const errorMessage = 'Something went wrong';
    notification.error(errorMessage);
    expect(toast.error).toHaveBeenCalledWith(errorMessage, expect.any(Object));
  });

  it('should call toast.success with the correct message', () => {
    const successMessage = 'Action completed successfully';
    notification.success(successMessage);
    expect(toast.success).toHaveBeenCalledWith(
      successMessage,
      expect.any(Object),
    );
  });

  it('should call toast.info with the correct message', () => {
    const infoMessage = 'New notification';
    notification.notify(infoMessage);
    expect(toast.info).toHaveBeenCalledWith(infoMessage, expect.any(Object));
  });
});
