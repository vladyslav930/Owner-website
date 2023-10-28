import { ChangeDetectionStrategy, Component } from '@angular/core';

import { OwnerStatus } from '../../../shared/constants/owner-status.constant';
import { UsersBase } from '../../classes/users-base.class';

@Component({
  selector: 'o-mobile-users',
  templateUrl: './mobile-users.component.pug',
  styleUrls: ['./mobile-users.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileUsersComponent extends UsersBase {
  getOwnerStatus(status: OwnerStatus): string {
    switch (status) {
      case OwnerStatus.Active:
      case OwnerStatus.Disabled:
      case OwnerStatus.Pending:
      case OwnerStatus.Undefined:
        return status.split('_').join('-').toLocaleLowerCase();
      default:
        throw new Error('Unexpected owner status!');
    }
  }
}
