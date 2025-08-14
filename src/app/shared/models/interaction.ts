import { DateTime } from "luxon";

export interface CreateInteractionDialogData {
  contactId: string;
}

export interface InteractionIdentifier {
  id: string;
  contactId: string;
}

export interface InteractionBody {
  content: string;
  date: DateTime;
}

export interface StringInteractionBody {
  content: string;
  date: string;
}

export interface Interaction extends InteractionIdentifier, InteractionBody {}

export interface StringInteraction extends InteractionIdentifier, StringInteractionBody {}

export interface InteractionDTO extends InteractionBody  {
  contactId: string;
}

export interface StringInteractionDTO extends StringInteractionBody  {
  contactId: string;
}

