import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

  @Input() taskId = 'checkbox';

  @Input() text = '';

  @Input() isSelected = false;

  @Output() selectCheckbox = new EventEmitter<boolean>(this.isSelected);

  @Input() checkboxTextColor = '';

  constructor() { }

  toggleCheckBox(): void {

    this.isSelected = !this.isSelected;
    this.selectCheckbox.emit(this.isSelected);
  }
}
