import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string): any {
    const messageList = {
      required: 'Поле обязательно для заполнения',
      invalidPhone: 'Введён не правильный номер'
    };

    return messageList[validatorName];
  }

  static nameValidator(control: any): any {
    if (control.value && control.value.trim() !== '') {
      return null;
    }

    return { required: true };
  }

  static phoneValidation(control: any): any {
    if (control.value.match(/^\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  }
}
