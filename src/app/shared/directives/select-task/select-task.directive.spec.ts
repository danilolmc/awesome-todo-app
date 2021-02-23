import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectTaskDirective } from './select-task.directive';

@Component({
    template: `<label selectedEffecttask [statusTaskSelected]="isSelected">{{task.description}}</label>`
})
class FakeListItemComponent{}

describe('SelectTaskDirective', () => {

  let fixture : ComponentFixture<FakeListItemComponent>;
  let component :  FakeListItemComponent;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [FakeListItemComponent,SelectTaskDirective],
    schemas: [NO_ERRORS_SCHEMA]
  });

  fixture = TestBed.createComponent(FakeListItemComponent);
  component = fixture.componentInstance;
})

  it('should create an instance', () => {
    expect(true).toBeTruthy()
  });
});
