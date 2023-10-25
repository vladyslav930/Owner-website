import { Directive, OnInit } from '@angular/core';
import { myndTrackByIdentity } from '@myndmanagement/common';
import { Store } from '@ngrx/store';

import { humanEntityRole } from '../../entities/constants/entity-role.constant';
import { selectEntitiesMap } from '../../entities/store/entities.selectors';
import { OwnerStatus, humanOwnerStatus } from '../../shared/constants/owner-status.constant';
import { IOwner } from '../../shared/interfaces/owner.interface';
import { ModalDialogConfirmService } from '../../shared/services/modal-dialog-confirm.service';
import { isMobile } from '../../shared/utils/mobile-detect';
import { deleteOwnerConfirmModalData } from '../constants/users.constant';
import { deleteOwner, loadOwners } from '../store/actions/users.actions';
import { AccountSettingsFeatureStoreType } from '../store/reducers';
import { selectDeletingOwner, selectLoadingOwners, selectSortedOwners } from '../store/selectors/users.selectors';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class UsersBase implements OnInit {
  readonly owners$ = this.store.select(selectSortedOwners);
  readonly isLoadingOwners$ = this.store.select(selectLoadingOwners);
  readonly entitiesMap$ = this.store.select(selectEntitiesMap);
  readonly trackByOwnerId = myndTrackByIdentity<IOwner>('ownerId');
  readonly humanEntityRole = humanEntityRole;
  readonly humanOwnerStatus: Map<OwnerStatus, string> = humanOwnerStatus;
  readonly deleteOwnerConfirmModalData = deleteOwnerConfirmModalData(this.store.select(selectDeletingOwner));

  constructor(
    protected store: Store<AccountSettingsFeatureStoreType>,
    private modalDialogConfirmService: ModalDialogConfirmService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadOwners());
  }

  deleteOwner(owner: IOwner): void {
    this.modalDialogConfirmService
      .openConfirm(this.deleteOwnerConfirmModalData, {
        maxWidth: isMobile ? '95%' : null,
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.dispatch(deleteOwner({ owner }));
        }
      });
  }
}
