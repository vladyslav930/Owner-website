import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyndUnsubscriber, myndTakeFirstUntil } from '@myndmanagement/common';
import { MyndModalDialogService } from '@myndmanagement/modals';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ConfirmOtpModalComponent } from '../../shared/components/confirm-otp-modal/confirm-otp-modal.component';
import { IUser } from '../../shared/interfaces/user.interface';
import { selectUser } from '../../shared/store/selectors/auth.selectors';
import { updateEmail } from '../store/actions/profile.actions';
import { AccountSettingsFeatureStoreType } from '../store/reducers';
import { selectIsUpdatingEmail } from '../store/selectors/profile.selectors';

@Injectable()
export class UpdateEmailService extends MyndUnsubscriber {
  readonly user$: Observable<IUser> = this.store.select(selectUser);
  readonly isUpdateEmail$ = this.store.select(selectIsUpdatingEmail);
  emailForm: FormGroup = this.createEmailForm();

  get invalidEmail(): boolean {
    return this.emailForm.controls.newEmail.errors?.email
      || this.emailForm.controls.newEmail.errors?.minlength;
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: MyndModalDialogService,
    private store: Store<AccountSettingsFeatureStoreType>,
  ) {
    super();
  }

  saveEmail(): void {
    this.emailForm.markAllAsTouched();

    if (!this.emailForm.valid) return;

    const { newEmail } = this.emailForm.getRawValue();
    this.modalDialogService.open(ConfirmOtpModalComponent, {
      panelClass: ['o-confirm-otp-modal-pane'],
    })
      .afterClosed()
      .pipe(myndTakeFirstUntil<string>(this.unsubscribe, Boolean))
      .subscribe((confirmToken) => {
        this.store.dispatch(updateEmail({ confirmToken, newEmail }));
      });
  }

  private createEmailForm(): FormGroup {
    return this.formBuilder.group({
      newEmail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(128),
          Validators.email,
        ])],
    });
  }
}
