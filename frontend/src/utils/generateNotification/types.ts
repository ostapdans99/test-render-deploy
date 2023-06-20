import { ToastContent, ToastOptions } from 'react-toastify';

export interface IGenerateNotificationArgs {
  type: 'info' | 'success' | 'warn' | 'error' | 'default';
  content: ToastContent<string>;
  options?: ToastOptions;
}
