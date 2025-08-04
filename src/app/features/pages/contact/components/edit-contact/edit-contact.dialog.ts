import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-contact',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './edit-contact.dialog.html',
  styleUrl: './edit-contact.dialog.scss'
})
export class EditContactDialog {

}
