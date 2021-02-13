import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TaskList } from 'src/app/core/TaskList';
import { TasksService } from "../../services/tasks-service/tasks-service.service";
import { TaskItemModule } from '../task-item/task-item.module';
import { TaskListComponent } from './task-list.component';



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

  const taskService: TaskList = {

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
  }));


  beforeEach(() => { })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  test('should retrieve task list', () => {

    taskService.getTaskList().subscribe(list => {

      expect(list.length).toEqual(2)
    })

    expect(taskService.getTaskList).toBeCalled()

  })

  test('should retrieve only active tasks list', () => {

    taskService.getActiveTaskList().subscribe(list => {

      expect(list.length).toEqual(1)
    })

    expect(taskService.getActiveTaskList).toBeCalled()

  })
});
