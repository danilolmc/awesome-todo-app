import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task !: Task;

  isSelected = false;

  @ViewChild('checkbox') checkbox !: CheckboxComponent;

  constructor() { }

  ngOnInit(): void {
  }

  selectedData(event: boolean) {

    this.isSelected = event;
  }

  selectTaskByClickingAtItName() {

    this.checkbox.toggleCheckBox();
    this.isSelected = this.checkbox.isSelected;
  }

}
