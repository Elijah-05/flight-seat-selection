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
      } transition-all select-none duration-500`}
      onClick={() => status === "available" && onClick(id)}
    >
      <div
        className={`relative w-16 mt -[30%] h-[47px] rounded-lg ${seatCharacter()} border border-b-0 border-gray-600 grid place-content-center transition-all`}
      >
        <div className="absolute bg-slate-100 left-0 bottom-0 h-[80%] border border-gray-600 rounded-t-md w-2 -translate-x-1/2"/>
        <div className="absolute bg-slate-100 right-0 bottom-0 h-[80%] border border-gray-600 rounded-t-md w-2 translate-x-1/2"/>
        <span className="font-semibold drop-shadow-lg">{id}</span>
      </div>
      <div className={`${seatCharacter()} h-4 rounded-md border-[1px] border-slate-800`}/>
    </div>
  );
};

export default Seat;
