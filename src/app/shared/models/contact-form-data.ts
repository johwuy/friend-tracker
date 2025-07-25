import { RelationshipStatus } from "@shared/constants/relationship-status";
import { DateTime } from "luxon";

export interface ContactFormData {
  name: string;
  birthday?: DateTime;
  email?: string;
  phoneNumber?: string;
  relationship?: RelationshipStatus;
}
