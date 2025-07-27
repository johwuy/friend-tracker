import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContactsService } from '@core/services/contacts.service';
import { RelationshipStatus, RelationshipStatuses } from '@shared/constants/relationship-status';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-create-contact',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './create-contact.dialog.html',
  styleUrl: './create-contact.dialog.scss'
})
export class CreateContactDialog {
  private readonly contactsService = inject(ContactsService);
  protected readonly statuses = RelationshipStatuses;

  contactForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true
    }),
    birthday: new FormControl<DateTime | null>(null),
    email: new FormControl<string | null>(null, Validators.email),
    phoneNumber: new FormControl<string | null>(null),
    relationship: new FormControl<RelationshipStatus | null>(null)
  });

  get isInvalidForm() {
    return this.contactForm.invalid;
  }

  get name() {
    return this.contactForm.get('name');
  }

  get birthday() {
    return this.contactForm.get('birthday');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get relationship() {
    return this.contactForm.get('relationship');
  }

  protected submitContact() {
    this.contactsService.addContact(this.contactForm.getRawValue()).subscribe();
  }
}
