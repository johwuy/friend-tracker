import { RelationshipStatus } from "@shared/constants/relationship-status";
import { DateTime } from "luxon";

export interface ContactFormData {
  name: string;
  birthday: DateTime | null;
  email: string | null;
  phoneNumber: string | null;
  relationship: RelationshipStatus | null;
}
