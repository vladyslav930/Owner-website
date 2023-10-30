import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'o-notification-settings',
  templateUrl: './notification-settings.component.pug',
  styleUrls: ['./notification-settings.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationSettingsComponent extends NotificationsComponent { }
