export const RelationshipStatuses = ["Family", "Friend", "Colleague", "Pet"] as const;
export type RelationshipStatus = typeof RelationshipStatuses[number];
