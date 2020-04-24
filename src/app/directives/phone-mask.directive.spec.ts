import { PhoneMaskDirective } from './phone-mask.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddContactFormComponent } from '../components/add-contact-form/add-contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorControlMessagesComponent } from '../components/error-control-messages/error-control-messages.component';
import { HttpClientModule } from '@angular/common/http';

describe('Phone directive', () => {
  let component: AddContactFormComponent;
  let fixture: ComponentFixture<AddContactFormComponent>;

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
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test phone input with different values', () => {
    const phoneNumber = component.contactForm.controls['phoneNumber'];
    const firstNumber = '(321) 321-31-23';
    phoneNumber.setValue(firstNumber);
    expect(component.contactForm.controls['phoneNumber'].value === firstNumber).toBeTruthy();
    fixture.detectChanges();

    const secondNumber = '(321) 321';
    phoneNumber.setValue(secondNumber);
    expect(component.contactForm.controls['phoneNumber'].value === secondNumber).toBeTruthy();
    fixture.detectChanges();

    const threadNumber = '(321) 321-4';
    phoneNumber.setValue(threadNumber);
    expect(component.contactForm.controls['phoneNumber'].value === threadNumber).toBeTruthy();
    fixture.detectChanges();
  });

});
