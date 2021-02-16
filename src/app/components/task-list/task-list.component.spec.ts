import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TaskList } from 'src/app/core/TaskList';
import { TasksService } from "../../services/tasks-service/tasks-service.service";
import { TaskItemModule } from '../task-item/task-item.module';
import { TaskListComponent } from './task-list.component';
import { tap } from "rxjs/operators";



describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const taskList: Task[] = [
    {
      id: 0,
      description: "MyTask",
      status: 'active'
    },
    {
      id: 0,
      description: "MyTask",
      status: 'completed'
    }
  ]

  const taskService = {

    getTaskList: jest.fn().mockReturnValue(of(taskList)),
    getActiveTaskList: jest.fn().mockReturnValue(of(taskList.filter(task => task.status === 'active'))),
    getCompletedTaskList: jest.fn().mockReturnValue(of(taskList.filter(task => task.status === 'completed')))
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [TaskItemModule],
      providers: [
        {
          provide: TasksService, useValue: taskService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
      .catch(() => {})

  }));


  beforeEach(() => { })

  it('should create', () => {
    expect(component).toBeDefined();
    // component.ngOnInit();
    // expect(component.taskList$).toBeDefined()
  });

  test('should retrieve task list', () => {

    const spyGetTaskList = jest.spyOn(component, 'getTaskList');

    let list :  Task[] = [];

    component.getTaskList();

    component.taskList$.pipe(tap(completeList => list = completeList)).subscribe().unsubscribe()

    expect(list).toHaveLength(2)
    expect(taskService.getTaskList).toBeCalled()
    expect(spyGetTaskList).toBeCalledTimes(1);

  })

  test('should retrieve only active tasks list', () => {

    const spyGetActiveTaskList = jest.spyOn(component, 'getActiveTaskList');

    let list :  Task[] = [];

    component.getActiveTaskList();

    component.taskList$.pipe(tap(activeList => list = activeList)).subscribe().unsubscribe()

    expect(list).toHaveLength(1)
    expect(taskService.getActiveTaskList).toBeCalled()
    expect(spyGetActiveTaskList).toBeCalledTimes(1)

  })

  test('should retrieve only completed tasks list', () => {

    const spyGetCompletedTaskList = jest.spyOn(component, 'getCompletedTaskList');

    let list : Task[] = [];

    component.getCompletedTaskList();

    component.taskList$.pipe(tap(completedList => list = completedList)).subscribe().unsubscribe()

    expect(list).toHaveLength(1)
    expect(taskService.getCompletedTaskList,).toBeCalled()
    expect(spyGetCompletedTaskList).toBeCalledTimes(1)

  })
});
