import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyndUnsubscribeService } from '@myndmanagement/common';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

import { UpdateEmailService } from '../../../services/update-email.service';
import { updateEmailCompleted } from '../../../store/actions/profile.actions';

@Component({
  selector: 'o-update-email',
  templateUrl: './update-email.component.pug',
  styleUrls: ['./update-email.component.styl', '../../../styles/mobile-edit-page.styl'],
  providers: [UpdateEmailService, MyndUnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileUpdateEmailComponent {
  constructor(
    public updateEmailService: UpdateEmailService,
    private actions$: Actions,
    private router: Router,
    private unsubscribe: MyndUnsubscribeService,
  ) {
    this.updateEmailService.emailForm.addControl(
      'repeatedEmailControl',
      new FormControl(null, Validators.required),
    );
    this.updateEmailService.emailForm.setValidators([this.repeatedEmailMatch.bind(this)]);
    this.actions$.pipe(ofType(updateEmailCompleted), takeUntil(this.unsubscribe)).subscribe(() =>
      this.router.navigate(['settings']),
    );
  }

  repeatedEmailMatch: ValidatorFn = (formGroup: FormGroup) => {
    if (formGroup.controls.newEmail.value === formGroup.controls.repeatedEmailControl.value) return null;

    return { noMatch: true };
  }
}
