import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';

export abstract class TaskList{

  abstract getTaskList() : Observable<Task[]>

  abstract getActiveTaskList() : Observable<Task[]>

  abstract getCompletedTaskList() : Observable<Task[]>

  abstract addNewTask(task : Task) : void;

  abstract setTaskAsCompleted(id : number) : void;

  abstract unsetTaskAsCompleted(id : number) : void;

  abstract deleteTask(id : number) : Observable<any>;

  abstract deleteCompleted(id_list : number[]) : void;



}
