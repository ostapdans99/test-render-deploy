import { toast } from 'react-toastify';

import { IGenerateNotificationArgs } from './types';

export const generateNotification = ({ type, content, options }: IGenerateNotificationArgs) =>
  type === 'default' ? toast(content, options) : toast[type](content, options);
