import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit{

  @Input() taskId : string = "checkbox";

  isSelected = false;

  @Output() selectTask = new EventEmitter<boolean>(this.isSelected);

  constructor() { }

  ngOnInit(): void {
  }

  emitStatusCheckbox(){

    this.selectTask.emit(this.isSelected);
  }

  toggleCheckBox(){

    this.isSelected = !this.isSelected;

  }
}
