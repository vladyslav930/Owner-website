import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { range } from 'lodash';
import { Observable } from 'rxjs';

import { IOwnerDetails } from '../../../../shared/interfaces/owner-details.interface';
import { IUser } from '../../../../shared/interfaces/user.interface';
import { selectOwner, selectUser } from '../../../../shared/store/selectors/auth.selectors';
import { AccountSettingsFeatureStoreType } from '../../../store/reducers';

@Component({
  selector: 'o-my-profile',
  templateUrl: './my-profile.component.pug',
  styleUrls: ['./my-profile.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProfileComponent {
  readonly user$: Observable<IUser> = this.store.select(selectUser);
  readonly owner$: Observable<IOwnerDetails> = this.store.select(selectOwner);
  readonly passwordMaskRange = range(0, 8);

  constructor(private store: Store<AccountSettingsFeatureStoreType>) {
  }
}
