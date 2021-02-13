import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';

export abstract class TaskList{

  abstract getTaskList() : Observable<Task[]>

  abstract getActiveTaskList() : Observable<Task[]>

  abstract getCompletedTaskList() : Observable<Task[]>
}
