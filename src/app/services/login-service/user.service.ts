import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';
import { LoginData } from 'src/app/core/LoginData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiFakeUrl;

  constructor(private router : Router) { }

  login(loginData: LoginData) {

    // Esse código não é o ideal, isso devido a estar usando o JSON Server.
    localStorage.setItem('user', `${loginData.login}`);
    localStorage.setItem('auth', 'authenticated');

    this.router.navigate(['/todo-list',loginData.login]);
  }
}
