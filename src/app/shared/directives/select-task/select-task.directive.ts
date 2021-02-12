import { Directive, Renderer2, ElementRef, Input, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[selectedEffecttask]'
})
export class SelectTaskDirective implements OnChanges {

  @Input() statusTaskSelected = false;

  constructor(private render: Renderer2, private element: ElementRef) { }

  ngOnChanges() {

    if (this.statusTaskSelected) {

      this.render.addClass(this.element.nativeElement, 'selectedTask');
    } else {

      this.render.removeClass(this.element.nativeElement, 'selectedTask');
    }

  }


}
