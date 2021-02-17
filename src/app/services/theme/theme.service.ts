import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { darkTheme } from 'src/app/themes/dark';
import { lightTheme } from 'src/app/themes/light';
import { ThemesOptions } from '../../themes/EnumThemes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  activatedTheme = new BehaviorSubject<ThemesOptions>(ThemesOptions.LIGHT_THEME);

  getTheme() {
    return this.activatedTheme.value == ThemesOptions.LIGHT_THEME ? lightTheme : darkTheme;
  }

  setTheme() {
    this.activatedTheme.value == ThemesOptions.LIGHT_THEME ? this.activatedTheme.next(ThemesOptions.DARK_THEME) : this.activatedTheme.next(ThemesOptions.LIGHT_THEME);

  }


}
