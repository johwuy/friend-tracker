import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RelationshipStatus } from '@shared/constants/relationship-status';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-edit-contact',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './edit-contact.dialog.html',
  styleUrl: './edit-contact.dialog.scss'
})
export class EditContactDialog {
  readonly id = signal(inject<string>(MAT_DIALOG_DATA));
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
}
