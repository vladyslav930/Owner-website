import { Injectable } from '@angular/core';
import { MyndHttpService } from '@myndmanagement/common';
import { Observable } from 'rxjs';

import { IUserSettings } from '../interfaces/user-settings.interface';

@Injectable()
export class UserSettingsApiService extends MyndHttpService {
  private endpoint = 'user-settings';

  getUserSettings(): Observable<IUserSettings> {
    return super.get(this.endpoint);
  }

  updateUserSettings(data: IUserSettings): Observable<void> {
    return super.put(this.endpoint, data);
  }
}
