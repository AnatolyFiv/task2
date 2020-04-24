import { Component, Input } from '@angular/core';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-error-control-messages',
  templateUrl: './error-control-messages.component.html',
  styleUrls: ['./error-control-messages.component.css']
})
export class ErrorControlMessagesComponent {
  @Input() control: any;

  constructor() {
  }

  public get errorMessage(): any {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return ValidationService.getValidatorErrorMessage(propertyName);
      }
    }

    return null;
  }
}
