import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/LoginData';
import { localStorageMock, routerMock, store } from 'src/app/shared/tests/mocks';
import { AuthService } from './auth.service';


describe('LoginService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: window.Storage, useValue: localStorageMock
        },
        {
          provide: Router, useValue: routerMock
        },
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    localStorageMock.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {

    Object.defineProperty(window, 'localStorage', {value: localStorageMock});

    const spyLogin = jest.spyOn(service, 'login');
    const spyNavigator = jest.spyOn(routerMock, 'navigate');

    const loginData: LoginData = {
      login: 'dan',
      password: '1234',
      rememberme: false
    }

    const token = '1234567890';

    service.login(loginData);

    expect(spyLogin).toBeCalledWith(loginData);
    // expect(spyNavigator).toBeCalledWith(['/todo-list', {user: loginData.login}]);
    expect(store.token).toEqual(token);
  })

  it('should not login with incorrect login and passowrd', () => {

    const spyLogin = jest.spyOn(service, 'login');

    const loginData: LoginData = {
      login: 'dann',
      password: '123',
      rememberme: false
    }

    service.login(loginData);

    expect(spyLogin).toBeCalledWith(loginData);
    expect(spyLogin).toReturnWith(false);
    expect(store).toEqual({});

  })
});
