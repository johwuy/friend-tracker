import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactsService } from '@core/services/contacts.service';
import { Contact } from '@shared/models/contact';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-contacts-table',
  imports: [MatTableModule, MatSortModule, DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './contacts-table.component.html',
  styleUrl: './contacts-table.component.scss'
})
export class ContactsTableComponent implements AfterViewInit {
  protected readonly columnsToDisplay = ['name', 'age', 'birthday', 'daysTillBirthday', 'relationship', 'delete_contact'];

  protected contactsService = inject(ContactsService);

  // dataSource only recieives a snapshop ot contacts.
  protected dataSource = new MatTableDataSource<Contact>(this.contactsService.contacts());

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // effects is needed to update dataSource when contacts udate.
    effect(() => {
      this.dataSource.data = this.contactsService.contacts();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    this.dataSource.sort = this.sort;
  }

  private sortingDataAccessor(item: Contact, property: string): string | number {
    if (property === 'daysTillBirthday' && item.birthday !== undefined) {
      return this.daysTillBirthday(item.birthday);
    }

    if (property === 'age' && item.birthday !== undefined) {
      return this.getContactAge(item.birthday);
    }

    const prop = property as keyof Contact;
    const value = item[prop];

    // Keep undefined or null at the bottom.
    if (value == undefined || value == null) {
      if (prop === 'relationship') {
        return this.sort.direction === 'desc' ? '' : '\uFFFF'
      }
      return this.sort.direction === 'desc' ? -Infinity : Infinity
    }

    // Birthday should only compare month and day.
    if (prop === 'birthday' && value instanceof DateTime) {
      return (value.month * 100) + value.day;
    }

    // Dates -> epoch milliseconds.
    if (value instanceof DateTime) {
      return value.toMillis();
    }

    // Case‑insensitive string sorting.
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }

    return value;
  }

protected daysTillBirthday(birthDate: DateTime): number {
  const today = DateTime.local().startOf('day');

  // Birthday in the current calendar year
  let next = birthDate.set({ year: today.year });

  // If that date is in the past, move to next year
  if (next < today) {
    next = next.plus({ years: 1 });
  }

  // Whole days until next birthday
  return Math.ceil(next.diff(today, 'days').days);
}

  protected getContactAge(birthDate: DateTime): number {
    const age = DateTime.now().diff(birthDate, 'years').years;
    return Math.floor(age);
  }

  protected deleteContact(id: string) {
    this.contactsService.deleteContact(id);
  }
}
