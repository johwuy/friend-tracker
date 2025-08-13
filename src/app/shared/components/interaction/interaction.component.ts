import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Interaction } from '@shared/models/interaction';

@Component({
  selector: 'app-interaction',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './interaction.component.html',
  styleUrl: './interaction.component.scss'
})
export class InteractionComponent {
  readonly interaction = input.required<Interaction>();
  readonly deleteInteractionClick = output<string>();

  deleteInteraction() {
    this.deleteInteractionClick.emit(this.interaction().id);
  }
}
