import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { range } from 'lodash';

import { passwordGuidelines } from '../../shared/constants/password-guidelines.constant';
import { passwordFieldValidators, validatePasswordConfirm } from '../../shared/constants/password-validation.constant';
import { IChangePassword } from '../../shared/interfaces/change-password.interface';
import { changePassword } from '../store/actions/profile.actions';
import { AccountSettingsFeatureStoreType } from '../store/reducers';
import { selectIsChangingPassword } from '../store/selectors/profile.selectors';

@Injectable()
export class UpdatePasswordService {
  passwordForm: FormGroup = this.createPasswordForm();
  readonly passwordGuidelines = passwordGuidelines;
  readonly passwordMaskRange = range(0, 8);
  readonly isChangingPassword$ = this.store.select(selectIsChangingPassword);

  get notMatchGuidelines(): boolean {
    return this.passwordForm.controls.newPassword.errors?.pattern
      || this.passwordForm.controls.newPassword.errors?.minlength;
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AccountSettingsFeatureStoreType>,
  ) {
  }

  savePassword(): void {
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.getRawValue();
      const model: IChangePassword = {
        oldPassword,
        newPassword,
      };

      this.store.dispatch(changePassword({ payload: model }));
    }
  }

  private createPasswordForm(): FormGroup {
    return this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose(passwordFieldValidators)],
      confirmPassword: ['', Validators.compose(passwordFieldValidators)],
    }, { validators: [validatePasswordConfirm('newPassword', 'confirmPassword')] });
  }
}
