import { useState } from "react";
import Seat from "./components/Seat";
import allSeats from "./seats";
import SeatDescription from "./components/SeatDescription";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectionAmount, setSelectionAmount] = useState<number>(1);

  function toggleSeatSelection(seatID: string) {
    if (selectedSeats.includes(seatID)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatID));
    } else if (selectedSeats.length >= selectionAmount) {
      const updatedSelect = selectedSeats.slice(1).concat(seatID);
      setSelectedSeats(updatedSelect);
    } else {
      setSelectedSeats((prev) => [...prev, seatID]);
    }
  }

  function handleSelectionAmount(amount: number) {
    if (selectedSeats.length > amount) {
      const updatedSelect = selectedSeats.slice(selectedSeats.length - amount);
      setSelectedSeats(updatedSelect);
    }

    setSelectionAmount(amount);
  }

  return (
    <div className=" px-4 pb-10 pt-2 w-fit">
      <div className="flex justify-evenly gap-4">
        <SeatDescription color="bg-[#a9a9a9]" label="Available" />
        <SeatDescription color="bg-[#9e0000]" label="Occupied" />
        <SeatDescription color="bg-[#e2b11d]" label="VIP" />
        <SeatDescription
          color="bg-[#45ba4f] outline-2 outline-dashed"
          label="Your Selection"
        />
        <SeatDescription color="bg-[#545454]" label="Unavailable" />
      </div>
      <div className="mt-2 w-fit mx-auto space-x-2">
        <select
          onChange={({ target: { value } }) => handleSelectionAmount(+value)}
          value={selectionAmount}
          name="seatSelectionAmount"
          id="selectionAmount"
          className="bg-white text-black rounded-md p-2"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          className="bg-red-500 py-2 px-4 rounded-md active:scale-[0.98] transition-all"
          onClick={() => setSelectedSeats([])}
        >
          Clear Selection
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-10 w-fit">
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
    </div>
  );
};

export default App;
