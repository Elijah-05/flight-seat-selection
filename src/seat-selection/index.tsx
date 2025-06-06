import { useRef, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HandicapIcon, NoHandicapIcon, TriangleIcon } from "../assets";
import Seat from "../components/Seat";
import SeatDescription from "../components/SeatDescription";
import allSeats from "../seats";
import planeLayout from "/images/main-plane-body.png";
import planeWingRight from "/images/right-wing.png";
import planeWingLeft from "/images/left-wing.png";

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectionAmount, setSelectionAmount] = useState<number>(1);
  const [tooltipSeat, setTooltipSeat] = useState<string | null>(null);
  const [exitPlane, setExitPlane] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  //   const isSmallDevice = useScreenWidthMatch();

  function toggleSeatSelection(seatID: string) {
    if (selectedSeats.includes(seatID)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatID));
      setTooltipSeat(null);
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
      }
    } else if (selectedSeats.length >= selectionAmount) {
      if (selectionAmount === 1) {
        setSelectedSeats([seatID]);
        return;
      }

      setTooltipSeat(seatID);

      // Clear existing timeout if it exists
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }

      tooltipTimeoutRef.current = setTimeout(() => {
        setTooltipSeat(null);
        tooltipTimeoutRef.current = null;
      }, 3000);
    } else {
      setSelectedSeats((prev) => [...prev, seatID]);
      setTooltipSeat(null);

      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
      }
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
    <div className="mx-auto pb-10 pt-2 w-fit">
      <div className="sticky top-0 px-4 pt-2 sm:pt-6 w-full max-w-[1200px] mx-auto gap-y-2 flex flex-col sm:gap-y-4">
        {/* 1. Seat Status Legend */}
        <div className="flex flex-wrap justify-center gap-2 xs:gap-4 sm:gap-6 bg-white shadow-sm border rounded-lg py-3 px-2 sm:py-4">
          <SeatDescription color="bg-[#A8D5BA]" label="Available" />
          <SeatDescription color="bg-[#F3A6A6]" label="Occupied" />
          <SeatDescription
            color="bg-[#5A92C6] outline-2 outline-dashed"
            label="Your Selection"
          />
          <SeatDescription color="bg-[#D8D8D8]" label="Unavailable" />
        </div>

        {/* 2. Seat Type Descriptions */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-3 xl:gap-6 text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-md">
            <div className="h-1.5 sm:h-2 w-6 sm:w-8 bg-gray-900 rounded" />
            <span>Seat with In-Arm Tray</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-md">
            <div className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-gray-900" />
            <span>Seat with No Recline</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-md">
            <TriangleIcon className="text-gray-800" />
            <span>Seat with No Break Over</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-md">
            <HandicapIcon className="text-blue-600 text-lg sm:text-xl" />
            <span>Handicap Arm Rest</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-md">
            <NoHandicapIcon className="text-red-500 text-lg sm:text-xl" />
            <span>Unsuitable for Handicap</span>
          </div>
        </div>

        {/* 3. Passenger Selection & Clear Button */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
            <span className="bg-gray-100 text-gray-700 px-4 py-2">
              Number of Passenger
            </span>
            <select
              onChange={({ target: { value } }) =>
                handleSelectionAmount(+value)
              }
              value={selectionAmount}
              className="bg-white py-2 px-3 text-gray-800 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition active:scale-[0.98]"
            onClick={() => {
              setSelectedSeats([]);
              setSelectionAmount(1);
            }}
          >
            Clear Selection
          </button>
          <button
            className="group bg-green-600 flex items-center gap-2 text-white px-5 py-2 rounded-md hover:bg-green-500 transition active:scale-[0.98]"
            onClick={() => {
              setExitPlane((cur) => !cur);
            }}
          >
            Submit
            <IoIosArrowRoundForward className="text-2xl group-hover:translate-x-2 duration-500" />
          </button>
        </div>
      </div>

      {/* Plane Layout Seat Selection */}
      <div
        className={`mx-auto w-[calc(100vw-14px)] overflow-hidden relative mt-10 ${exitPlane ? "-translate-y-[calc(100%+500px)]" : "translate-y-0"} duration-[2000ms] transition-all ease-in`}
      >
        <div className="relative xxs:max-w-[398px] xs:max-w-[398px] sm:max-w-[456px] mx-auto overflow-x -scroll">
          {/* Plane Body Image */}
          <img
            src={planeLayout}
            alt="plane"
            className=" w-full object-contain"
          />
          {/* Plane Left Wing */}
          <div className="absolute left-0 top-[35%] overflow">
            <img
              src={planeWingLeft}
              alt=""
              className="w-full -translate-x-full object-contain"
            />
          </div>
          {/* Plane Right Wing */}
          <div className="absolute right-0 top-[35%] overflow">
            <img
              src={planeWingRight}
              alt=""
              className="w-ful translate-x-full object-contain"
            />
          </div>
        </div>

        {/* Seats grid */}
        <div className="absolute space-y-1 sm:space-y-2 right-1/2 translate-x-1/2 top-[23%]">
          {allSeats.map((columnSeat, i) => (
            <div key={i} className="flex w-fit">
              {columnSeat.map((rowSeat, j) =>
                rowSeat ? (
                  rowSeat.hideSeat ? (
                    <div className="w-[13vw] xxs:w-[13vw] xs:w-14 sm:w-16" />
                  ) : (
                    <Seat
                      key={j}
                      seatData={rowSeat}
                      onClick={() =>
                        rowSeat.status === "available" &&
                        toggleSeatSelection(rowSeat.id)
                      }
                      isSelected={selectedSeats.includes(rowSeat.id)}
                      tooltipMessage={
                        tooltipSeat === rowSeat.id
                          ? "To select this seat, deselect another"
                          : null
                      }
                    />
                  )
                ) : (
                  <div key={j} className="w-6 sm:w-8" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
