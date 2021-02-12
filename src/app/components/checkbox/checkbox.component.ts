import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() taskId : string = "checkbox";

  constructor() { }

  ngOnInit(): void {
  }

}
