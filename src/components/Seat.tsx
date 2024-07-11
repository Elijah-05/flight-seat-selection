type SeatProps = {
  id: string;
  status: string;
  onClick: (id: string) => void;
  isSelected: boolean;
};

const Seat = ({ id, status, onClick, isSelected }: SeatProps) => {
  const seatCharacter = () => {
    switch (status) {
      case "available":
        return `${
          isSelected
            ? "bg-[#45ba4f] outline-2 outline-dashed"
            : "bg-[#a9a9a9] cursor-pointer"
        }`;
      case "occupied":
        return "bg-[#9e0000] cursor-pointer";
      case "unavailable":
        return "bg-[#545454] cursor-not-allowed";
      case "vip":
        return "bg-[#e2b11d] cursor-not-allowed";
      default:
        return "bg-red-100";
    }
  };

  return (
    <div
      className={`${
        status !== "unavailable" && "active:scale-[0.98]"
      } transition-all select-none duration-500 `}
      onClick={() => status === "available" && onClick(id)}
    >
      <div
        className={`relative w-20 mt-[30%] h-16 rounded-lg ${seatCharacter()} grid place-content-center transition-all`}
      >
        <div
          className={`absolute w-[60%] h-[30%] right-1/2 translate-x-1/2 -translate-y-full rounded-t-lg ${seatCharacter()} transition-all`}
        />
        <span className="font-semibold drop-shadow-lg">{id}</span>
      </div>
    </div>
  );
};

export default Seat;
