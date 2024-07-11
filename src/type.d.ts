export type SeatPropertyTypes = {
  id: string;
  status: "available" | "occupied" | "unavailable" | "vip";
};

export type SeatDescriptionProps = {
  color: string;
  label: string;
};
