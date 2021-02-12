import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() taskId : string = "checkbox";

  isSelected = false;

  @Output() selectTask = new EventEmitter<boolean>(this.isSelected);

  constructor() { }

  ngOnInit(): void {
  }

  selectCheckbox(){

    this.isSelected = !this.isSelected;

    this.selectTask.emit(this.isSelected);
  }
}
