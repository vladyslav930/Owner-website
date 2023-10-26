import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'o-approvals',
  templateUrl: './approvals.component.pug',
  styleUrls: ['./approvals.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprovalsComponent {
}
