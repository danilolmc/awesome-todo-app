import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

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

