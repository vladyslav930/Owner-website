import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MyndSafeType, MyndUnsubscriber, myndTakeFirstUntil } from '@myndmanagement/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { IOrmDetails } from '../../../shared/interfaces/orm-details.interface';
import { ICommunicationsSlice } from '../../../shared/store/reducers/communications.reducer';
import {
  selectOrmContact,
  selectOrmContactIntroVideoLink,
} from '../../../shared/store/selectors/communications.selectors';

@Component({
  selector: 'o-my-portfolio-manager',
  templateUrl: './my-portfolio-manager.component.pug',
  styleUrls: ['./my-portfolio-manager.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MyPortfolioManagerComponent extends MyndUnsubscriber implements OnInit {
  videoReady = false;
  scaleVideo = false;

  readonly ormContact$: Observable<IOrmDetails> = this.store.select(selectOrmContact);
  readonly youtubeIframeUrl$: Observable<string> = this.store.select(selectOrmContactIntroVideoLink);
  readonly MyndSafeType = MyndSafeType;

  constructor(private store: Store<ICommunicationsSlice>, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.initVideo();
  }

  private initVideo(): void {
    this.youtubeIframeUrl$.pipe(
      myndTakeFirstUntil(this.unsubscribe, Boolean),
      debounceTime(0),
      tap(async () => {
        const setVideoReady = () => {
          this.videoReady = true;
          this.cdr.markForCheck();
        };
        const setScaleVideo = () => {
          this.scaleVideo = true;
          this.cdr.markForCheck();
        };

        try {
          const plyr = await import('plyr');
          const player = new plyr.default('.video-container');
          const stopVideo = () => {
            player.stop();
            this.scaleVideo = false;
            this.cdr.markForCheck();
          };

          player.on('ready', setVideoReady);
          player.on('playing', setScaleVideo);
          player.on('ended', stopVideo);
          player.on('error', stopVideo);
        } catch (err) {
          setVideoReady();
        }
      }),
    ).subscribe();
  }
}
