import Image from "next/image";
import Tablero from "./components/Tablero";
export default function Home() {
  return (
    <>
      <header className="py-8 bg-gray-300">
        <h1 className="text-3xl font-bold underline text-center">
          Tic Tac Toe
        </h1>
        <p className="text-center py-3">
          User play as X and Computer play as O
        </p>
      </header>
      <main className="bg-yellow-100">
        <Tablero />
      </main>
    </>
  );
}
