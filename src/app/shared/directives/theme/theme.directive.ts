import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Theme } from 'src/app/themes/theme';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit {

  constructor(
    private themeService: ThemeService,
    private elementRef: ElementRef,
    private render: Renderer2

  ) { }

  ngOnInit() {

    this.themeService.getTheme().subscribe((theme: Theme) => {
      this.updateTheme(theme)
    })
  }


  updateTheme(theme: Theme) {

    for (const itemStyle in theme.properties) {

      let itemP: any = theme.properties;

      this.elementRef.nativeElement.style.setProperty(itemStyle, itemP[itemStyle]);
    }
  }



}
