import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MyndOrder } from '@myndmanagement/common';
import { MyndButtonColors } from '@myndmanagement/forms-v2/button';
import { MyndModalDialogService } from '@myndmanagement/modals';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ownerStatusColor } from '../../../shared/constants/owner-status.constant';
import { EntityRolePermission } from '../../../shared/constants/permissions.constant';
import { IOwner } from '../../../shared/interfaces/owner.interface';
import { ModalDialogConfirmService } from '../../../shared/services/modal-dialog-confirm.service';
import { selectOwnerId } from '../../../shared/store/selectors/auth.selectors';
import { trackByEntityRole, trackByOwner } from '../../../shared/utils/track-by-utils';
import { UsersBase } from '../../classes/users-base.class';
import { accountSettingsHeaderPortalSlotId } from '../../constants/account-settings.constant';
import { OwnersSortKey, sortableUserColumns, usersColumns } from '../../constants/users.constant';
import { resendInvite, sortOwners } from '../../store/actions/users.actions';
import { AccountSettingsFeatureStoreType } from '../../store/reducers';
import { selectShowActionsColumn, selectUsersSort } from '../../store/selectors/users.selectors';
import { NewUserOverlayComponent } from '../new-user-overlay/new-user-overlay.component';

@Component({
  selector: 'o-users',
  templateUrl: './users.component.pug',
  styleUrls: ['./users.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent extends UsersBase {
  readonly columns = usersColumns;
  readonly sortableUserColumns = sortableUserColumns;
  readonly MyndOrder = MyndOrder;
  readonly ownerStatusColor = ownerStatusColor;
  readonly accountSettingsHeaderPortalSlotId = accountSettingsHeaderPortalSlotId;
  readonly sort$ = this.store.select(selectUsersSort);
  readonly showActionsColumn$: Observable<boolean> = this.store.select(selectShowActionsColumn);

  readonly MyndButtonColors = MyndButtonColors;
  readonly EntityRolePermission = EntityRolePermission;
  readonly trackByOwner = trackByOwner;
  readonly trackByEntityRole = trackByEntityRole;
  readonly currentOwnerId$ = this.store.select(selectOwnerId);

  constructor(
    protected store: Store<AccountSettingsFeatureStoreType>,
    private modalDialogService: MyndModalDialogService,
    modalDialogConfirmService: ModalDialogConfirmService,
  ) {
    super(store, modalDialogConfirmService);
  }

  resendInvite(owner: IOwner): void {
    this.store.dispatch(resendInvite({
      payload: {
        ownerId: owner.ownerId,
        email: owner.email,
      },
    }));
  }

  sortOwners(key: OwnersSortKey): void {
    this.store.dispatch(sortOwners({ key }));
  }

  openAddUserModal(): void {
    this.modalDialogService.open(NewUserOverlayComponent, {
      panelClass: ['o-new-user-overlay-pane'],
    });
  }
}
