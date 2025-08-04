export const RelationshipStatuses = [
  {label: "Friend", value: "Friend"},
  {label: "Family", value: "Family"},
  {label: 'Colleague', value: "Colleague"},
  {label: 'Pet', value: "Pet"},
  {label: 'None', value: null}
] as const;

export type RelationshipStatus = (typeof RelationshipStatuses)[number]['value'];

