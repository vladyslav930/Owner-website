import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyndUnsubscriber, myndFilterTruthy } from '@myndmanagement/common';
import { IMyndOption } from '@myndmanagement/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, merge } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';

import { storeSelect } from '../../../root/interfaces/app-state.interface';
import { CustomFeatureFlag } from '../../../shared/constants/custom-feature-flag.constant';
import { FeatureFlag } from '../../../shared/constants/feature-flag.constant';
import { ILocalSettings } from '../../../shared/interfaces/local-settings.interface';
import { IOwnerDetails } from '../../../shared/interfaces/owner-details.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { FeatureFlagsService } from '../../../shared/services/feature-flags.service';
import { PushNotificationsService } from '../../../shared/services/push-notifications.service';
import { updateLocalSettingsAction } from '../../../shared/store/actions/settings.actions';
import { selectOwner, selectUser } from '../../../shared/store/selectors/auth.selectors';
import { selectLocalSettings } from '../../../shared/store/selectors/settings.selectors';
import { blockedNotifications } from '../../constants/blocked-notifications.constant';
import { NotificationPreference } from '../../constants/notification-preference.constant';
import { notificationPreferences } from '../../constants/notification-preferences.constant';
import { INotificationPreference, INotificationPreferences } from '../../interfaces/notification-preferences.interface';
import { IUserSettings } from '../../interfaces/user-settings.interface';
import {
  getNotificationPreferencesIfNotLoadedAction,
  getUserSettingsIfNotLoadedAction,
  updateNotificationPreferencesAction,
  updateUserSettingsAction,
} from '../../store/actions/notifications.actions';
import { IAccountSettingsFeatureSlice } from '../../store/reducers';
import {
  selectIsFetchingNotificationPreferences,
  selectIsFetchingUserSettings,
  selectNotificationPreferences,
  selectUserSettings,
} from '../../store/selectors/notifications.selectors';

