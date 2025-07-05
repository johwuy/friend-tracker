import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RelationshipStatus } from '@shared/constants/relationship-status';
import { Contact } from '@shared/models/contact';
import { ContactFormData } from '@shared/models/contact-form-data';

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

  getContacts() {
    this.contactsSignal.set([
      { id: "1", name: "foo bar", birthday: new Date() },
      { id: "2", name: "bar boz", email: "barboz@foo.com", phoneNumber: "(XXX) XXX-XXXX", relationship: RelationshipStatus.Friend }
    ]);
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
    console.log(id);
  }
}
