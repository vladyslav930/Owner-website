import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyndUnsubscribeService } from '@myndmanagement/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IOwnerDetails } from '../../../../shared/interfaces/owner-details.interface';
import { selectOwner } from '../../../../shared/store/selectors/auth.selectors';
import { UpdatePhoneNumberService } from '../../../services/update-phone-number.service';
import { updatePhoneCompleted } from '../../../store/actions/profile.actions';
import { AccountSettingsFeatureStoreType } from '../../../store/reducers';

@Component({
  selector: 'o-update-phone-number',
  templateUrl: './update-phone-number.component.pug',
  styleUrls: ['./update-phone-number.component.styl', '../../../styles/mobile-edit-page.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MyndUnsubscribeService, UpdatePhoneNumberService],
})
export class MobileUpdatePhoneNumberComponent {
  readonly owner$: Observable<IOwnerDetails> = this.store.select(selectOwner);

  constructor(
    private actions$: Actions,
    private router: Router,
    private unsubscribe: MyndUnsubscribeService,
    public updatePhoneNumberService: UpdatePhoneNumberService,
    private store: Store<AccountSettingsFeatureStoreType>,
  ) {
    this.actions$.pipe(ofType(updatePhoneCompleted), takeUntil(this.unsubscribe)).subscribe(() => {
      this.router.navigate(['settings']);
    });
  }
}
