import { ChangeDetectionStrategy, Component } from '@angular/core';

import { accountSettingsLinks } from '../../../constants/more-page.constant';

@Component({
  selector: 'o-account-settings-mobile',
  templateUrl: './account-settings-mobile.component.pug',
  styleUrls: ['./account-settings-mobile.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsMobileComponent {
  readonly accountSettingsLinks = accountSettingsLinks;
}
