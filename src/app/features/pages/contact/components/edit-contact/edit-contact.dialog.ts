import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ContactsService } from '@core/services/contacts.service';
import { RelationshipStatus, RelationshipStatuses } from '@shared/constants/relationship-status';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-edit-contact',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './edit-contact.dialog.html',
  styleUrl: './edit-contact.dialog.scss'
})
export class EditContactDialog implements OnInit {
  protected readonly contactsService = inject(ContactsService);
  private readonly id = signal(inject<string>(MAT_DIALOG_DATA));

  protected loading = false;
  protected readonly statuses = RelationshipStatuses;

  contactForm = new FormGroup({
    id: new FormControl(this.id(), {
      validators: Validators.required,
      nonNullable: true
    }),
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true
    }),
    birthday: new FormControl<DateTime | null>(null),
    email: new FormControl<string | null>(null, Validators.email),
    phoneNumber: new FormControl<string | null>(null),
    relationship: new FormControl<RelationshipStatus | null>(null)
  });

  ngOnInit(): void {
    this.loading = true;
    this.contactsService.getContact(this.id()).subscribe(contact => {
      this.contactForm.setValue(contact);
      this.loading = false;
    });
  }

  get birthday() {
    return this.contactForm.get('birthday');
  }
}
