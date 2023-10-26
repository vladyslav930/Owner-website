import { ChangeDetectionStrategy, Component } from '@angular/core';
import { myndTrackByIdentity } from '@myndmanagement/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { NoEntitiesService } from '../../../entities/services/no-entities.service';
import { ICommunicationsSlice } from '../../../shared/store/reducers/communications.reducer';
import {
  ISideMenuItem,
  accountSettingsHeaderPortalSlotId,
  sideMenuItems,
} from '../../constants/account-settings.constant';
import { selectAccountSettingsMenuItems } from '../../store/selectors/account-settings-feature.selectors';

@Component({
  selector: 'o-account-settings',
  templateUrl: './account-settings.component.pug',
  styleUrls: ['./account-settings.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent {
  readonly hasNoEntities$ = this.noEntitiesService.hasNoEntities();
  readonly sideMenuItems$: Observable<ISideMenuItem[]> = combineLatest([
    this.store.select(selectAccountSettingsMenuItems),
    this.hasNoEntities$,
  ]).pipe(
    map(([menuItems, hasNoEntities]) => {
      if (hasNoEntities) {
        return [sideMenuItems[0]];
      }

      return menuItems;
    }),
  );
  readonly accountSettingsHeaderPortalSlotId = accountSettingsHeaderPortalSlotId;
  readonly trackByRouterLink = myndTrackByIdentity<ISideMenuItem>('routerLink');

  constructor(
    private store: Store<ICommunicationsSlice>,
    private noEntitiesService: NoEntitiesService,
  ) {}
}
