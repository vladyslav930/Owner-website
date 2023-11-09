import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { EntityRole } from '../../entities/constants/entity-role.constant';
import { EntityRolePermission } from '../../shared/constants/permissions.constant';
import { IOwner } from '../../shared/interfaces/owner.interface';
import { PermissionsService } from '../../shared/services/permissions.service';
import { IAuthSlice } from '../../shared/store/reducers/auth.reducer';
import { selectUser } from '../../shared/store/selectors/auth.selectors';

@Pipe({ name: 'canDeleteOwner' })
export class CanDeleteOwnerPipe implements PipeTransform {
  constructor(private permissionsService: PermissionsService, private store: Store<IAuthSlice>) {}

  transform(owner: IOwner): Observable<boolean> {
    return combineLatest([
      this.store.select(selectUser).pipe(map(({ ownerId }) => ownerId !== owner.ownerId)),
      ...owner.roles.map(({ role, entityId }) => role === EntityRole.PrimaryOwner
        ? of(false)
        : this.permissionsService.hasPermissionForEntity(EntityRolePermission.ManageOwnerRoles, entityId),
      ),
    ]).pipe(
      map(arr => arr.every(Boolean)),
      distinctUntilChanged(),
    );
  }
}
