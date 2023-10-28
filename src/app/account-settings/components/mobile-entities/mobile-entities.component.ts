import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EntitiesBase } from '../../classes/entities-base.class';

@Component({
  selector: 'app-mobile-entities',
  templateUrl: './mobile-entities.component.pug',
  styleUrls: ['./mobile-entities.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileEntitiesComponent extends EntitiesBase {}
