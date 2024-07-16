export default function Selector({ setTurn, setTurnSelected }) {
  return (
    <>
      <div className="py-10">
        <h2 className="text-center font-bold text-lg underline">
          Choose if you want to be X or O:
        </h2>
        <div className="flex justify-between mt-5 max-w-[200px] mx-auto flex-wrap">
          <button
            className="border-2 border-white px-5 py-2 rounded-md bg-black text-white shadow-[2px_3px_0px_0px_black]"
            onClick={() => {
              setTurn("X");
              setTurnSelected("X");
            }}
          >
            X
          </button>
          <button
            className="border-2 border-black px-5 py-2 rounded-md bg-white text-black shadow-[2px_3px_0px_0px_black]"
            onClick={() => {
              setTurn("O");
              setTurnSelected("O");
            }}
          >
            O
          </button>
        </div>
      </div>
    </>
  );
}
