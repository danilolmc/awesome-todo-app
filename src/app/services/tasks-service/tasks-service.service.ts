import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TasksService {

  apiUrl = environment.apiFakeUrl;

  tasks = [{
    id: 0,
    description: '10 minutes meditation',
    status: 'active'
  }];

  addTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  updateTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  deleteTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  getTaskList(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getActiveTaskList(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks?status=active`);
  }

  getCompletedTaskList(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks?status=completed`);
  }

  addNewTask(task: Task): void {

    this.httpClient
      .post<Task>(`${this.apiUrl}/tasks`, task)
      .subscribe(someTask => !!someTask && this.addTaskEventEmitter.emit());
  }

  setTaskAsCompleted(id: number): void {

    this.httpClient
      .patch<Task>(`${this.apiUrl}/tasks/${id}`, { status: 'completed' })
      .subscribe(task => !!task && this.updateTaskEventEmitter.emit());
  }

  unsetTaskAsCompleted(id: number): void {

    this.httpClient
      .patch<Task>(`${this.apiUrl}/tasks/${id}`, { status: 'active' })
      .subscribe(task => !!task && this.updateTaskEventEmitter.emit());
  }

  deleteTask(id: number): Observable<any> {

    return this.httpClient.delete<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  deleteCompleted(idList: number[]): void {

    let deleteOperation$: Promise<Task>[] = [];

    idList.forEach((taskId: number) => {

      deleteOperation$ = [
        ...deleteOperation$,
        this.httpClient.delete<Task>(`${this.apiUrl}/tasks/${taskId}`)
          .toPromise()];
    });

    Promise.all(deleteOperation$).then(op => {
      this.addTaskEventEmitter.emit();
      this.updateTaskEventEmitter.emit();
      this.deleteTaskEventEmitter.emit();
    });
  }
}
