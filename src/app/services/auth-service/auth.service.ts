import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/LoginData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiFakeUrl;

  userIsAuthenticated = false;

  constructor(private router : Router) { }

  login(loginData: LoginData) : boolean {

    if(loginData.login === 'dan' && loginData.password === '1234'){

      localStorage.setItem('token', '1234567890');

      this.router.navigate(['/todo-list',{user: loginData.login}]);

      return true;
    }

    return false;
  }
}
