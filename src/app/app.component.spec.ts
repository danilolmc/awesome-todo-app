import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
