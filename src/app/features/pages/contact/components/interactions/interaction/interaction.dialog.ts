import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-interaction',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './interaction.dialog.html',
  styleUrl: './interaction.dialog.scss'
})
export class InteractionDialog {

}
