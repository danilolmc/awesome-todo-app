import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { routerMock } from 'src/app/shared/tests/mocks';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: AuthService;

  const authServiceMock = {
    login: () => {
      return false;
    }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, CheckboxModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
      ]
    })
      .compileComponents();

    userService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  describe('should make login', () => {

    const fakeUserLoginData = {
      user: {
        login: 'danny',
        password: '1234'
      },
      rememberme: false
    };

    const fakeLoginFormUserData = fakeUserLoginData.user;

    it('should fields to be valid', () => {

      component.formLoginGroup.setValue(fakeLoginFormUserData);

      const userLoginDataIsValid = component.formLoginGroup.valid;

      expect(userLoginDataIsValid).toBeTruthy();

    });

    it('should authenticate user', () => {

      component.formLoginGroup.setValue(fakeLoginFormUserData);

      const spyLoginService = jest.spyOn(userService, 'login');
      const spyLoginComponent = jest.spyOn(component, 'login');

      const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

      button.click();

      fixture.detectChanges();

      expect(spyLoginService).toBeCalledWith(fakeUserLoginData);
      expect(spyLoginComponent).toBeCalled();
    });
  });
});
