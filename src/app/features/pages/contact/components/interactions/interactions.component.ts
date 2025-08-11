import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InteractionsService } from '@core/services/interactions.service';
import { Interaction, InteractionDTO } from '@shared/models/interaction';
import { InteractionDialog } from './interaction/interaction.dialog';

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
    const diagRef = this.dialogService.open(InteractionDialog, {
      width: '50%'
    });

    diagRef.afterClosed().subscribe((result: InteractionDTO) => {
      this.interactionsService.addInteraction(this.contactId(), result).subscribe(interaction => {
        this._interactionsSignal.update(interactions => [interaction, ...interactions]);
      })
    });
  }

  updateInteraction(data: Interaction) {
    const { id, ...dto } = data;
    this.interactionsService.updateInteraction(this.contactId(), id, dto).subscribe(() => {
      this._interactionsSignal.update(interactions => {
        return interactions.map(interaction => interaction.id === id ? data : interaction)
      });
    });
  }
}
