import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyndUnsubscribeService, myndTakeFirstUntil } from '@myndmanagement/common';
import { Store } from '@ngrx/store';

import { IUpdateMyPhoneRequest } from '../../shared/services/api/dto/update-my-phone-request.interface';
import { updatePhone } from '../store/actions/profile.actions';
import { AccountSettingsFeatureStoreType } from '../store/reducers';
import { selectIsUpdatingPhoneNumber, selectUpdatePhoneNumberFailed } from '../store/selectors/profile.selectors';

@Injectable()
export class UpdatePhoneNumberService {
  readonly isUpdatePhone$ = this.store.select(selectIsUpdatingPhoneNumber);
  phoneForm: FormGroup = this.createPhoneForm();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AccountSettingsFeatureStoreType>,
    private unsubscribe: MyndUnsubscribeService,
  ) {}

  savePhone(): void {
    this.phoneForm.markAllAsTouched();

    if (this.phoneForm.valid) {
      const { phone } = this.phoneForm.getRawValue();
      const model: IUpdateMyPhoneRequest = {
        phone: `+1${phone}`,
      };

      this.store.dispatch(updatePhone(model));

      this.store.select(selectUpdatePhoneNumberFailed)
        .pipe(myndTakeFirstUntil(this.unsubscribe, Boolean))
        .subscribe(() => {
          this.phoneForm.get('phone').setErrors({ phone: true });
        });
    }
  }

  private createPhoneForm(): FormGroup {
    return this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    });
  }
}
