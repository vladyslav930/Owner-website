import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { humanEntityRole, selectableEntityRoles } from '../../../entities/constants/entity-role.constant';
import { IEntity } from '../../../entities/interfaces/entity.interface';
import { selectEntitiesWithManageOwnerRoles } from '../../../entities/store/entities.selectors';
import { IInviteRequest } from '../../../shared/services/api/dto/invite-request.interface';
import { markFormControlsAsDirty } from '../../../shared/utils/form-group-fns';
import { trackByEntity } from '../../../shared/utils/track-by-utils';
import { invite } from '../../store/actions/users.actions';
import { AccountSettingsFeatureStoreType } from '../../store/reducers';
import { selectInviteInProgress } from '../../store/selectors/users.selectors';

@Component({
  selector: 'o-new-user-overlay',
  templateUrl: './new-user-overlay.component.pug',
  styleUrls: ['./new-user-overlay.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserOverlayComponent {
  @ViewChild('formElement', { static: true }) formElement: FormGroupDirective;

  readonly form: FormGroup = this.createForm();
  readonly selectableEntityRoles = selectableEntityRoles;
  readonly humanEntityRole = humanEntityRole;
  readonly inviteInProgress$ = this.store.select(selectInviteInProgress);
  readonly entities$: Observable<IEntity[]> = this.store.select(selectEntitiesWithManageOwnerRoles);
  readonly trackByEntity = trackByEntity;

  constructor(
    private store: Store<AccountSettingsFeatureStoreType>,
    private formBuilder: FormBuilder,
  ) {}

  inviteUser(): void {
    markFormControlsAsDirty(this.form, { touched: true, dirty: true });
    this.formElement.onSubmit(null);

    if (this.form.valid) {
      const { entityIds, email, role } = this.form.getRawValue();

      const payload: IInviteRequest = {
        email,
        roles: entityIds.map(entityId => ({ entityId, role })),
      };

      this.store.dispatch(invite({ payload }));
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      entityIds: [[], Validators.compose([Validators.required, Validators.minLength(1)])],
      role: [[], Validators.required],
    });
  }
}
