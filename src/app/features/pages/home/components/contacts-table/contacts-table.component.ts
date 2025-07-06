import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ContactsService } from '@core/services/contacts.service';
import { Contact } from '@shared/models/contact';
import { RelationshipStatus } from '@shared/constants/relationship-status';
import { RelationshipLabel } from '@shared/constants/relationship-label';

@Component({
  selector: 'app-contacts-table',
  imports: [MatTableModule, MatSortModule, DatePipe],
  templateUrl: './contacts-table.component.html',
  styleUrl: './contacts-table.component.scss'
})
export class ContactsTableComponent implements AfterViewInit {
  protected readonly columnsToDisplay = ['name', 'age', 'birthday', 'daysTillBirthday', 'relationship'];

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
    if (prop === 'birthday' && value instanceof Date) {
      return (value.getMonth() + 1) * 100 + value.getDate();
    }

    // Dates -> epoch milliseconds.
    if (value instanceof Date) {
      return value.getTime();
    }

    // Case‑insensitive string sorting.
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }

    return value;
  }

  protected getRelationshipLabel(relationship: RelationshipStatus): string {
    return RelationshipLabel[relationship];
  }

  protected daysTillBirthday(birthday: Date) {
    const today = new Date();

    // Strip time for more consistant comparison.
    birthday.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(today.getFullYear());

    // If birthday past already, set it to next year.
    if (nextBirthday.getTime() < today.getTime()) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    // Get millisecond difference
    const timeDifference = nextBirthday.getTime() - today.getTime();

    // Convert millisecond difference to day difference
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
  }

  protected getContactAge(birthday: Date): number {
    const today = new Date()
    let age = today.getFullYear() - birthday.getFullYear()

    // Adjust if today's month/day is before the birthday's month/day
    const monthDiff = today.getMonth() - birthday.getMonth()
    const dayDiff = today.getDate() - birthday.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--
    }

    return age
  }
}
