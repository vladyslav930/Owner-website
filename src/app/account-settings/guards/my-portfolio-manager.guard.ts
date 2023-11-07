import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, switchMap, take, tap } from 'rxjs/operators';

import { loadOrmContactIfNotLoaded } from '../../shared/store/actions/communications.actions';
import { ICommunicationsSlice } from '../../shared/store/reducers/communications.reducer';
import { selectOrmContact } from '../../shared/store/selectors/communications.selectors';
import { selectShowMyPortfolioManagerMenuItem } from '../store/selectors/account-settings-feature.selectors';

@Injectable()
export class MyPortfolioManagerGuard implements CanActivate {

  constructor(private store: Store<ICommunicationsSlice>, private router: Router) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(loadOrmContactIfNotLoaded());

    return this.store.select(selectOrmContact)
      .pipe(
        first(Boolean),
        switchMap(() => this.store.select(selectShowMyPortfolioManagerMenuItem)),
        take(1),
        tap((showMyPortfolioManagerMenuItem) => {
          if (!showMyPortfolioManagerMenuItem) {
            this.router.navigate(['/settings']);
          }
        }),
      );
  }
}
