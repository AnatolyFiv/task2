import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactFormComponent } from './add-contact-form.component';
import { ContactService } from '../../services/contact.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';
import { ErrorControlMessagesComponent } from '../error-control-messages/error-control-messages.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { ValidationService } from '../../services/validation.service';
import { Contact } from '../../interfaces/contact';
import { testContactObject } from '../../utile/constants';

describe('AddContactFormComponent', () => {
  let component: AddContactFormComponent;
  let fixture: ComponentFixture<AddContactFormComponent>;
  let service: ContactService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddContactFormComponent,
        PhoneMaskDirective,
        ErrorControlMessagesComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false })
      ],
      providers: [ValidationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactFormComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ContactService);
    fixture.detectChanges();
  });

  it('AddContactFormComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
    component.addNewContact();
    fixture.detectChanges();
  });

  it('Surname field is required', () => {
    let errors;
    const surname = component.contactForm.controls['surname'];
    const phoneNumber = component.contactForm.controls['phoneNumber'];

    errors = surname.errors || {};
    expect(errors['required']).toBeTruthy();
    surname.setValue(testContactObject.incorrectName);
    phoneNumber.setValue(testContactObject.correctNumber);
    errors = surname.errors || {};
    expect(errors['required']).toBeTruthy();
    component.addNewContact();
    fixture.detectChanges();
  });

  it('Surname field set correct value', () => {
    const surname = component.contactForm.controls['surname'];

    surname.setValue(testContactObject.correctName);
    expect(surname.valid).toBeTruthy();
    component.addNewContact();
    fixture.detectChanges();
  });

  it('PhoneNumber field incorrect value', () => {
    const surname = component.contactForm.controls['surname'];
    const phoneNumber = component.contactForm.controls['phoneNumber'];

    surname.setValue(testContactObject.correctName);
    phoneNumber.setValue(testContactObject.incorrectNumber);
    expect(phoneNumber.valid).toBeFalsy();
    component.addNewContact();
    fixture.detectChanges();
  });

  it('Form is valid', () => {
    const surname = component.contactForm.controls['surname'];
    const phoneNumber = component.contactForm.controls['phoneNumber'];

    surname.setValue(testContactObject.correctName);
    phoneNumber.setValue(testContactObject.correctNumber);
    expect(component.contactForm.valid).toBeTruthy();
    component.addNewContact();
    fixture.detectChanges();
  });

  it('Submitting a valid form check observable value', (done) => {
    let currentFormValue;

    component.contactForm.controls['surname'].setValue('Фамилия');
    component.contactForm.controls['phoneNumber'].setValue('(321) 321-31-23');
    component.contactForm.controls['name'].setValue('Имя');
    component.contactForm.controls['patronymic'].setValue('Отчество');
    expect(component.contactForm.valid).toBeTruthy();

    service.addContact(component.contactForm.value as Contact).subscribe(newContact => {
      service.sendContactData(newContact);
    });

    service.getContactData().subscribe(newContact => {
      currentFormValue = newContact;
      expect(currentFormValue.surname).toBe('Фамилия');
      expect(currentFormValue.phoneNumber).toBe('(321) 321-31-23');
      expect(currentFormValue.name).toBe('Имя');
      expect(currentFormValue.patronymic).toBe('Отчество');
      done();
    });

  });

});
