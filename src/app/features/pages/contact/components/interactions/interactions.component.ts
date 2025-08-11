import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InteractionDialog } from './interaction/interaction.dialog';


@Component({
  selector: 'app-interactions',
  imports: [],
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
