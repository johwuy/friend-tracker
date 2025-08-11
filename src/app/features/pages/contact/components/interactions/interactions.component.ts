import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InteractionDialog } from './interaction/interaction.dialog';
import { Interaction } from '@shared/models/interaction';
import { InteractionsService } from '@core/services/interactions.service';

@Component({
  selector: 'app-interactions',
  imports: [MatButtonModule],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.scss'
})
export class InteractionsComponent implements OnInit {
  private readonly dialogService = inject(MatDialog);
  private readonly interactionsService = inject(InteractionsService);

  readonly contactId = input.required<string>();

  private readonly _interactionsSignal = signal<Interaction[]>([]);
  readonly interactions = this._interactionsSignal.asReadonly();

  ngOnInit(): void {
    this.interactionsService.fectchInteractions(this.contactId()).subscribe(result => {
      this._interactionsSignal.set(result);
    })
  }

  protected handleDialog() {
    this.dialogService.open(InteractionDialog, {
      width: '50%'
    });
  }
}
