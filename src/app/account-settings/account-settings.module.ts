import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MyndCommonModule } from '@myndmanagement/common';
import { MyndFormsModule } from '@myndmanagement/forms';
import { MyndButtonModule } from '@myndmanagement/forms-v2/button';
import { MyndFormsCoreModule } from '@myndmanagement/forms-v2/core';
import { MyndInputModule } from '@myndmanagement/forms-v2/input';
import { MyndSelectModule } from '@myndmanagement/forms-v2/select';
import { MyndLayoutModule } from '@myndmanagement/layout';
import { MyndModalsModule } from '@myndmanagement/modals';
import { MyndTableModule } from '@myndmanagement/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxMaskModule } from 'ngx-mask';

import { ApprovalsModule } from '../approvals/approvals.module';
import { ApprovalsResolver } from '../approvals/resolvers/approvals.resolver';
import { ContributionsModule } from '../contributions/contributions.module';
import { ContributionsResolver } from '../contributions/resolvers/contributions.resolver';
import { EntitiesModule } from '../entities/entities.module';
import { EntitiesResolver } from '../entities/resolvers/entities.resolver';
import { PropertiesSharedModule } from '../properties-shared/properties-shared.module';
import { PropertiesResolver } from '../properties-shared/resolvers/properties.resolver';
import { IRouteData } from '../shared/interfaces/route-data.interface';
import { OrmContactResolver } from '../shared/resolvers/orm-contact.resolver';
import { SharedModule } from '../shared/shared.module';
import { isMobile } from '../shared/utils/mobile-detect';

import * as fromComponents from './components';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { MobileEntitiesComponent } from './components/mobile-entities/mobile-entities.component';
import { MobileUsersComponent } from './components/mobile-users/mobile-users.component';
import { MobileContactUsComponent } from './components/mobile/contact-us/mobile-contact-us.component';
import { MorePageComponent } from './components/mobile/more-page/more-page.component';
import {
  NotificationSettingsComponent,
} from './components/mobile/notification-settings/notification-settings.component';
import { MobileUpdateEmailComponent } from './components/mobile/update-email/update-email.component';
import {
  UpdatePasswordMobileComponent,
} from './components/mobile/update-password-mobile/update-password-mobile.component';
import {
  MobileUpdatePhoneNumberComponent,
} from './components/mobile/update-phone-number/update-phone-number.component';
import { MyPortfolioManagerComponent } from './components/my-portfolio-manager/my-portfolio-manager.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { guards } from './guards';
import { MyPortfolioManagerGuard } from './guards/my-portfolio-manager.guard';
import { NoEntitySettingsGuard } from './guards/no-entity-settings.guard';
import { pipes } from './pipes';
import { services } from './services';
import { effects } from './store/effects';
import { accountSettingsFeatureStateKey, reducers } from './store/reducers';

// Note: redirects help us to keep old links alive
const redirects: Routes = [
  { path: '', redirectTo: 'profile' },
  { path: 'profile/phone-verification', redirectTo: 'profile' },
  { path: 'owner-contributions', redirectTo: 'approvals' },
  { path: 'update-phone-number', redirectTo: 'profile' },
  { path: 'update-password', redirectTo: 'profile' },
  { path: 'update-email', redirectTo: 'profile' },
];

const mobileRoutes: Routes = [
  { path: 'profile', redirectTo: '' },
  {
    path: '',
    component: MorePageComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'More' },
    },
  },
  {
    path: 'notifications',
    component: NotificationSettingsComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'Notification Settings', hasBackButton: true },
    },
    canActivate: [NoEntitySettingsGuard],
  },
  {
    path: 'entities',
    component: MobileEntitiesComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'Entities', hasBackButton: true },
    },
    resolve: [EntitiesResolver, PropertiesResolver],
    canActivate: [NoEntitySettingsGuard],
  },
  {
    path: 'users',
    component: MobileUsersComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'Users', hasBackButton: true },
    },
    resolve: [EntitiesResolver],
    canActivate: [NoEntitySettingsGuard],
  },
  {
    path: 'update-password', component: UpdatePasswordMobileComponent, data: <IRouteData>{
      mobileHeaderConfig: { title: 'Update password', hasBackButton: true },
    },
  },
  {
    path: 'update-phone-number',
    component: MobileUpdatePhoneNumberComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'Update phone number', hasBackButton: true },
    },
  },
  {
    path: 'update-email',
    component: MobileUpdateEmailComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'Update email address', hasBackButton: true },
    },
  },
  {
    path: 'approvals',
    redirectTo: '/dashboard/all/approvals',
    canActivate: [NoEntitySettingsGuard],
  },
  {
    path: 'contact-us',
    component: MobileContactUsComponent,
    data: <IRouteData>{
      mobileHeaderConfig: { title: 'Contact Mynd', hasBackButton: true },
    },
  },
];

const desktopRoutes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent,
    resolve: {
      approvals: ApprovalsResolver,
      contributions: ContributionsResolver,
      entities: EntitiesResolver,
      properties: PropertiesResolver,
      ormContact: OrmContactResolver,
    },
    children: [
      ...redirects,
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'my-portfolio-manager',
        component: MyPortfolioManagerComponent,
        canActivate: [MyPortfolioManagerGuard, NoEntitySettingsGuard],
      },
      {
        path: 'entities',
        component: EntitiesComponent,
        canActivate: [NoEntitySettingsGuard],
      },
      {
        path: 'approvals',
        component: ApprovalsComponent,
        canActivate: [NoEntitySettingsGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [NoEntitySettingsGuard],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [NoEntitySettingsGuard],
      },
      { path: '**', redirectTo: 'profile' },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    A11yModule,
    ReactiveFormsModule,
    RouterModule.forChild(isMobile ? mobileRoutes : desktopRoutes),
    DeferLoadModule,
    NgxExtendedPdfViewerModule,
    NgxMaskModule,

    StoreModule.forFeature(accountSettingsFeatureStateKey, reducers),
    EffectsModule.forFeature(effects),
    MyndCommonModule.forFeature(),
    MyndFormsModule,
    MyndModalsModule,
    MyndTableModule,
    MyndFormsCoreModule,
    MyndInputModule,
    MyndButtonModule,
    MyndLayoutModule,
    MyndSelectModule,

    SharedModule,
    ApprovalsModule,
    ContributionsModule,
    EntitiesModule,
    PropertiesSharedModule,
  ],
  declarations: [
    ...fromComponents.components,
    ...pipes,
  ],
  providers: [
    ...services,
    ...guards,
  ],
})
export class AccountSettingsModule {
}
