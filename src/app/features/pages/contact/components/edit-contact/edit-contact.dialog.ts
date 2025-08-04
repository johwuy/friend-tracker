import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContactsService } from '@core/services/contacts.service';
import { RelationshipStatus, RelationshipStatuses } from '@shared/constants/relationship-status';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-edit-contact',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './edit-contact.dialog.html',
  styleUrl: './edit-contact.dialog.scss'
})
export class EditContactDialog implements OnInit {
  protected contactsService = inject(ContactsService);
  readonly id = signal(inject<string>(MAT_DIALOG_DATA));

  protected statuses = RelationshipStatuses;

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
    this.contactsService.getContact(this.id()).subscribe(contact => {
      this.contactForm.setValue(contact);
    });
  }

  get birthday() {
    return this.contactForm.get('birthday');
  }
}
