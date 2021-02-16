import { Injectable, EventEmitter } from '@angular/core';
import { TaskList } from 'src/app/core/TaskList';
import { Observable, from, of, Subscription } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TasksService implements TaskList {

  apiUrl = environment.apiFakeUrl;

  tasks = [{
    id: 0,
    description: "10 minutes meditation",
    status: "active"
  }]

  addTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  updateTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  deleteTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  getTaskList(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getActiveTaskList(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks?status=active`)
  }

  getCompletedTaskList(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks?status=completed`)
  }

  addNewTask(task: Task) {

    this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task).subscribe(someTask => !!someTask && this.addTaskEventEmitter.emit());
  }

  setTaskAsCompleted(id: number) {

    this.httpClient.patch<Task>(`${this.apiUrl}/tasks/${id}`, { status: "completed" }).subscribe(task => !!task && this.updateTaskEventEmitter.emit());
  }

  unsetTaskAsCompleted(id: number) {

    this.httpClient.patch<Task>(`${this.apiUrl}/tasks/${id}`, { status: "active" }).subscribe(task => !!task && this.updateTaskEventEmitter.emit());
  }

  deleteTask(id: number): Observable<any> {

    return this.httpClient.delete<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  deleteCompleted(id_list : number[]) :  void{

    let deleteOperation$ !:  Promise<Task>;

    id_list.forEach(task_id => {

      deleteOperation$ = this.httpClient.delete<Task>(`${this.apiUrl}/tasks/${task_id}`).toPromise();
    })

    deleteOperation$.then(op => {
      this.addTaskEventEmitter.emit();
      this.updateTaskEventEmitter.emit();
      this.deleteTaskEventEmitter.emit();
    })





  }

}
