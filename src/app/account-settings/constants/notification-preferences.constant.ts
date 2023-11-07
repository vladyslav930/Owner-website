import { MyndOrder } from '@myndmanagement/common';
import { IMyndOption, myndMapToOptions } from '@myndmanagement/forms';

import { sortArray } from '../../shared/utils/array-fns';
import { INotificationPreferences, NotificationPreferences } from '../interfaces/notification-preferences.interface';

import {
  GeneralNotificationPreference,
  LeasingNotificationPreference,
  ServiceRequestNotificationPreference,
} from './notification-preference.constant';

const leasingNotificationPreferencesMap = new Map<LeasingNotificationPreference, string>([
  [LeasingNotificationPreference.ApplicationApproved, 'Application approved'],
  [LeasingNotificationPreference.InspectionPassed, 'Inspection passed'],
  [LeasingNotificationPreference.LateRent, 'Late rent'],
  [LeasingNotificationPreference.LeaseRenewed, 'Lease renewed'],
  [LeasingNotificationPreference.MoveInCompleted, 'Move in completed'],
  [LeasingNotificationPreference.NoticeToVacateSubmitted, 'Notice to vacate'],
  [LeasingNotificationPreference.SecurityDepositPaid, 'Security deposit received'],
  [LeasingNotificationPreference.UnitLeased, 'Unit leased'],
  [LeasingNotificationPreference.UnitListed, 'Unit listed to show'],
]);

const serviceRequestPreferencesMap = new Map<ServiceRequestNotificationPreference, string>([
  [ServiceRequestNotificationPreference.ServiceRequestAssigned, 'Service request assigned'],
  [ServiceRequestNotificationPreference.ServiceRequestCompleted, 'Service request completed'],
]);

const generalPreferencesMap = new Map<GeneralNotificationPreference, string>([
  [GeneralNotificationPreference.ContributionRequestCreated, 'Contribution updates'],
  [GeneralNotificationPreference.ApprovalCreated, 'Approval request created'],
  [GeneralNotificationPreference.ApprovalStatusUpdated, 'Approval status updated'],
]);

const leasingNotifications: IMyndOption[] = sortArray(
  myndMapToOptions(leasingNotificationPreferencesMap),
  'value',
  MyndOrder.Asc,
);

const generalNotifications: IMyndOption[] = sortArray(
  myndMapToOptions(generalPreferencesMap),
  'value',
  MyndOrder.Asc,
);

const serviceRequestNotifications: IMyndOption[] = sortArray(
  myndMapToOptions(serviceRequestPreferencesMap),
  'value',
  MyndOrder.Asc,
);

export const notificationPreferences: INotificationPreferences[] = [
  {
    label: 'Leasing notifications',
    key: NotificationPreferences.Leasing,
    notificationTypes: leasingNotifications,
  },
  {
    label: 'Service request notifications',
    key: NotificationPreferences.ServiceRequests,
    notificationTypes: serviceRequestNotifications,
  },
  {
    label: 'General notifications',
    key: NotificationPreferences.General,
    notificationTypes: generalNotifications,
  },
];
