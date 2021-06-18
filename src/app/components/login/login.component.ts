import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberLogin = false;

  formLoginGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formLoginGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(event: Event){
    event.preventDefault();

    console.table(this.formLoginGroup.value)
  }

}
