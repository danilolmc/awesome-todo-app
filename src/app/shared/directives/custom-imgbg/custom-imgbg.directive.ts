import { Directive, HostBinding, OnInit, OnChanges } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ThemesOptions } from 'src/app/themes/EnumThemes';

@Directive({
  selector: '[CustomImgbg]'
})
export class CustomImgbgDirective implements OnInit {

  constructor(private themeService: ThemeService) { }

  @HostBinding('class') themeClass = 'lightModeBackground';

  ngOnInit() {

    this.themeService.activatedTheme.subscribe(themeName => {

      this.themeClass
        = themeName == ThemesOptions.LIGHT_THEME
          ? 'lightModeBackground'
          : 'darkModeBackground'
    })
  }
}
