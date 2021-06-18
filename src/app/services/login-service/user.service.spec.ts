import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/LoginData';
import { TasksService } from '../tasks-service/tasks-service.service';
import { UserService } from './user.service';

let store: any = {};

const localStorageMock = {
  setItem:  jest.fn((key: string, value: any) => store[key] = value),
  getItem: jest.fn((key: string, value: any) => store[key]),
}

const routerMock = {
  navigate: async (route : any) => await true
}

describe('LoginService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: window.Storage, useValue: localStorageMock
        },
        {
          provide: Router, useValue: routerMock
        },
        UserService
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should user login', fakeAsync(() => {

    Object.defineProperty(window, 'localStorage', {value: localStorageMock});

    const spyLogin = jest.spyOn(service, 'login');
    const spySetLocalStorage = jest.spyOn(localStorageMock, 'setItem')

    const loginData: LoginData = {
      login: 'jonny',
      password: '1234',
      rememberme: false
    }

    service.login(loginData);

    expect(spyLogin).toBeCalledWith(loginData)
    expect(spySetLocalStorage).toBeCalledTimes(2);

    tick();

  }))

});
