import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NoEntitiesService } from '../../entities/services/no-entities.service';

@Injectable()
export class NoEntitySettingsGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private noEntitiesService: NoEntitiesService,
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.handler();
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.handler();
  }

  private handler(): Observable<boolean | UrlTree> {
    return this.noEntitiesService.hasNoEntities().pipe(
      map((noEntities) => {
        if (!noEntities) {
          return true;
        }

        return this.router.createUrlTree(['/settings']);
      }),
    );
  }
}
