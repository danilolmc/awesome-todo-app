import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from 'src/app/components/login/login.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    LoginModule
  ]
})
export class HomeModule { }
