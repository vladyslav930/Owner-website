import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../../root/interfaces/app-state.interface';
import { signOutAction } from '../../../../shared/store/actions/auth.actions';

@Component({
  selector: 'o-more-page',
  templateUrl: './more-page.component.pug',
  styleUrls: ['./more-page.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MorePageComponent {
  constructor(private store: Store<IAppState>) { }

  signOut(): void {
    this.store.dispatch(signOutAction());
  }
}
