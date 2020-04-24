import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { messageList } from '../utile/constants';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Should be created', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    expect(service).toBeTruthy();
  });

  it('Test validation phone function incorrect value', () => {
    const phoneNumber = { value: '(321) 321' };
    expect(ValidationService.phoneValidation(phoneNumber).invalidPhone).toBeTruthy();
  });

  it('Test validation phone function correct value', () => {
    const phoneNumber = { value: '(321) 321-31-23' };
    expect(ValidationService.phoneValidation(phoneNumber) === null).toBeTruthy();
  });

  it('Test validation surname function incorrect value', () => {
    const surname = { value: ' ' };
    expect(ValidationService.nameValidator(surname).required).toBeTruthy();
  });

  it('Test validation surname function correct value', () => {
    const surname = { value: 'Dima' };
    expect(ValidationService.nameValidator(surname) === null).toBeTruthy();
  });

  it('Return validation message required', () => {
    const required = 'required';
    expect(ValidationService.getValidatorErrorMessage(required) === messageList.required).toBeTruthy();
  });

  it('Return validation message invalidPhone', () => {
    const invalidPhone = 'invalidPhone';
    expect(ValidationService.getValidatorErrorMessage(invalidPhone) === messageList.invalidPhone).toBeTruthy();
  });
});
