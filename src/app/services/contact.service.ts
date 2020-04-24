import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = 'api/contacts';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private subject = new Subject();

  constructor(private httpClient: HttpClient) {
  }

  public getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.contactUrl).pipe(
      retry(2),
      catchError(this.handleError<Contact[]>( []))
    );
  }

  public deleteContact(contactId: number): Observable<Contact> {
    const url = `${this.contactUrl}/${contactId}`;
    return this.httpClient.delete<Contact>(url, this.httpOptions);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.contactUrl, contact, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError<Contact>())
    );
  }

  public updateContact(contact: Contact): Observable<any> {
    return this.httpClient.put(this.contactUrl, contact, this.httpOptions);
  }

  public sendContactData(newContact: Contact): void {
    this.subject.next(newContact);
  }

  public getContactData(): Observable<any> {
    return this.subject.asObservable();
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
