import { Injectable } from '@angular/core';
import { MyndHttpService } from '@myndmanagement/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INotificationPreference } from '../interfaces/notification-preferences.interface';

@Injectable()
export class NotificationPreferencesApiService extends MyndHttpService {
  private endpoint = 'notification-preferences';

  getNotificationPreferences(): Observable<INotificationPreference[]> {
    return super.get(this.endpoint).pipe(
      map(response => response.notificationPreferences),
    );
  }

  updateNotificationPreferences(
    notificationPreferences: INotificationPreference[],
  ): Observable<void> {
    return super.post(`${this.endpoint}/update-owner-notification-preferences`, { notificationPreferences });
  }
}
