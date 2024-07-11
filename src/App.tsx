import { useState } from "react";
import Seat from "./components/Seat";
import allSeats from "./seats";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  function toggleSeatSelection(seatID: string) {
    if (selectedSeats.includes(seatID)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatID));
    } else {
      setSelectedSeats((prev) => [...prev, seatID]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {allSeats.map((columnSeat, i) => (
        <div key={i} className="flex gap-1">
          {columnSeat.map((rowSeat, j) =>
            rowSeat ? (
              <Seat
                key={j}
                status={rowSeat.status}
                id={rowSeat.id}
                onClick={() =>
                  rowSeat.status === "available" &&
                  toggleSeatSelection(rowSeat.id)
                }
                isSelected={selectedSeats.includes(rowSeat.id)}
              />
            ) : (
              <div key={j} className="w-16" />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
