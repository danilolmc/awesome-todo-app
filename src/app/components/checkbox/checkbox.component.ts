import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent{

  @Input() taskId : string = "checkbox";

  @Input() isSelected = false;

  @Output() selectTask = new EventEmitter<boolean>(this.isSelected);

  constructor() { }


  emitStatusCheckbox(){

    this.selectTask.emit(this.isSelected);
  }

  toggleCheckBox(){

    this.isSelected = !this.isSelected;

  }
}
