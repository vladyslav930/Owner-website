import { IMyndOption } from '@myndmanagement/forms';

import { PartialConfirmModalDialogData } from '../../shared/interfaces/modal-confirm-params.interface';

export type OwnersSortKey = 'name' | 'entity' | 'role' | 'status';

export const usersColumns: IMyndOption<OwnersSortKey>[] = [
  {
    key: 'name',
    value: 'Name',
  },
  {
    key: 'entity',
    value: 'Entity',
  },
  {
    key: 'role',
    value: 'Role',
  },
  {
    key: 'status',
    value: 'Status',
  },
];

export const sortableUserColumns = new Set(['name', 'status']);

export const deleteOwnerConfirmModalData = (isConfirmLoading$): PartialConfirmModalDialogData => ({
  isConfirmLoading$,
  title: 'REMOVE USER',
  cancelButton: 'Cancel',
  confirmButton: 'Yes, Remove User',
  isNegative: true,
  description: [
    'Are you sure you would like to remove this user from this Mynd Owner Portal account?',
    'The user will lose access the online portal, the mobile app and will cease receiving any notifications and reports by email and SMS.',
  ],
});
