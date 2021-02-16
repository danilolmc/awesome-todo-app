import { Injectable } from '@angular/core';
import { TaskList } from 'src/app/core/TaskList';
import { Observable, from, of } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';


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

  addNewTask(task: Task): Observable<Task> {

    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }
}
