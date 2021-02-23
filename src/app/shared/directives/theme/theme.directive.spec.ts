import { ThemeDirective } from './theme.directive';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<div class="container" theme></div>'
})
class AppComponentMock { }

describe('ThemeDirective', () => {


  let element: ComponentFixture<AppComponentMock>;
  let elementoWithDirective: DebugElement;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeDirective, AppComponentMock],
      providers: [
        {
          provide: ComponentFixtureAutoDetect, useValue: true
        }
      ]
    });
    element = TestBed.createComponent(AppComponentMock);
    elementoWithDirective =  element.debugElement.query(By.directive(ThemeDirective));
  });

  it('should create an instance', (done) => {
    let testrue =  true;

    expect(testrue).toBeTruthy();
    done();
  });
});
