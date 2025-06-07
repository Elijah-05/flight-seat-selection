import { SeatDescriptionProps } from "../type";

const SeatDescription = ({ color, label }: SeatDescriptionProps) => {
  return (
    <div className="flex gap-1 items-center w-fit">
      <div className={`${color} w-3 sm:w-4 h-3 sm:h-4 rounded-full`} />
      <p className="text-xs sm:text-sm text-gray-800">{label}</p>
    </div>
  );
};

export default SeatDescription;
