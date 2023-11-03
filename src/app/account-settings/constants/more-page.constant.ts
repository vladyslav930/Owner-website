export interface INavigationLink {
  label: string;
  hint: string;
  link: string;
}

export const accountSettingsLinks: INavigationLink[] = [
  {
    label: 'Entities',
    hint: 'All entity details',
    link: './entities',
  },
  {
    label: 'Approvals',
    hint: 'Approve, decline, history',
    link: '/dashboard/all/approvals',
  },
  {
    label: 'Service requests',
    hint: 'See your open and closed SRs',
    link: '/properties/service-requests',
  },
  {
    label: 'Users',
    hint: 'Associated users',
    link: './users',
  },
  {
    label: 'Notification settings',
    hint: 'Customize your notification settings',
    link: './notifications',
  },
];
