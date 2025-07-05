import { RelationshipStatus } from "@shared/constants/relationship-status";

export interface ContactFormData {
  name: string;
  birthday?: Date;
  email?: string;
  phoneNumber?: string;
  relationship?: RelationshipStatus;
}
