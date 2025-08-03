import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '@core/services/contacts.service';
import { Contact, CONTACT_LABEL_MAPPING, StringContact } from '@shared/models/contact';

@Component({
  selector: 'app-contact',
  imports: [MatProgressSpinnerModule, MatDividerModule, MatTableModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage implements OnInit {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar)
  private activatedRoute = inject(ActivatedRoute);
  private contactsService = inject(ContactsService);

  protected readonly displayedColumns: string[] = ['label', 'value'];

  protected data = signal<Contact | null>(null);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fetchContact(params['id']);
    });
  }

  get dataSource(): { label: string, value: string }[] {
    const excludeKey = new Set(['id', 'name']);

    const currentDate = this.data();
    if (!currentDate) return [];
    const birthdayString = currentDate.birthday ? currentDate.birthday.toLocaleString() : currentDate.birthday;
    const processedData: StringContact = { ...currentDate, birthday: birthdayString };
    return Object.entries(processedData).filter(([key, value]) => !excludeKey.has(key) && value).map(([key, value]) => {
      const label = CONTACT_LABEL_MAPPING[key as keyof Contact];
      return { label: label, value: value }
    })
  }

  private fetchContact(id: string) {
    this.contactsService.getContact(id).subscribe({
      next: contact => this.data.set(contact),
      error: () => {
        this.router.navigate(['']);
        this.snackBar.open(`Failed to fetch ${id}`, 'Close');
      }
    });
  }

}
