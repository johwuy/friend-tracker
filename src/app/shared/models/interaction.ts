import { DateTime } from "luxon";

export interface CreateInteractionDialogData {
  contactId: string;
}

export interface Interaction {
  id: string;
  contactId: string;
  content: string;
  date: DateTime;
}

export interface StringInteraction extends Omit<Interaction, 'date'> {
  date: string;
}

export type InteractionDTO = Omit<Interaction, 'id'>;

export interface StringInteractionDTO extends Omit<Interaction, 'id' | 'date'> {
  date: string;
}

