import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('taskListAnimation', [

      transition("void => *", [
        query(":enter", [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(100, [
            animate('.7s  ease', style({ opacity: 1, transform: 'translateY(0px)' }))
          ])
        ])
      ])
    ])],

})
export class TaskListComponent implements OnInit {

  taskList: Task[] = []

  actualListType = "All";

  functionToExcute: Function = () => { }

  constructor(private taskListService: TasksService) { }

  getTaskList() {
    this.setActualList("All")
    this.taskListService.getTaskList().subscribe((allList: Task[]) => {
      this.taskList = allList
    },
      (erro: Error) => { console.log(`Was not possible retrieve Task List : ${erro.message}`) })
  }

  getActiveTaskList() {

    this.setActualList("Active")
    this.taskListService.getActiveTaskList().subscribe(activeList => {
      this.taskList = activeList
    },
      (erro: Error) => { console.log(`Was not possible retrieve Activated Task List : ${erro.message}`) }
    )
  }

  getCompletedTaskList() {

    this.setActualList("Completed")
    this.taskListService.getCompletedTaskList().subscribe(completedList => {
      this.taskList = completedList
    },
      (erro: Error) => { console.log(`Was not possible retrieve Completed Task List : ${erro.message}`) })
  }

  setActualList(listType: string) {

    this.actualListType = listType;
  }

  clearCompleted() {

    this.taskListService
      .getCompletedTaskList()
      .pipe(
        switchMap(taskList => taskList),
        map(task => { return task.id }),
        toArray()
      )
      .subscribe(completedTasks => {
        this.taskListService.deleteCompleted(completedTasks)
      },
      (erro: Error) => { console.log(`Was not possible clear completed tasks : ${erro.message}`) }
      );
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

    this.eventEmitterListener(this.taskListService.addTaskEventEmitter);
    this.eventEmitterListener(this.taskListService.updateTaskEventEmitter);
    this.eventEmitterListener(this.taskListService.deleteTaskEventEmitter);

    this.getTaskList();
  }
}
