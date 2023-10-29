import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadOrmContactIfNotLoaded } from '../../../../shared/store/actions/communications.actions';
import { ICommunicationsSlice } from '../../../../shared/store/reducers/communications.reducer';

@Component({
  selector: 'o-mobile-contact-us',
  templateUrl: './mobile-contact-us.component.pug',
  styleUrls: ['./mobile-contact-us.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileContactUsComponent {

  constructor(
    private store: Store<ICommunicationsSlice>,
  ) {
    this.store.dispatch(loadOrmContactIfNotLoaded());
  }
}
