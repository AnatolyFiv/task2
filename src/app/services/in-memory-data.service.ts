import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(): any {
    const contacts = [
      { id: 1, name: 'Имя 1', surname: 'Фамилия 1', patronymic: 'Отчество 1', phoneNumber: '+7(321) 213-21-31', isFavorite: false },
      { id: 2, name: 'Имя 2', surname: 'Фамилия 2', patronymic: 'Отчество 2', phoneNumber: '+7(911) 232-51-21', isFavorite: false },
      { id: 3, name: 'Имя 3', surname: 'Фамилия 3', patronymic: 'Отчество 3', phoneNumber: '+7(222) 643-25-62', isFavorite: false },
      { id: 4, name: 'Имя 4', surname: 'Фамилия 4', patronymic: 'Отчество 4', phoneNumber: '+7(214) 223-31-31', isFavorite: false },
      { id: 5, name: 'Имя 5', surname: 'Фамилия 5', patronymic: 'Отчество 5', phoneNumber: '+7(653) 254-22-25', isFavorite: false },
      { id: 6, name: 'Имя 6', surname: 'Фамилия 6', patronymic: 'Отчество 6', phoneNumber: '+7(762) 653-53-36', isFavorite: true },
      { id: 7, name: 'Имя 7', surname: 'Фамилия 7', patronymic: 'Отчество 7', phoneNumber: '+7(531) 763-23-37', isFavorite: false },
      { id: 8, name: 'Имя 8', surname: 'Фамилия 8', patronymic: 'Отчество 8', phoneNumber: '+7(376) 265-23-41', isFavorite: false },
      { id: 9, name: 'Имя 9', surname: 'Фамилия 9', patronymic: 'Отчество 9', phoneNumber: '+7(685) 677-26-21', isFavorite: false },
      { id: 10, name: 'Имя 10', surname: 'Фамилия 10', patronymic: 'Отчество 10', phoneNumber: '+7(764) 342-23-11', isFavorite: false },
      { id: 11, name: 'Имя 11', surname: 'Фамилия 11', patronymic: 'Отчество 11', phoneNumber: '+7(365) 762-54-35', isFavorite: false },
    ];
    return { contacts };
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 1;
  }
}
