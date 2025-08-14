import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InteractionDialog } from '@features/pages/contact/components/interactions/interaction/interaction.dialog';
import { Interaction, InteractionIdentifier } from '@shared/models/interaction';

@Component({
  selector: 'app-interaction',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './interaction.component.html',
  styleUrl: './interaction.component.scss'
})
export class InteractionComponent {
  private readonly dialogService = inject(MatDialog);
  readonly interaction = input.required<Interaction>();
  readonly deleteInteractionClick = output<InteractionIdentifier>();
  readonly updateInteractionEvent = output<Interaction>();

  deleteInteraction() {
    const identifiers: InteractionIdentifier = {
      contactId: this.interaction().contactId,
      id: this.interaction().id
    }
    this.deleteInteractionClick.emit(identifiers);
  }

  updateInteraction() {
    const diagRef = this.dialogService.open<InteractionDialog, Interaction>(InteractionDialog, {
      width: '50%',
      data: this.interaction()
    });

    diagRef.afterClosed().subscribe((result: Interaction) => {
      if (result) {
        this.updateInteractionEvent.emit(result);
      }
    })
  }
}
