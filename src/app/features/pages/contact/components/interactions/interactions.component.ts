import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InteractionDialog } from './interaction/interaction.dialog';

@Component({
  selector: 'app-interactions',
  imports: [MatButtonModule],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.scss'
})
export class InteractionsComponent {
  private readonly dialogService = inject(MatDialog);

  protected handleDialog() {
    this.dialogService.open(InteractionDialog, {
      width: '50%'
    });
  }
}
