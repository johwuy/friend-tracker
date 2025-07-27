import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Contact, RawContact } from '@shared/models/contact';
import { ContactFormData, RawContactFormData } from '@shared/models/contact-form-data';
import { DateTime } from 'luxon';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private httpService = inject(HttpClient);
  private contactsSignal = signal<Contact[]>([]);
  readonly contacts = this.contactsSignal.asReadonly();
  private readonly API_URL = 'http://localhost:5149/api/contacts';

  constructor() {
    this.getContacts().subscribe(result => this.contactsSignal.set(result));
  }

  private convertResponse(response: RawContact): Contact {
    return { ...response, birthday: response.birthday ? DateTime.fromISO(response.birthday) : response.birthday } as Contact;
  }

  getContacts() {
    return this.httpService.get<RawContact[]>(this.API_URL)
      .pipe(map(result => result.map(contact => this.convertResponse(contact))));
  }

  getContact(id: string): Observable<Contact> {
    return this.httpService.get<RawContact>(`${this.API_URL}/${id}`)
      .pipe(map(result => this.convertResponse(result)));
  }

  addContact(formData: ContactFormData): Observable<Contact> {
    const body: RawContactFormData = {
      ...formData,
      birthday: formData.birthday ? formData.birthday.toISO() : null,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.httpService
      .post<RawContact>(this.API_URL, body, httpOptions)
      .pipe(
        map(raw => {
          const parsed = raw.birthday ? DateTime.fromISO(raw.birthday) : null;
          return {
            ...raw,
            birthday: parsed && parsed.isValid ? parsed : null,
          };
        }),
        tap(contact => this.contactsSignal.update(list => [...list, contact])),
        catchError(err => throwError(() => err)),
      );
  }

  updateContact(id: string, formData: Partial<ContactFormData>) {
    // Make PATCH Http Request, on success update `contacts`
    console.log(id, formData);
  }

  deleteContact(id: string) {
    // Make DELETE request to delete contact
    const previous = this.contacts();
    this.contactsSignal.update(contacts => contacts.filter(contact => contact.id != id))

    return this.httpService.delete<void>(`${this.API_URL}/${id}`).pipe(catchError(error => {
      this.contactsSignal.set(previous);
      return throwError(() => error);
    }));
  }
}
