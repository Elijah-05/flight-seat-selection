import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HandicapIcon, NoHandicapIcon, TriangleIcon } from "../assets";
import Seat from "../components/Seat";
import SeatDescription from "../components/SeatDescription";
import allSeats from "../seats";
import planeLayout from "/images/main-plane-body.png";
import planeWingRight from "/images/right-wing.png";
import planeWingLeft from "/images/left-wing.png";
import planeSound from "/audio/plane-flight.mp3";
import useScreenWidthMatch from "../hooks/useScreenWidthMatch";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectionAmount, setSelectionAmount] = useState<number>(2);
  const [tooltipSeat, setTooltipSeat] = useState<string | null>(null);
  const [exitPlane, setExitPlane] = useState(false);
  const [showStartText, setShowStartText] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSmallDevice = useScreenWidthMatch(780);

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

  function handleRestart() {
    setShowStartText(false);
    setSelectedSeats([]);
    setExitPlane(false);
    setTimeout(() => {
      playSound(planeSound);
    }, 700);
  }

  function playSound(src: string) {
    const audio = new Audio(src);
    audio.play();
  }

  return (
    <div className="w-full mx-auto pb-10 pt-2">
      <div
        className={`${exitPlane ? "sticky" : "relative"} w-full top-0 px-4 pt-2 sm:pt-6 max-w-[1200px] mx-auto gap-y-2 flex flex-col sm:gap-y-4`}
      >
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
              setSelectionAmount(2);
            }}
          >
            Clear Selection
          </button>
          {selectedSeats.length > 0 && !showStartText && (
            <button
              className={`group bg-green-600 flex items-center gap-2 text-white px-5 py-2 rounded-md  transition ${!exitPlane && "active:scale-[0.98] hover:bg-green-500"}`}
              onClick={() => {
                setExitPlane(true);
                setSelectionAmount(2);
                setTimeout(() => playSound(planeSound), 100);
                setTimeout(() => {
                  setShowStartText(true);
                }, 1500); // matches exit animation duration
              }}
              disabled={exitPlane}
            >
              Submit
              <IoIosArrowRoundForward
                className={`text-2xl ${!exitPlane && "group-hover:translate-x-2"} duration-500`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Plane Layout Seat Selection */}
      <AnimatePresence mode="wait">
        {!exitPlane && (
          <motion.div
            key="plane-layout"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: isSmallDevice ? 1.5 : 2,
                ease: "easeInOut",
              },
            }}
            exit={{
              y: isSmallDevice ? -2850 : -3300,
              opacity: 1,
              transition: { duration: 2.5, ease: "easeInOut" },
            }}
            style={{ willChange: "transform, opacity" }}
            className={`mx-auto w-[calc(100vw-18px)] sm:w-[calc(100vw-14px)] overflow-hidden relative mt-3 sm:mt-6 `}
          >
            <div className="relative xxs:max-w-[398px] xs:max-w-[398px] sm:max-w-[456px] mx-auto">
              {/* Plane Body Image */}
              <img
                src={planeLayout}
                alt="plane"
                className=" w-full object-contain"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              />
              {/* Plane Left Wing */}
              <div className="absolute left-0 top-[35%] overflow">
                <img
                  src={planeWingLeft}
                  alt=""
                  className="w-full -translate-x-full object-contain"
                  style={{
                    willChange: "transform",
                  }}
                />
              </div>
              {/* Plane Right Wing */}
              <div className="absolute right-0 top-[35%] overflow">
                <img
                  src={planeWingRight}
                  alt=""
                  className="w-ful translate-x-full object-contain"
                  style={{
                    willChange: "transform",
                  }}
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
          </motion.div>
        )}

        {showStartText && (
          <motion.div
            key="start-again-text"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-[calc(100vh-300px)] sm:h-[calc(100vh-300px)] flex-col items-center justify-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-gray-700 text-4xl font-semibold text-center mb-6"
            >
              Reservation Complete
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-green-700 text-2xl sm:text-3xl font-bold text-center"
            >
              You're all set!
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-lg sm:text-xl text-center mb-6"
            >
              Want to make another reservation?
            </motion.p>

            <motion.button
              variants={itemVariants}
              onClick={handleRestart}
              className="bg-blue-500 hover:bg-blue-500/90 text-white px-8 py-2 rounded-lg transition-all"
            >
              Start Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
