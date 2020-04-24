import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit, OnDestroy {

  constructor(private contactService: ContactService) {
  }
  public contactList: Array<Contact> = [];
  private subscription: Subscription;

  ngOnInit(): void {
    this.getContacts();
    this.subscription = this.contactService.getContactData().subscribe(newContact => this.contactList.push(newContact));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deleteContact(contactId: number): void {
    this.contactList = this.contactList.filter(contact => contact.id !== contactId);
    this.contactService.deleteContact(contactId).subscribe();
  }

  private getContacts(): void {
    this.contactService.getContacts().subscribe(newContactList => {
      this.contactList = this.updateFavoritesViews(newContactList);
    });
  }

  public updateFavorite(currentContact: Contact): void {
    const selectedContact = currentContact;
    selectedContact.isFavorite = !currentContact.isFavorite;
    this.contactList = this.contactList.filter(contact => contact.id !== currentContact.id);
    this.contactList.unshift(selectedContact);
    this.contactList = this.updateFavoritesViews(this.contactList);
    this.contactService.updateContact(selectedContact).subscribe();
  }

  public updateFavoritesViews(contacts: Array<Contact>): Array<Contact> {
    const isFavoriteContact = contacts
      .filter(value => value.isFavorite)
      .sort((currentContact, nextContact) => currentContact.id - nextContact.id);
    const isNotFavoriteContact = contacts
      .filter(value => !value.isFavorite)
      .sort((currentContact, nextContact) => currentContact.id - nextContact.id);

    return [...isFavoriteContact, ...isNotFavoriteContact];
  }

}
