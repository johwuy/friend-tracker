import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CreateInteractionDialogData, Interaction, InteractionDTO } from '@shared/models/interaction';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-interaction',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './interaction.dialog.html',
  styleUrl: './interaction.dialog.scss'
})
export class InteractionDialog {
  protected readonly data = signal(inject<CreateInteractionDialogData | Interaction>(MAT_DIALOG_DATA));
  protected readonly interactionForm = new FormGroup({
    date: new FormControl<string>(DateTime.now().toFormat('yyyy-MM-dd'), { nonNullable: true, validators: Validators.required }),
    content: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  get rawValue(): Interaction | InteractionDTO {
    const existingData = this.data();
    const data = {
      ...this.interactionForm.getRawValue(),
      date: DateTime.fromFormat(this.dateControl!.value, 'yyyy-MM-dd'),
      contactId: this.data().contactId,
    };

    return ('id' in existingData) ? {...data, id: existingData.id} : data;
  }

  get dateControl() {
    return this.interactionForm.get('date');
  }

  get contentControl() {
    return this.interactionForm.get('content');
  }
}
