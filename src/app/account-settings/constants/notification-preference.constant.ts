export enum LeasingNotificationPreference {
  NoticeToVacateSubmitted = 'NOTICE_TO_VACATE_SUBMITTED',
  MoveInCompleted = 'MOVE_IN_COMPLETED',
  UnitLeased = 'UNIT_LEASED',
  ApplicationApproved = 'APPLICATION_APPROVED',
  InspectionPassed = 'INSPECTION_PASSED',
  LeaseRenewed = 'LEASE_RENEWED',
  LateRent = 'LATE_RENT',
  SecurityDepositPaid = 'SECURITY_DEPOSIT_PAID',
  UnitListed = 'UNIT_LISTED',
}

export enum ServiceRequestNotificationPreference {
  ServiceRequestAssigned = 'SERVICE_REQUEST_ASSIGNED',
  ServiceRequestCompleted = 'SERVICE_REQUEST_COMPLETED',
}

export enum GeneralNotificationPreference {
  ContributionRequestCreated = 'CONTRIBUTION_REQUEST_CREATED',
  ApprovalCreated = 'APPROVAL_CREATED',
  ApprovalStatusUpdated = 'APPROVAL_STATUS_UPDATED',
}

export type NotificationPreference =
  | LeasingNotificationPreference
  | ServiceRequestNotificationPreference
  | GeneralNotificationPreference;
