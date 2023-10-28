import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'o-mobile-account-card',
  templateUrl: './mobile-account-card.component.pug',
  styleUrls: ['./mobile-account-card.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAccountCardComponent {}
