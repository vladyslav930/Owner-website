import { Directive } from '@angular/core';
import { MyndUnsubscriber, myndTrackByIdentity } from '@myndmanagement/common';
import { Store } from '@ngrx/store';

import { IEntity } from '../../entities/interfaces/entity.interface';
import { selectEntitiesList, selectIsLoadingEntities } from '../../entities/store/entities.selectors';
import { selectPropertiesGroupedByEntityId } from '../../properties-shared/store/selectors/properties.selectors';
import { AccountSettingsFeatureStoreType } from '../store/reducers';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class EntitiesBase extends MyndUnsubscriber {
  readonly entities$ = this.store.select(selectEntitiesList);
  readonly isLoadingEntities$ = this.store.select(selectIsLoadingEntities);
  readonly propertiesGroupedByEntityId$ = this.store.select(selectPropertiesGroupedByEntityId);
  readonly trackById = myndTrackByIdentity<IEntity>('entityId');

  constructor(protected store: Store<AccountSettingsFeatureStoreType>) {
    super();
  }
}
