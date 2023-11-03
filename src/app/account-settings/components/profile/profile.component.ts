import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MyndUnsubscribeService } from '@myndmanagement/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IOwnerDetails } from '../../../shared/interfaces/owner-details.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { selectOwner, selectUser } from '../../../shared/store/selectors/auth.selectors';
import { UpdateEmailService } from '../../services/update-email.service';
import { UpdatePasswordService } from '../../services/update-password.service';
import { UpdatePhoneNumberService } from '../../services/update-phone-number.service';
import { toggleEditEmail, toggleEditPassword, toggleEditPhoneNumber } from '../../store/actions/profile.actions';
import { AccountSettingsFeatureStoreType } from '../../store/reducers';
import {
  selectIsEditingEmail,
  selectIsEditingPassword,
  selectIsEditingPhoneNumber,
} from '../../store/selectors/profile.selectors';

@Component({
  selector: 'o-profile',
  templateUrl: './profile.component.pug',
  styleUrls: ['./profile.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UpdatePasswordService, MyndUnsubscribeService, UpdatePhoneNumberService],
})
export class ProfileComponent {
  readonly isEditingEmail$ = this.store.select(selectIsEditingEmail);
  readonly isEditingPassword$ = this.store.select(selectIsEditingPassword);
  readonly isEditingPhoneNumber$ = this.store.select(selectIsEditingPhoneNumber);
  readonly user$: Observable<IUser> = this.store.select(selectUser);
  readonly owner$: Observable<IOwnerDetails> = this.store.select(selectOwner);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AccountSettingsFeatureStoreType>,
    public updatePasswordService: UpdatePasswordService,
    public updatePhoneNumberService: UpdatePhoneNumberService,
    public updateEmailService: UpdateEmailService,
  ) {}

  editEmail(): void {
    this.store.dispatch(toggleEditEmail());

    this.user$
      .pipe(take(1))
      .subscribe((user) => {
        this.updateEmailService.emailForm.patchValue({ newEmail: user.email });
        this.changeDetectorRef.markForCheck();
      });
  }

  cancelEditEmail(): void {
    this.store.dispatch(toggleEditEmail());
    this.updateEmailService.emailForm.patchValue({ newEmail: '' });
  }

  editPassword(): void {
    this.store.dispatch(toggleEditPassword());
  }

  cancelEditPassword(): void {
    this.store.dispatch(toggleEditPassword());
    this.updatePasswordService.passwordForm.patchValue({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  editPhone(): void {
    this.store.dispatch(toggleEditPhoneNumber());

    this.owner$
      .pipe(take(1))
      .subscribe((owner) => {
        this.updatePhoneNumberService.phoneForm.patchValue({ phone: owner.phone?.replace('+1', '') || '' });
        this.changeDetectorRef.markForCheck();
      });
  }

  cancelEditPhone(): void {
    this.store.dispatch(toggleEditPhoneNumber());
    this.updatePhoneNumberService.phoneForm.patchValue({
      phone: '',
    });
  }
}
