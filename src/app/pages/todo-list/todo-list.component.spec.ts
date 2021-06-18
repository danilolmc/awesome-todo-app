import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {

  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
TestBed

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
 TestBed });

  beforeEach(() => {TodoListComponent
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('should change theme to dark', () => {
    const spyChangeTheme = jest.spyOn(component, 'changeTheme');

    component.actualTheme = 'lightTheme';

    component.changeTheme();

    fixture.detectChanges()

    let bgImgElement  = fixture.debugElement.query(By.css('.bg-image-container')).children[0];

    expect(bgImgElement.nativeElement.className).toBe('darkModeBackground')
    expect(localStorage.getItem('theme')).toBe('darkTheme');
    expect(component.actualTheme).toEqual('darkTheme');
    expect(spyChangeTheme).toBeCalledTimes(1)


  })

  test('should change theme to light', () => {
    const spyChangeTheme = jest.spyOn(component, 'changeTheme');

    component.actualTheme = 'darkTheme';

    component.changeTheme()

    fixture.detectChanges()

    let bgImgElement  = fixture.debugElement.query(By.css('.bg-image-container')).children[0];

    expect(bgImgElement.nativeElement.className).toBe('lightModeBackground')

    expect(localStorage.getItem('theme')).toBe('lightTheme');
    expect(component.actualTheme).toEqual('lightTheme');
    expect(spyChangeTheme).toBeCalledTimes(1)

  })
});
