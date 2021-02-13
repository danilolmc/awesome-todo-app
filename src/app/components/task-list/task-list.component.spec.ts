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
    }
  ]

  const taskService: TaskList = {

    getTaskList: jest.fn().mockReturnValue(of(taskList))
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

  it('should create', done => {
    expect(component).toBeDefined();
    done();
  });

  test('should retrieve task list', done => {


    taskService.getTaskList();

    expect(taskService.getTaskList).toBeCalled()

    done();

  })
});
