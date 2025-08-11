import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-interaction',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './interaction.dialog.html',
  styleUrl: './interaction.dialog.scss'
})
export class InteractionDialog {
  protected readonly interactionForm = new FormGroup({
    date: new FormControl<DateTime>(DateTime.local()),
    content: new FormControl<string>('')
  });

  get dateControl() {
    return this.interactionForm.get('date');
  }

  get contentControl() {
    return this.interactionForm.get('content');
  }
}
