import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RelationshipStatus } from '@shared/constants/relationship-status';

@Component({
  selector: 'app-create-contact',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './create-contact.dialog.html',
  styleUrl: './create-contact.dialog.scss'
})
export class CreateContactDialog {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    birthday: new FormControl<Date | null>(null),
    email: new FormControl<string | null>(null, Validators.email),
    phoneNumber: new FormControl<string | null>(null),
    relationship: new FormControl<RelationshipStatus | null>(null)
  });
}
