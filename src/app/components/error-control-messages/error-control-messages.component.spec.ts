import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorControlMessagesComponent } from './error-control-messages.component';

const messageList = {
  required: 'Поле обязательно для заполнения',
  invalidPhone: 'Введён не правильный номер'
};

describe('ErrorControlMessagesComponent', () => {
  let component: ErrorControlMessagesComponent;
  let fixture: ComponentFixture<ErrorControlMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorControlMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorControlMessagesComponent);
    component = fixture.componentInstance;
  });

  it('ErrorControlMessagesComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Show required message', () => {
    component.control = { errors: { required: true} };
    fixture.detectChanges();
    expect(component.errorMessage).toEqual(messageList.required);
  });

  it('Show invalid phone message', () => {
    component.control = { errors: { invalidPhone: true} };
    fixture.detectChanges();
    expect(component.errorMessage).toEqual(messageList.invalidPhone);
  });

});
