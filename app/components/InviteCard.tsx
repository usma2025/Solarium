"use client";

import { useEffect, useRef, useState } from "react";

type Heart = {
  id: number;
  left: number; // percentage
  size: number; // px
  delay: number; // seconds
  drift: number; // px
};

export default function InviteCard() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  const moveNoButton = () => {
    // Rango de movimiento en píxeles, aumenta ligeramente con cada intento
    const base = 140;
    const range = Math.min(base + noClicks * 10, 220);
    const x = Math.floor(Math.random() * range * 2 - range);
    const y = Math.floor(Math.random() * range * 2 - range);
    setNoPos({ x, y });
    setNoClicks((c) => c + 1);
  };

  const onAccept = () => {
    setAccepted(true);
    // Genera corazones animados
    const count = 36;
    const arr: Heart[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 0.8 + i * 0.03,
      drift: (Math.random() - 0.5) * 120,
    }));
    setHearts(arr);
  };

  // Evita el cursor: si el puntero entra al botón "No", se mueve
  useEffect(() => {
    const el = noBtnRef.current;
    if (!el) return;
    const handleEnter = () => moveNoButton();
    el.addEventListener("pointerenter", handleEnter);
    return () => el.removeEventListener("pointerenter", handleEnter);
  }, [noBtnRef.current, noClicks]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl px-6"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-8 md:p-10">
        {!accepted ? (
          <div className="flex flex-col items-center text-center gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="shine">¿Quieres salir conmigo?</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Me encantaría compartir un momento especial contigo. ¿Aceptas mi invitación?
            </p>

            <div className="relative flex items-center justify-center gap-4 mt-2">
              <button
                className="px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: "#ff66b3", color: "#ffffff" }}
                aria-label="Aceptar invitación"
                onClick={onAccept}
              >
                Sí
              </button>

              <button
                ref={noBtnRef}
                className="px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform duration-200"
                style={{
                  backgroundColor: "#ff99cc",
                  color: "#000000",
                  transform: `translate(${noPos.x}px, ${noPos.y}px) rotate(${noClicks * 3}deg)`,
                }}
                aria-label="Rechazar invitación"
                onClick={moveNoButton}
              >
                No
              </button>
            </div>

            {noClicks > 0 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                😄 (intento {noClicks})
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="shine">¡Sabía que dirías que sí! </span>
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 max-w-md">
            Te escribo para coordinar nuestra cita.
            </p>
            <div className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span>Lugar: Plaza de las Americas</span>
              
            
            </div>
          </div>
        )}
      </div>

      {/* Corazones animados */}
      {accepted && (
        <div className="pointer-events-none absolute inset-0">
          {hearts.map((h) => (
            <span
              key={h.id}
              className="heart"
              style={{
                left: `${h.left}%`,
                fontSize: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                // drift horizontal mediante variable CSS
                // @ts-expect-error custom CSS var
                "--drift": `${h.drift}px`,
              }}
            >
              ❤
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
