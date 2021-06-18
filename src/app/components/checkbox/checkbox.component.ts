import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent{

  @Input() taskId : string = "checkbox";

  @Input() text = "";

  @Input() isSelected = false;

  @Output() selectCheckbox = new EventEmitter<boolean>(this.isSelected);

  constructor() { }

  toggleCheckBox(){

    this.isSelected = !this.isSelected;
    this.selectCheckbox.emit(this.isSelected);
  }
}
