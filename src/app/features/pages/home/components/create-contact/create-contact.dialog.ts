import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RelationshipStatus, RelationshipStatuses } from '@shared/constants/relationship-status';

@Component({
  selector: 'app-create-contact',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './create-contact.dialog.html',
  styleUrl: './create-contact.dialog.scss'
})
export class CreateContactDialog {
  protected readonly statuses = RelationshipStatuses;

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    birthday: new FormControl<Date | null>(null),
    email: new FormControl<string | null>(null, Validators.email),
    phoneNumber: new FormControl<string | null>(null),
    relationship: new FormControl<RelationshipStatus | null>(null)
  });
}
