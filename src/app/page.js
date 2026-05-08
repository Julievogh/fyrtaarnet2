"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [startMusic, setStartMusic] = useState(false);

  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const startSequence = () => {
    clearTimers();

    setShowIntro(true);
    setStartMusic(false);

    timers.current.push(
      setTimeout(() => setStartMusic(true), 1500)
    );

    timers.current.push(
      setTimeout(() => setShowIntro(false), 3000)
    );
  };

  useEffect(() => {
    startSequence();
    return clearTimers;
  }, []);

  const restart = () => {
    startSequence();
  };

  return (
    <>
      {startMusic && <Music />}
      {showIntro ? (
        <BookIntro />
      ) : (
        <Book restart={restart} />
      )}
    </>
  );
}

/* 📖 INTRO */
function BookIntro() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f6f1ea]">
      <div className="text-center animate-bookOpen">
        <h1 className="text-2xl md:text-3xl font-light mb-4">
          Til min morfar
        </h1>
        <p className="text-sm opacity-70">
          En fortælling om et fyrtårn
        </p>
      </div>
    </main>
  );
}

/* 📖 BOOK */
function Book({ restart }) {
  const pages = useMemo(
    () => [
      [
        "Et fyrtårn står forankret i historien",
        "Fortsat rejser det sig rankt",
        "Skyder sine stråler mod fremtiden",
        "og fortidens bølger",
        "Dog standhaftigt hviler det",
        "I stormvejr og kuldens mørke",
        "Stolt, vist og trofast lys."
      ],
      [
        "Fyrtårnet hviler sig i solens stråler",
        "Og ved, at dets ansvar er i dvale",
        "Indtil mørket returnerer",
        "Lever i lette briser, kattejammer, sult og havskum",
        "Da står fyrtårnet klar",
        "Til at skyde sin vise klarhed",
        "Over vejen frem",
        "Mod bjergene eller byen",
        "Lede dem, der bad om vej"
      ],
      [
        "Fyrtårnets historie er måske lang",
        "Nogle passager glemte",
        "Andre skabte grin og klang",
        "Fejl begået, stærke stråler ud",
        "Maling krakeleret og tiden forpasset",
        "Tomme flasker, glemte drømme og vovemod",
        "Stunder passeret, dog står det endnu",
        "Ikke i ennui, men fuld af magi",
        "Fyrtårnet har stadig noget at sige"
      ],
      [
        "Fyrtårnet kunne måske tro",
        "At ingen ville skue det længere",
        "At det ville forsvinde i glemslens tåge",
        "Køligt neonlys og det nye skuds glød",
        "Distraktioner skyder op som ukrudt",
        "Dets strålers kraft synes forstummet",
        "Hvorfor skal det være til",
        "Hvis det overgås af tiden selv?"
      ],
      [
        "Fyrtårnet, fortørnet og tvær",
        "“Så skal de ej se mit lys skinne mere”",
        "Da slog det blikket bort mod bjergene",
        "Og druknede sine tårer i havets skum",
        "Lukkede sine døre og slukkede lyset i tårnet",
        "Hvis ingen vil se det skinne",
        "Så kunne de da bare famle i blinde",
        "Og glemme dets skær"
      ],
      [
        "Fyrtårnet stod endnu en falmet dag",
        "Det formodede måske det var den sidste",
        "“Var det drøm, mareridt, tåge?”",
        "Men da nattehimlen spandt",
        "Et stof af evigheden",
        "Da sank det falske lys i knæ",
        "Stod fyrtårnet oprejst",
        "Og strålede om kap med stjernerne"
      ],
      ["__IMAGES__"]
    ],
    []
  );

  const [page, setPage] = useState(0);
  const [activeLine, setActiveLine] = useState(-1);

  const goToPage = (next) => {
    if (next === page) return;
    setActiveLine(-1);
    setTimeout(() => setPage(next), 120);
  };

  useEffect(() => {
    let i = -1;
    let interval;
    let timeout;

    setActiveLine(-1);

    const start = () => {
      interval = setInterval(() => {
        i++;
        setActiveLine(i);

        if (i >= pages[page].length - 1) {
          clearInterval(interval);
        }
      }, 850);
    };

    timeout = setTimeout(start, 50);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [page, pages]);

  return (
    <main className="min-h-screen bg-[#f6f1ea] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-radial from-yellow-100/20 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-2xl flex flex-col items-center">

        {/* 📖 ICON (CLICK TO RESTART) */}
        <div
          className="flex justify-center mb-3 cursor-pointer"
          onClick={restart}
        >
          <Image
            src="/fyrtaarn.jpg"
            alt="Fyrtårn"
            width={55}
            height={55}
            className="opacity-70"
          />
        </div>

        {/* 📖 TITLE (CLICK TO RESTART) */}
        <div
          onClick={restart}
          className="mb-8 text-center font-bold text-xl md:text-2xl tracking-wide cursor-pointer"
        >
          Fyrtårn
        </div>

        {/* 📖 CONTENT */}
        <div className="h-[460px] w-full flex items-center justify-center">

          {pages[page][0] === "__IMAGES__" ? (

            /* 🖼️ FINAL IMAGE PAGE */
            <div className="flex flex-col items-center gap-6 animate-fadeIn">

              <div className="flex gap-6 justify-center items-center">

                <div className="w-[180px] h-[280px] overflow-hidden relative">
                  <Image
                    src="/muffe1.png"
                    alt="muffe 1"
                    fill
                    className="object-cover object-[50%_12%]"
                  />
                </div>

                <div className="w-[180px] h-[280px] overflow-hidden relative">
                  <Image
                    src="/muffe2.png"
                    alt="muffe 2"
                    fill
                    className="object-cover object-[50%_12%]"
                  />
                </div>

                <div className="w-[180px] h-[280px] overflow-hidden relative">
                  <Image
                    src="/muffe3.png"
                    alt="muffe 3"
                    fill
                    className="object-cover object-[50%_12%]"
                  />
                </div>

              </div>

              <div className="text-center mt-4 text-lg md:text-xl font-light tracking-wide">
                Tillykke med din dag, morfar. Elsker dig. Tak for dine kloge ord, hjælp og sjove historier - Julie
              </div>

            </div>

          ) : (

            /* 📖 TEXT */
            <div className="flex flex-col items-center gap-5 text-center text-lg md:text-xl font-light leading-normal tracking-wide">

              {pages[page].map((line, i) => (
                <RevealLine
                  key={`${page}-${i}`}
                  text={line}
                  active={i <= activeLine}
                />
              ))}

            </div>

          )}

        </div>

        {/* 🔘 NAVIGATION */}
        <div className="h-[70px] mt-10 flex items-center justify-center gap-10">

          <button
            onClick={() => goToPage(Math.max(page - 1, 0))}
            className="cursor-pointer hover:opacity-60 transition text-sm"
          >
            ← Forrige
          </button>

          <button
            onClick={() => goToPage(Math.min(page + 1, pages.length - 1))}
            className="cursor-pointer hover:opacity-60 transition text-sm"
          >
            Næste →
          </button>

        </div>

      </div>
    </main>
  );
}

/* ✨ TYPEWRITER */
function RevealLine({ text, active }) {
  return (
    <p className="min-h-[1.6em]">
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            opacity: active ? 1 : 0,
            transition: "opacity 0.45s ease",
            transitionDelay: `${i * 22}ms`
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}

/* 🎧 MUSIC */
function Music() {
  return (
    <iframe
      src="https://www.youtube.com/embed/ohk3DP5fMCg?autoplay=1&loop=1&playlist=ohk3DP5fMCg&controls=0&mute=0&playsinline=1"
      allow="autoplay"
      className="fixed inset-0 w-0 h-0 opacity-0 pointer-events-none"
      title="Leonard Cohen - Famous Blue Raincoat"
    />
  );
}