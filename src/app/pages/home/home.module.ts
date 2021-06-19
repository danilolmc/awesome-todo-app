import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from 'src/app/components/login/login.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule,
  ]
})
export class HomeModule { }
