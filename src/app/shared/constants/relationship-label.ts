import { RelationshipStatus } from "./relationship-status";

export const RelationshipLabel: Record<RelationshipStatus, string> = {
  [RelationshipStatus.Family]: "Family",
  [RelationshipStatus.Friend]: "Friend",
  [RelationshipStatus.Colleague]: "Colleague",
  [RelationshipStatus.Pet]: "Pet",
};
