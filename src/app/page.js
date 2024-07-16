import Tablero from "./components/Tablero";
export default function Home() {
  return (
    <>
      <header className="py-8 bg-gray-300">
        <h1 className="text-3xl font-bold underline text-center">
          Tic Tac Toe
        </h1>
        <p className="text-center py-3 max-w-[400px] mx-auto">
          First of all you must choose if you want to play with X or O then the
          game starts and when it ends it, takes 1 second to start a new game
          automatically.
        </p>
      </header>
      <main className="bg-yellow-100">
        <Tablero />
      </main>
    </>
  );
}
