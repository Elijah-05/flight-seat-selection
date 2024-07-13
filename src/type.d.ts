export type SeatPropertyTypes = {
  id: string;
  status: "available" | "occupied" | "unavailable" | "vip";
  unsuitableForHandicap?: boolean;
  armTry?: boolean;
  babyHammock?: boolean; // false for now
  handicapArmRest?: boolean;
  noBreakOver?: boolean;
  limitedRecline?: boolean; // false for now
  noRecline?: boolean;
};

export type SeatDescriptionProps = {
  color: string;
  label: string;
};
