import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyndUnsubscribeService } from '@myndmanagement/common';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

import { UpdatePasswordService } from '../../../services/update-password.service';
import { changePasswordCompleted } from '../../../store/actions/profile.actions';

@Component({
  selector: 'o-update-password-mobile',
  templateUrl: './update-password-mobile.component.pug',
  styleUrls: ['./update-password-mobile.component.styl', '../../../styles/mobile-edit-page.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UpdatePasswordService, MyndUnsubscribeService],
})
export class UpdatePasswordMobileComponent {
  constructor(
    private actions$: Actions,
    private router: Router,
    private unsubscribe: MyndUnsubscribeService,
    public updatePasswordService: UpdatePasswordService,
    ) {
    this.actions$.pipe(ofType(changePasswordCompleted), takeUntil(this.unsubscribe)).subscribe(() => {
      this.router.navigate(['settings']);
    });
  }
}
