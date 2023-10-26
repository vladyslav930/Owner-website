import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'o-editable-line-item',
  templateUrl: './editable-line-item.component.pug',
  styleUrls: ['./editable-line-item.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableLineItemComponent {
  @Input() label: string;
  @Input() editing: boolean;
  @Input() editLabel = 'Edit';
  @Input() loading: boolean;
  @Input() formSubmitted: boolean;

  @Output() cancelEdit = new EventEmitter();
  @Output() edit = new EventEmitter();

  @ContentChild(FormGroupDirective) ngForm: FormGroupDirective;
  @ContentChild(FormControlName) ngFormControlName: FormControlDirective;
  @ContentChild(FormControlDirective) ngFormControlDirective: FormControlDirective;

  get formControl(): FormControl {
    return (this.ngFormControlName || this.ngFormControlDirective)?.control;
  }
}
