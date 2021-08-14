import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { By } from '@angular/platform-browser';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should checkbox to be checked when \'isSelected\' is true', () => {

    component.isSelected = true;

    fixture.detectChanges();

    const checkboxIsChecked = (fixture.debugElement
      .query(By.css('input'))
      .nativeElement as HTMLInputElement)
      .checked;

    fixture.detectChanges();

    expect(checkboxIsChecked).toBeTruthy();
  });

  test('should checkbox not to be checked when \'isSelected\' is false', () => {

    component.isSelected = false;

    const checkboxIsChecked = (fixture.debugElement
      .query(By.css('input'))
      .nativeElement as HTMLInputElement)
      .checked;

    fixture.detectChanges();

    expect(checkboxIsChecked).toBeFalsy();
  });

  test('should toggle isSelected to true', () => {

    const spyToggleCheckbox = jest.spyOn(component, 'toggleCheckBox');

    component.isSelected = false;

    component.toggleCheckBox();

    expect(spyToggleCheckbox).toBeCalledTimes(1);
    expect(component.isSelected).toBeTruthy();
  });

  test('should toggle isSelected to false', () => {

    const spyToggleCheckbox = jest.spyOn(component, 'toggleCheckBox');

    component.isSelected = true;

    component.toggleCheckBox();

    expect(spyToggleCheckbox).toBeCalledTimes(1);
    expect(component.isSelected).toBeFalsy();
  });


});
