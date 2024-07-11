import { SeatDescriptionProps } from "../type";

const SeatDescription = ({ color, label }: SeatDescriptionProps) => {
  return (
    <div className="flex flex-col items-center w-fit">
      <div className={`${color} w-6 h-6 rounded-full`} />
      <span className="text-sm mt-1 text-gray-800">{label}</span>
    </div>
  );
};

export default SeatDescription;
