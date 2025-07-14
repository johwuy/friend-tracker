import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Contact, RawContact } from '@shared/models/contact';
import { ContactFormData } from '@shared/models/contact-form-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private httpService = inject(HttpClient);
  private contactsSignal = signal<Contact[]>([]);
  readonly contacts = this.contactsSignal.asReadonly();

  constructor() {
    this.getContacts();
  }

  private convertResponse(response: RawContact): Contact {
    return {...response, birthday: response.birthday ? new Date(response.birthday): response.birthday} as Contact;
  }

  getContacts() {
    this.httpService.get<RawContact[]>('http://localhost:5031/contacts')
    .pipe(map(result => result.map(contact => this.convertResponse(contact))))
    .subscribe(result => this.contactsSignal.set(result))
  }

  getContact(id: string) {
    return this.contacts().find(contact => contact.id === id);
  }

  addContact(formData: ContactFormData) {
    // Make GET Http Request, which returns id
    // In `subscribe`, add to `contacts`
    console.log(formData);
  }

  updateContact(id: string, formData: Partial<ContactFormData>) {
    // Make PATCH Http Request, on success update `contacts`
    console.log(id, formData);
  }

  deleteContact(id: string) {
    // Make DELETE request to delete contact

    this.contactsSignal.update(oldContacts => {
      return oldContacts.filter(contact => contact.id !== id)
    })
  }
}
