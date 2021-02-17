import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';

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

  taskList: Task[] = []

  actualListType = "All";

  functionToExcute: Function = () => { }

  constructor(private taskService: TasksService) { }

  getTaskList() {
    this.setActualList("All")
    this.taskService.getTaskList().subscribe(allList => {
      this.taskList = allList
    })
  }

  getActiveTaskList() {

    this.setActualList("Active")
    this.taskService.getActiveTaskList().subscribe(activeList => {
      this.taskList = activeList
    })
  }

  getCompletedTaskList() {

    this.setActualList("Completed")
    this.taskService.getCompletedTaskList().subscribe(completedList => {
      this.taskList = completedList
    })
  }

  setActualList(listType: string) {

    this.actualListType = listType;
  }

  clearCompleted() {

    this.taskService
      .getCompletedTaskList()
      .pipe(
        switchMap(taskList => taskList),
        map(task => { return task.id }),
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

  drop(event: CdkDragDrop<Task[]>) {

    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {

    this.eventEmitterListener(this.taskService.addTaskEventEmitter);
    this.eventEmitterListener(this.taskService.updateTaskEventEmitter);
    this.eventEmitterListener(this.taskService.deleteTaskEventEmitter);

    this.getTaskList();
  }
}
