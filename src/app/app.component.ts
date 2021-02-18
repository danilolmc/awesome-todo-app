import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  actualTheme = 'lightTheme'

  constructor(private themeService: ThemeService) { }

  changeTheme() {
    this.themeService.setTheme();
    this.actualTheme = this.themeService.activatedTheme.value;
  }

}

