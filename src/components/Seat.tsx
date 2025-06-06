import { HandicapIcon, NoHandicapIcon, TriangleIcon } from "../assets";
import { SeatPropertyTypes } from "../type";

type SeatProps = {
  seatData: SeatPropertyTypes;
  onClick: (id: string) => void;
  isSelected: boolean;
  tooltipMessage?: string | null;
};

const Seat = ({ seatData, onClick, isSelected, tooltipMessage }: SeatProps) => {
  const {
    id,
    status,
    armTrayLeft,
    armTrayRight,
    handicapArmRest,
    hideSeat,
    noBreakOver,
    noRecline,
    unsuitableForHandicap,
  } = seatData;

  const seatCharacter = () => {
    switch (status) {
      case "available":
        return `${
          isSelected
            ? "bg-[#5A92C6] outline-[1.5px] outline-dashed outline-green-600"
            : "bg-[#A8D5BA] group-hover:bg-[#7cc097] cursor-pointer"
        }`;
      case "occupied":
        return "bg-[#F3A6A6] cursor-not-allowe";
      case "unavailable":
        return "bg-[#D8D8D8] cursor-not-allowe";
      default:
        return "bg-[#D8D8D8] cursor-not-allowe";
    }
  };

  return (
    <div
      className={`relative group transition-all select-none duration-500`}
      onClick={() => status === "available" && !hideSeat && onClick(id)}
    >
      {/* Tooltip for error */}
      {tooltipMessage && (
        <div
          className={`absolute bottom-full w-[100px] ${id.includes("A") ? "left-0" : id.includes("F") ? "right-0" : "left-1/2 -translate-x-1/2"} mb-1 z-50 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-[0_4px_8px_rgba(0,0,0,0.2)] animate-fade-in`}
        >
          {tooltipMessage}
          <div
            className={`absolute top-full ${id.includes("A") ? "left-1/4" : id.includes("F") ? "right-1/4" : "left-1/2 -translate-x-1/2"} w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500`}
          />
        </div>
      )}

      <div
        className={`relative w-[13vw] xxs:w-[13vw] xs:w-14 sm:w-16 mt -[30%] h-[min(8.5vw,9vw)] xxs:h-[min(9.5vw,10vw)] xs:h-[max(6.8vw,42px)] sm:h-[47px] rounded-lg ${seatCharacter()} border border-b-0 grid place-content-center transition-all`}
      >
        <div
          className={`absolute ${
            armTrayLeft ? "bg-gray-800" : "bg-slate-100"
          } left-0 bottom-0 h-[80%] border border-gray-600 rounded-t-md w-2 -translate-x-1/2 `}
        />
        <div
          className={`absolute ${
            armTrayRight ? "bg-gray-800" : "bg-slate-100"
          } right-0 bottom-0 h-[80%] border border-gray-600 rounded-t-md w-2 -mr-[1.5px] translate-x-1/2 `}
        />
        {handicapArmRest ? (
          <HandicapIcon
            className={`text-xl max-sm:mb-px sm:text-2xl ${
              isSelected ? "text-white" : "text-blue-600"
            } -mb-1`}
          />
        ) : (
          unsuitableForHandicap && (
            <NoHandicapIcon
              className={`text-lg max-sm:mb-px sm:text-[21px] -mb-1 ${
                isSelected ? "text-white" : "text-red-600"
              } mt-1`}
            />
          )
        )}
        <span
          className={`drop-shadow-lg max-xs:text-xs max-sm:text-sm ${
            isSelected ? "text-white" : "text-black/75"
          }`}
        >
          {id}
        </span>
      </div>
      <div
        className={`${seatCharacter()} h-4 flex items-center justify-between p-1 rounded-md border-[1px] border-slate-800 transition-all`}
      >
        {noBreakOver && (
          <TriangleIcon className="text-gray-800 w-2 sm:h-[13px] h-2 sm:w-[13px]" />
        )}
        {noRecline && <div className="w-2 sm:h-3 h-2 sm:w-3 rounded-full bg-gray-800" />}
      </div>
    </div>
  );
};

export default Seat;
