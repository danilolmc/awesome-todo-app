import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'awesome-todo-app';

  @ViewChild('taskList') tasklist !: TaskListComponent;

  constructor(){}

  ngOnInit(){

  }

  SyncListData(){
    this.tasklist.ngOnInit()
  }

}

