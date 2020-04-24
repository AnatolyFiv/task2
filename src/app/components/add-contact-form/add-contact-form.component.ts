import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css']
})
export class AddContactFormComponent implements OnInit {
  public countryNumber = '+7';
  public isValidForm = true;
  public contactForm: FormGroup;

  public get phoneNumber(): any {
    return this.contactForm.get('phoneNumber');
  }

  public get surname(): any {
    return this.contactForm.get('surname');
  }

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {
  }

  ngOnInit(): void {
    this._createForm();
  }

  public addNewContact(): void {
    if (!this.contactForm.valid) {
      this.isValidForm = false;
      return;
    }
    this.contactForm.value.isFavorite = false;
    this.isValidForm = true;
    this.contactForm.value.phoneNumber = this.countryNumber + this.contactForm.value.phoneNumber;

    this.contactService.addContact(this.contactForm.value as Contact).subscribe(newContact => {
      this.sendData(newContact);
    });
    this._createForm();
  }

  public resetFormValidation(): void {
    this.isValidForm = true;
  }

  private _createForm(): void {
    this.contactForm = this.formBuilder.group({
      surname: ['', [ValidationService.nameValidator]],
      name: '',
      patronymic: '',
      phoneNumber: ['', [ValidationService.phoneValidation, Validators.required]]
    });
  }

  private sendData(contact: Contact): void {
    this.contactService.sendContactData(contact);
  }

}
