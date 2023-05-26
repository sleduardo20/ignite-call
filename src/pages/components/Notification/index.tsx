import { ToastOptions, toast } from 'react-toastify';

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const notification = {
  error: (message: string) => toast.error(message, options),
  success: (message: string) => toast.success(message, options),
  notify: (message: string) => toast.info(message, options),
};
