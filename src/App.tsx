import { useState } from "react";
import Seat from "./components/Seat";
import allSeats from "./seats";
import SeatDescription from "./components/SeatDescription";
import planeLayout from "./assets/image/Vector Smart Object copy 2.png";
import { HandicapIcon, NoHandicapIcon, TriangleIcon } from "./assets";
// import planeLayout from "./assets/SVG/Asset 2.svg";

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

  console.log("all seats: ", allSeats.length);

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
      <div className="grid grid-cols-2 lg:grid-cols-5 place-content-center gap-10 mt-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-10 bg-gray-900" />
          <span className="text-black">SEAT WITH IN ARM TRAY</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-900" />
          <span className="text-black">SEAT WITH NO RECLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <TriangleIcon className="text-black text-2xl" />
          <span className="text-black">SEAT WITH NO BREAK OVER</span>
        </div>
        <div className="flex items-center gap-2">
          <HandicapIcon className="text-black text-3xl" />
          <span className="text-black">HANDICAP ARM REST</span>
        </div>
        <div className="flex items-center gap-2">
          <NoHandicapIcon className="text-black text-3xl" />
          <span className="text-black">UNSUITABLE FOR H/CAP</span>
        </div>
      </div>
      <div className="mt-4 flex w-fit mx-auto space-x-2">
        <div className="">
          <span className="bg-slate-100 text-black py-[9px] px-2 rounded-l-md">
            Person
          </span>
          <select
            onChange={({ target: { value } }) => handleSelectionAmount(+value)}
            value={selectionAmount}
            name="seatSelectionAmount"
            id="selectionAmount"
            className="bg-white text-black rounded-r-md p-2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-red-500 py-2 px-4 rounded-md active:scale-[0.98] transition-all"
          onClick={() => setSelectedSeats([])}
        >
          Clear Selection
        </button>
      </div>
      <div className="relative mt-10 w-[1080px]">
        <img
          src={planeLayout}
          alt=""
          className="w-full o utline outline-green-500"
        />
        <div className="absolute space-y-2 right-1/2 translate-x-1/2 top-[680px]">
          {allSeats.map((columnSeat, i) => (
            <div key={i} className="flex items-center">
              {columnSeat.map((rowSeat, j) =>
                rowSeat ? (
                  rowSeat.hideSeat ? (
                    <div className="w-16" />
                  ) : (
                    <Seat
                      key={j}
                      seatData={rowSeat}
                      onClick={() =>
                        rowSeat.status === "available" &&
                        toggleSeatSelection(rowSeat.id)
                      }
                      isSelected={selectedSeats.includes(rowSeat.id)}
                    />
                  )
                ) : (
                  <div key={j} className="w-8" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
