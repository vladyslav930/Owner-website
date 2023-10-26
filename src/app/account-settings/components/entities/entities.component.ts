import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { myndTakeFirstUntil } from '@myndmanagement/common';
import { MyndModalDialogService } from '@myndmanagement/modals';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { IEntity } from '../../../entities/interfaces/entity.interface';
import { IProperty } from '../../../properties-shared/interfaces/property.interface';
import { ConfirmOtpModalComponent } from '../../../shared/components/confirm-otp-modal/confirm-otp-modal.component';
import { patterns } from '../../../shared/constants/patterns.constant';
import { EntityRolePermission } from '../../../shared/constants/permissions.constant';
import {
  IUpdateEntityAccountingRequestDto,
} from '../../../shared/services/api/dto/update-entity-accounting-request-dto.interface';
import { EntitiesBase } from '../../classes/entities-base.class';
import { toggleEditEntity, updateEntityDetails } from '../../store/actions/entities.actions';
import { AccountSettingsFeatureStoreType } from '../../store/reducers';
import { selectUpdateEntities } from '../../store/selectors/entities.selectors';

@Component({
  selector: 'o-entities',
  templateUrl: './entities.component.pug',
  styleUrls: ['./entities.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesComponent extends EntitiesBase implements OnInit {
  updateEntities$ = this.store.select(selectUpdateEntities);
  entitiesForm: FormGroup[] = [];

  readonly EntityRolePermission = EntityRolePermission;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modalDialogService: MyndModalDialogService,
    protected store: Store<AccountSettingsFeatureStoreType>,
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.entities$.pipe(
      myndTakeFirstUntil(this.unsubscribe, entities => entities?.length > 0),
      map(entities => entities.map(entity => this.createEntityForm(entity))),
    ).subscribe((entitiesForm) => {
      this.entitiesForm = entitiesForm;
      this.cdr.markForCheck();
    });
  }

  getPropertyAddress(property: IProperty): string {
    return property.address;
  }

  cancelEdit({ entityId, maskedAccountNumber, routingNumber }: IEntity, formGroupDirective: FormGroupDirective): void {
    this.store.dispatch(toggleEditEntity({ entityId }));

    formGroupDirective.resetForm({
      routingNumber,
      accountNumber: maskedAccountNumber,
    });
  }

  edit(entityId: string): void {
    this.store.dispatch(toggleEditEntity({ entityId }));
  }

  save(entity: IEntity, form: FormGroup): void {
    form.markAllAsTouched();

    if (form.invalid) {
      return;
    }

    const { accountNumber, routingNumber } = form.getRawValue();
    const model: IUpdateEntityAccountingRequestDto = {
      routingNumber,
      accountingNumber: accountNumber,
      entityId: entity.entityId,
    };

    this.modalDialogService.open(ConfirmOtpModalComponent, {
      panelClass: ['o-confirm-otp-modal-pane'],
    })
      .afterClosed()
      .pipe(myndTakeFirstUntil<string>(this.unsubscribe, Boolean))
      .subscribe((confirmToken) => {
        this.store.dispatch(updateEntityDetails({
          confirmToken,
          entityDetails: model,
        }));
      });
  }

  private createEntityForm(entity: IEntity): FormGroup {
    return this.formBuilder.group({
      accountNumber: [entity.maskedAccountNumber, Validators.compose([
        Validators.required,
        Validators.pattern(patterns.bankAccount),
      ])],
      routingNumber: [entity.routingNumber, Validators.compose([
        Validators.required,
        Validators.pattern(patterns.routing),
      ])],
    });
  }
}
