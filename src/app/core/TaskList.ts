import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { EventEmitter } from '@angular/core';

export abstract class TaskList{

  abstract addTaskEventEmitter : EventEmitter<Task>;

  abstract updateTaskEventEmitter : EventEmitter<Task>;

  abstract deleteTaskEventEmitter : EventEmitter<Task>;

  abstract getTaskList() : Observable<Task[]>

  abstract getActiveTaskList() : Observable<Task[]>

  abstract getCompletedTaskList() : Observable<Task[]>

  abstract addNewTask(task : Task) : void;

  abstract setTaskAsCompleted(id : number) : void;

  abstract unsetTaskAsCompleted(id : number) : void;

  abstract deleteTask(id : number) : Observable<any>;

  abstract deleteCompleted(id_list : number[]) : void;

}