@Component({
  selector: 'o-notifications',
  templateUrl: './notifications.component.pug',
  styleUrls: ['./notifications.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent extends MyndUnsubscriber implements OnInit {
  readonly notificationPreferences: INotificationPreferences[] = notificationPreferences;
  readonly notificationPreferences$: Observable<INotificationPreference[]> =
    this.store.select(selectNotificationPreferences);
  readonly userSettings$: Observable<IUserSettings> = this.store.select(selectUserSettings);
  readonly localSettings$: Observable<ILocalSettings> = this.store.select(selectLocalSettings);
  readonly isUpdatingNotificationPreferences$: Observable<boolean> = storeSelect('accountSettingsFeature', 'notifications', 'updateNotificationPreferences', 'processing');
  readonly isUpdatingUserSettings$: Observable<boolean> = storeSelect('accountSettingsFeature', 'notifications', 'updateUserSettings', 'processing');
  readonly isFetchingNotificationPreferences$: Observable<boolean> =
    this.store.select(selectIsFetchingNotificationPreferences);
  readonly isFetchingUserSettings$: Observable<boolean> = this.store.select(selectIsFetchingUserSettings);
  readonly user$: Observable<IUser> = this.store.select(selectUser);
  readonly owner$: Observable<IOwnerDetails> = this.store.select(selectOwner);
  readonly isPushNotificationsAvailable$: Observable<boolean> = storeSelect('featureFlags', 'currentFeatureFlags', 'pushNotificationsAvailable');

  readonly isFetching$: Observable<boolean> = this.getIsFetching();
  readonly touchIDType$: Observable<string> = this.getTouchIDType();

  featureFlag = FeatureFlag;
  customFeatureFlag = CustomFeatureFlag;
  blockedNotifications = blockedNotifications;
  form: FormGroup = this.getForm();

  constructor(
    private store: Store<IAccountSettingsFeatureSlice>,
    private featureFlagsService: FeatureFlagsService,
    private pushNotificationsService: PushNotificationsService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(getNotificationPreferencesIfNotLoadedAction());
    this.store.dispatch(getUserSettingsIfNotLoadedAction());

    this.patchFormOnChanges();
    this.updateOnChanges();
    this.updatePushNotifications();
    this.updateLoginViaTouchID();
  }

  getTouchIDType(): Observable<string> {
    return combineLatest([
      this.featureFlagsService.isOn(CustomFeatureFlag.FaceIdAvailable),
      this.featureFlagsService.isOn(CustomFeatureFlag.TouchIdAvailable),
    ]).pipe(
      map(([isFaceIdAvailable, isTouchIdAvailable]) => {
        if (isFaceIdAvailable) {
          return 'Face ID';
        }

        if (isTouchIdAvailable) {
          return 'Touch ID';
        }

        return null;
      }),
    );
  }

  getIsBlockedType(type: NotificationPreference): boolean {
    return blockedNotifications.includes(type);
  }

  private updateOnChanges(): void {
    merge(
      this.form.get('smsEnabled').valueChanges,
      this.form.get('emailEnabled').valueChanges,
    )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        const { smsEnabled, emailEnabled } = this.form.getRawValue();
        const userSettings: IUserSettings = {
          emailEnabled,
          smsEnabled,
        };
        this.store.dispatch(updateUserSettingsAction({ userSettings }));
      });

    this.form.get('notificationPreferences')
      .valueChanges
      .pipe(
        withLatestFrom(this.userSettings$),
        takeUntil(this.unsubscribe),
      )
      .subscribe(([notificationPreferencesValue, userSettings]) => {
        const userNotificationPreferences: INotificationPreference[] =
          Object.keys(this.form.value.notificationPreferences).map((notificationType: NotificationPreference) => ({
            notificationType,
            notifyBySms: notificationPreferencesValue[notificationType] && userSettings.smsEnabled,
            notifyByEmail: notificationPreferencesValue[notificationType] && userSettings.emailEnabled,
          }));
        this.store.dispatch(updateNotificationPreferencesAction({
          notificationPreferences: userNotificationPreferences,
        }));
      });
  }

  private patchFormOnChanges(): void {
    combineLatest([
      this.userSettings$.pipe(myndFilterTruthy()),
      this.notificationPreferences$.pipe(myndFilterTruthy()),
      this.localSettings$,
      this.isPushNotificationsAvailable$,
      this.touchIDType$,
      this.featureFlagsService.isOn(FeatureFlag.SmsNotificationsEnabled),
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([
        userSettings,
        notificationPreferencesData,
        localSettings,
        isPushNotificationsAvailable,
        touchIDType,
        smsNotificationsEnabled,
      ]) => {
        this.form.patchValue({
          smsEnabled: userSettings.smsEnabled,
          emailEnabled: userSettings.emailEnabled,
          pushNotifications: Boolean(isPushNotificationsAvailable && localSettings.pushNotifications),
          loginViaTouchID: Boolean(touchIDType && localSettings.loginViaTouchID),
          notificationPreferences:
            notificationPreferencesData.reduce((memo, notificationType: INotificationPreference) => {
              memo[notificationType.notificationType] = (
                  this.getIsBlockedType(notificationType.notificationType) ||
                  (notificationType.notifyByEmail ||
                  Boolean(smsNotificationsEnabled && notificationType.notifyBySms))
              );
              return memo;
            }, {}),
        }, { emitEvent: false });

        if (userSettings.emailEnabled) {
          this.form.get('emailEnabled').disable({ emitEvent: false });
        }

        this.cdr.markForCheck();
      });
  }

  private getIsFetching(): Observable<boolean> {
    return combineLatest([
      this.isFetchingNotificationPreferences$,
      this.isFetchingUserSettings$,
    ]).pipe(
      map(arr => arr.some(Boolean)),
      distinctUntilChanged(),
    );
  }

  private getForm(): FormGroup {
    return this.formBuilder.group({
      smsEnabled: [null],
      emailEnabled: [null],
      pushNotifications: [null],
      loginViaTouchID: [null],
      notificationPreferences: this.formBuilder.group(
        notificationPreferences
          .reduce((memo, { notificationTypes }) => memo.concat(notificationTypes), [])
          .reduce((memo, notificationType: IMyndOption) => {
            memo[notificationType.key] = [null];
            return memo;
          }, {}),
      ),
    });
  }

  private updatePushNotifications(): void {
    this.form.get('pushNotifications')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        filter(value => value != null),
      )
      .subscribe((isEnabled) => {
        if (isEnabled) {
          this.pushNotificationsService.register();
        } else {
          this.pushNotificationsService.unregister();
        }
      });
  }

  private updateLoginViaTouchID(): void {
    this.form.get('loginViaTouchID')
      .valueChanges
      .pipe(
        filter(value => value != null),
        takeUntil(this.unsubscribe),
      )
      .subscribe((isEnabled) => {
        this.store.dispatch(updateLocalSettingsAction({
          localSettings: {
            loginViaTouchID: isEnabled,
          },
        }));
      });
  }
}
