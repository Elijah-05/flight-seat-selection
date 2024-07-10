import Seat from "./components/Seat";

type SeatPropertyTypes = {
  id: string;
  status: "available" | "selected" | "unavailable";
};

const App = () => {
  const allSeats: SeatPropertyTypes[][] = [
    [
      {
        id: "1A",
        status: "available",
      },
      {
        id: "1A",
        status: "selected",
      },
      {
        id: "1A",
        status: "available",
      },
      {
        id: "1A",
        status: "unavailable",
      },
    ],
  ];
  return (
    <div className="flex gap-3">
      {allSeats.map((columnSeat) =>
        columnSeat.map((rowSeat) => (
          <Seat status={rowSeat.status} id={rowSeat.id} onClick={() => null} />
        ))
      )}
    </div>
  );
};

export default App;
