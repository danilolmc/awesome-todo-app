import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleTaskService {

  taskCheckedStatus  : EventEmitter<boolean> = new EventEmitter(false);

  constructor() { }

  toggleCheckBoxStatus(status: boolean){

    this.taskCheckedStatus.emit(status);

  }
}
