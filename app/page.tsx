"use client";

import { useState } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const range = 120; // movimiento aleatorio en píxeles
    const x = Math.floor(Math.random() * range * 2 - range);
    const y = Math.floor(Math.random() * range * 2 - range);
    setNoPos({ x, y });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#ffe6f0" }}
    >
      {!accepted ? (
        <div className="relative flex flex-col items-center text-center">
          <h1 className="text-3xl font-semibold mb-6" style={{ color: "#000000" }}>
            ¿Quieres salir conmigo?
          </h1>
          <div className="relative flex items-center gap-4">
            <button
              className="px-4 py-2 rounded-md text-lg"
              style={{ backgroundColor: "#ff66b3", color: "#ffffff" }}
              onClick={() => setAccepted(true)}
            >
              Sí
            </button>
            <button
              className="px-4 py-2 rounded-md text-lg"
              style={{
                backgroundColor: "#ff99cc",
                color: "#000000",
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              }}
              onClick={moveNoButton}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p className="text-2xl font-bold" style={{ color: "green" }}>
            ¡Gracias! 
          </p>
          <p className="mt-2" style={{ color: "#000000" }}>
            Te escribo para coordinar nuestra salida.
          </p>
        </div>
      )}
    </div>
  );
}
