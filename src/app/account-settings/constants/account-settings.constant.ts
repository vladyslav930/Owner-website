export const accountSettingsHeaderPortalSlotId = 'accountSettingsHeaderPortalSlot';

export interface ISideMenuItem {
  label: string;
  routerLink: string;
}

export const sideMenuItems: ISideMenuItem[] = [
  {
    label: 'Profile',
    routerLink: './profile',
  },
  {
    label: 'Entities',
    routerLink: './entities',
  },
  {
    label: 'Approvals',
    routerLink: './approvals',
  },
  {
    label: 'Users',
    routerLink: './users',
  },
  {
    label: 'Notifications',
    routerLink: './notifications',
  },
];
