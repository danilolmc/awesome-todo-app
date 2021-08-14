import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/core/LoginData';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberLogin = false;

  formLoginGroup = {} as FormGroup;

  loginStatus = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formLoginGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(event: Event): void {
    event.preventDefault();

    const userLoginData: LoginData = {
      user: {
        login: this.formLoginGroup.get('login')?.value.toString(),
        password: this.formLoginGroup.get('password')?.value.toString()
      },
      rememberme: this.rememberLogin
    };

    this.loginStatus = !this.authService.login(userLoginData);

  }

}
