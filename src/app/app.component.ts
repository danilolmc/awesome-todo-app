import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  actualTheme = 'lightTheme'

  constructor(private themeService: ThemeService) { }

  ngOnInit() {

    this.actualTheme = localStorage.getItem('theme')?.toString() || 'lightTheme' ;
  }

  changeTheme() {
    this.themeService.setTheme();
    this.actualTheme = this.themeService.activatedTheme.value;
  }

}

