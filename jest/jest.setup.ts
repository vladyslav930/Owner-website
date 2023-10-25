import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MyndCommonModule, MyndHttpService } from '@myndmanagement/common';
import { MyndFormsModule } from '@myndmanagement/forms';
import { MyndLayoutModule } from '@myndmanagement/layout';
import { MyndModalsModule } from '@myndmanagement/modals';
import { myndExtendSpectator } from '@myndmanagement/test';
import { MyndToastModule } from '@myndmanagement/toast';
import { MyndTooltipModule } from '@myndmanagement/tooltip';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { mockProvider } from '@ngneat/spectator/jest';

Object.defineProperty(document, '__env', {
  writable: false,
  value: {
    apiRoot: '',
    AWSCognito: {},
    dataDog: {},
  },
});

myndExtendSpectator();

window.URL.createObjectURL = jest.fn(() => '');
window.URL.revokeObjectURL = jest.fn(() => {});

defineGlobalsInjections({
  imports: [
    CommonModule,
    MyndCommonModule.forRoot(),
    MyndFormsModule,
    MyndToastModule,
    MyndLayoutModule,
    MyndModalsModule,
    MyndTooltipModule,
    ReactiveFormsModule,
    RouterTestingModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '',
    },
    mockProvider(MyndHttpService),
  ],
});
