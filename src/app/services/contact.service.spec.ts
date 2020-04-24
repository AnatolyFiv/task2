import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { Contact } from '../interfaces/contact';
import { fakedFetchedList, newContact } from '../utils/constants';

describe('ContactService', () => {

  let appService: ContactService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false })
      ],
      providers: [ ContactService ]
    });

    appService = TestBed.get(ContactService);
  });

  it('Should be created', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });

  it('Test service function getContacts', (done) => {
    const spy = spyOn(appService, 'getContacts').and.returnValue(
      of(fakedFetchedList)
    );

    appService.getContacts().subscribe(newContactList => {
      expect(newContactList).toEqual(fakedFetchedList);
      done();
    });
  });

  it('Test service function addContact', (done) => {
    appService.addContact(newContact as Contact).subscribe(contact => {
      expect(contact.id).toBeTruthy();
      done();
    });
  });

});
