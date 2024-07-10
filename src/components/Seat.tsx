type SeatProps = {
  id: string;
  status: "available" | "selected" | "unavailable";
  onClick: (id: string) => void;
};

const Seat = ({ id, status, onClick }: SeatProps) => {
  const seatCharacter = () => {
    switch (status) {
      case "available":
        return "bg-green-600 cursor-pointer";
      case "selected":
        return "bg-blue-600";
      case "unavailable":
        return "bg-gray-400 cursor-not-allowed";
      default:
        return "bg-red-400";
    }
  };

  return (
    <div className=" active:scale-[0.98] transition-all"
    onClick={() => status === 'available' && onClick(id)}>
      <div className={`w-20 h-16 rounded-lg ${seatCharacter()}`}>
        <div
          className={`w-[60%] h-[30%] mx-auto -translate-y-full rounded-t-lg ${seatCharacter()}`}
        />
      </div>
    </div>
  );
};

export default Seat;
