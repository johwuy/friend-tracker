import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Contact, StringContact } from '@shared/models/contact';
import { ContactFormData, StringContactFormData } from '@shared/models/contact-form-data';
import { compare } from 'fast-json-patch';
import { DateTime } from 'luxon';
import { Observable, of, throwError } from 'rxjs';
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

  private stringContactToObject(response: StringContact): Contact {
    const parsedDate = response.birthday ? DateTime.fromISO(response.birthday) : null;
    return { ...response, birthday: parsedDate && parsedDate.isValid ? parsedDate : null };
  }

  private objectContactToString(object: Contact | ContactFormData) {
    return {
      ...object,
      birthday: object.birthday ? object.birthday.toISO() : null,
    };
  }

  getContacts() {
    return this.httpService.get<StringContact[]>(this.API_URL)
      .pipe(map(result => result.map(contact => this.stringContactToObject(contact))));
  }

  getContact(id: string): Observable<Contact> {
    return this.httpService.get<StringContact>(`${this.API_URL}/${id}`)
      .pipe(map(result => this.stringContactToObject(result)));
  }

  addContact(formData: ContactFormData): Observable<Contact> {
    const body: StringContactFormData = this.objectContactToString(formData);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.httpService
      .post<StringContact>(this.API_URL, body, httpOptions)
      .pipe(
        map(raw => this.stringContactToObject(raw)),
        tap(contact => this.contactsSignal.update(list => [...list, contact])),
        catchError(err => throwError(() => err)),
      );
  }

  updateContact(id: string, originalData: Contact, modifiedData: Contact) {
    const strOriginal = this.objectContactToString(originalData);
    const strModified = this.objectContactToString(modifiedData);
    const patchDoc = compare(strOriginal, strModified);

    // nothing changed
    if (!patchDoc || patchDoc.length === 0) {
      return of(modifiedData);
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' }),
    };

    return this.httpService
      .patch<Contact>(`${this.API_URL}/${id}`, patchDoc, httpOptions)
      .pipe(
        tap(updatedFromServer => {
          this.contactsSignal.update(contacts =>
            contacts.map(c => (c.id === id ? updatedFromServer : c))
          );
        })
      );
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
