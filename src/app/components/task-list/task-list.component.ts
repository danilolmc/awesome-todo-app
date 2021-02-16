import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { filter, map, flatMap, switchMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  // animations: [
  //   trigger('taskListAnimation', [

  //     transition("* => *", [
  //       query(":enter", [
  //         style({ opacity: 0 }),
  //         animate('1.2s  ease', style({ opacity: 1 }))
  //       ])
  //     ])
  //   ])]
})
export class TaskListComponent implements OnInit {

  taskList$!: Observable<Task[]>

  actualListType = "All";

  functionToExcute: Function = () => { }

  constructor(private taskService: TasksService) { }

  getTaskList() {
    this.setActualList("All")
    this.taskList$ = this.taskService.getTaskList()
  }

  getActiveTaskList() {

    this.setActualList("Active")
    this.taskList$ = this.taskService.getActiveTaskList()
  }

  getCompletedTaskList() {

    this.setActualList("Completed")
    this.taskList$ = this.taskService.getCompletedTaskList()
  }

  setActualList(listType: string) {

    this.actualListType = listType;
  }

  clearCompleted() {

    this.taskService
      .getCompletedTaskList()
      .pipe(
        switchMap(taskList => taskList),
        map(task => {return task.id}),
        toArray()
        )
      .subscribe(completedTasks => {
        this.taskService.deleteCompleted(completedTasks)
      });
  }

  eventEmitterListener(eventEmitter: EventEmitter<Task>) {

    const getFunctions: any = {

      All: this.getTaskList,
      Active: this.getActiveTaskList,
      Completed: this.getCompletedTaskList

    }
    eventEmitter
      .subscribe(() => {
        this.functionToExcute = getFunctions[this.actualListType]
        this.functionToExcute();
      });

  }

  ngOnInit(): void {

    this.eventEmitterListener(this.taskService.addTaskEventEmitter);
    this.eventEmitterListener(this.taskService.updateTaskEventEmitter);
    this.eventEmitterListener(this.taskService.deleteTaskEventEmitter);

    this.getTaskList();
  }
}
