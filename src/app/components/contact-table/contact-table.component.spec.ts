import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTableComponent } from './contact-table.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { ContactService } from '../../services/contact.service';
import { of } from 'rxjs';
import { fakedFetchedList } from '../../utils/constants';

describe('ContactTableComponent', () => {
  let component: ContactTableComponent;
  let fixture: ComponentFixture<ContactTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactTableComponent],
      imports: [HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {dataEncapsulation: false})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTableComponent);
    component = fixture.componentInstance;
  });

  it('ContactTableComponent should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Fake fetch data', (done) => {
    const quoteService = fixture.debugElement.injector.get(ContactService);
    const spy = spyOn(quoteService, 'getContacts').and.returnValue(
      of(fakedFetchedList)
    );

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.contactList).toEqual(fakedFetchedList);
      fixture.detectChanges();
      done();
    });
  });

  it('Delete element', (done) => {

    const quoteService = fixture.debugElement.injector.get(ContactService);
    const spy = spyOn(quoteService, 'getContacts').and.returnValue(
      of(fakedFetchedList)
    );

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.deleteContact(1);
      expect(component.contactList.length < fakedFetchedList.length).toBeTruthy();
      fixture.detectChanges();
      done();
    });
  });


  it('Add favorite element', (done) => {
    const quoteService = fixture.debugElement.injector.get(ContactService);
    const spy = spyOn(quoteService, 'getContacts').and.returnValue(
      of(fakedFetchedList)
    );

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.updateFavorite(fakedFetchedList[1]);
      expect(component.contactList.find(value => value.id === fakedFetchedList[1].id).isFavorite).toBeTruthy();
      fixture.detectChanges();
      done();
    });
  });

});
