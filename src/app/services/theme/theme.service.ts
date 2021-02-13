import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { lightTheme } from 'src/app/themes/light';
import { Theme } from 'src/app/themes/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  activatedTheme = new BehaviorSubject<Theme>(lightTheme);

  getTheme() {
    return this.activatedTheme.value;
  }


  setTheme() {

  }


}
