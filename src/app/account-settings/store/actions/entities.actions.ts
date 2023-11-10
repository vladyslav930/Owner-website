import { createAction, props } from '@ngrx/store';

import {
  IUpdateEntityAccountingRequestDto,
} from '../../../shared/services/api/dto/update-entity-accounting-request-dto.interface';

export const toggleEditEntity = createAction('[Account Settings / Entities] Toggle edit phone number', props<{ entityId: string }>());

export const updateEntityDetails = createAction('[Account Settings / Entities] Update entity details', props<{ entityDetails: IUpdateEntityAccountingRequestDto, confirmToken: string }>());
export const entityDetailsUpdated = createAction('[Account Settings / Entities] Entity details updated', props<{ entityId: string }>());
export const entityDetailsNotUpdated = createAction('[Account Settings / Entities] Entity details not updated', props<{ entityId: string }>());
