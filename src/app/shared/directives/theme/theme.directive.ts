import { Directive, ElementRef, Renderer2, OnInit, OnChanges } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Theme } from 'src/app/themes/theme';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit {

  constructor(
    private themeService: ThemeService,
    private elementRef: ElementRef,

  ) { }

  ngOnInit() {

    this.updateTheme(this.themeService.getTheme())

  }


  updateTheme(theme: Theme) {


    for (const itemStyle in theme) {

      let itemP: any = theme;

      this.elementRef.nativeElement.style.setProperty(itemStyle, itemP[itemStyle]);
    }

  }
}
