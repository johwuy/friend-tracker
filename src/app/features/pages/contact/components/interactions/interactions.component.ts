import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InteractionsService } from '@core/services/interactions.service';
import { InteractionComponent } from '@shared/components/interaction/interaction.component';
import { CreateInteractionDialogData, Interaction, InteractionDTO } from '@shared/models/interaction';
import { InteractionDialog } from './interaction/interaction.dialog';

@Component({
  selector: 'app-interactions',
  imports: [MatButtonModule, InteractionComponent],
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
      console.log(result);
    })
  }

  protected handleDialog() {
    const diagRef = this.dialogService.open<InteractionDialog, CreateInteractionDialogData>(InteractionDialog, {
      width: '50%',
      data: {contactId: this.contactId()}
    });

    diagRef.afterClosed().subscribe((result: InteractionDTO) => {
      this.interactionsService.addInteraction(result).subscribe(interaction => {
        this._interactionsSignal.update(interactions => [interaction, ...interactions]);
      })
    });
  }

  updateInteraction(data: Interaction) {
    const { id, ...dto } = data;
    this.interactionsService.updateInteraction(id, dto).subscribe(() => {
      this._interactionsSignal.update(interactions => {
        return interactions.map(interaction => interaction.id === id ? data : interaction)
      });
    });
  }

  deleteInteraction(interactionId: string) {
    this.interactionsService.deleteInteraction(this.contactId(), interactionId).subscribe(() => {
      this._interactionsSignal.update(interactions => {
        return interactions.filter(interaction => interaction.id !== interactionId)
      });
    });
  }
}
