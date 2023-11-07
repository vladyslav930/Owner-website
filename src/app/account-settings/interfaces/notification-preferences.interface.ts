import { IMyndOption } from '@myndmanagement/forms';

import { NotificationPreference } from '../constants/notification-preference.constant';

export enum NotificationPreferences {
  Leasing = 'leasing',
  ServiceRequests = 'service-requests',
  General = 'general',
}

export interface INotificationPreferences {
  label: string;
  key: NotificationPreferences;
  notificationTypes: IMyndOption[];
}

export interface INotificationPreference {
  notificationType: NotificationPreference;
  notifyByEmail: boolean;
  notifyBySms: boolean;
}
