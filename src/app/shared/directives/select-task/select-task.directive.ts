import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[selectedEffecttask]'
})
export class SelectTaskDirective implements OnChanges {

  @Input() statusTaskSelected = false;

  constructor() { }

  @HostBinding('class.selectedTask') isSelected = false;

  ngOnChanges() {

    this.isSelected = this.statusTaskSelected;
  }
}
