import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { darkTheme } from 'src/app/themes/dark';
import { ThemesOptions } from 'src/app/themes/EnumThemes';
import { lightTheme } from 'src/app/themes/light';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service.activatedTheme).toBeDefined()
    expect(service).toBeTruthy();
  });

  test('should return lighTheme when theme is light', () => {

    const spyGetTheme =  jest.spyOn(service, 'getTheme');

    service.activatedTheme.next(ThemesOptions.LIGHT_THEME);

    service.getTheme();

    expect(spyGetTheme).toBeCalledTimes(1);
    expect(spyGetTheme).toReturnWith(lightTheme);

  })

  test('should return darkTheme when theme is dark', () => {

    const spyGetTheme =  jest.spyOn(service, 'getTheme');

    service.activatedTheme.next(ThemesOptions.DARK_THEME);

    service.getTheme();

    expect(spyGetTheme).toBeCalledTimes(1);
    expect(spyGetTheme).toReturnWith(darkTheme);

  })

  test('should set theme to light', () => {

    const spySetTheme =  jest.spyOn(service, 'setTheme');

    service.activatedTheme.next(ThemesOptions.DARK_THEME)

    service.setTheme();

    expect(spySetTheme).toBeCalledTimes(1)
    expect(service.activatedTheme.value).toEqual(ThemesOptions.LIGHT_THEME)

  });

  test('should set theme to dark', () => {

    const spySetTheme =  jest.spyOn(service, 'setTheme');

    service.activatedTheme.next(ThemesOptions.LIGHT_THEME)

    service.setTheme();

    expect(spySetTheme).toBeCalledTimes(1)
    expect(service.activatedTheme.value).toEqual(ThemesOptions.DARK_THEME)

  });

});
