import { useState, useEffect } from "react";
import "./styles/Timer.css";

function Timer() {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  useEffect(() => {
    const dataInicio = new Date("2026-05-29T16:25:00").getTime();

    const interval = setInterval(() => {
      const diferenca = Date.now() - dataInicio;
      setTempoDecorrido(diferenca > 0 ? diferenca : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatarTempo = (ms) => {
    const totalSegundos = Math.floor(ms / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = String(Math.floor((totalSegundos % 86400) / 3600)).padStart(
      2,
      "0",
    );
    const minutos = String(Math.floor((totalSegundos % 3600) / 60)).padStart(
      2,
      "0",
    );
    const segundos = String(totalSegundos % 60).padStart(2, "0");

    return { dias, horas, minutos, segundos };
  };

  const { dias, horas, minutos, segundos } = formatarTempo(tempoDecorrido);

  return (
    <div className="timerWrapper">
      <h2>Tempo decorrido desde o início:</h2>
      <div className="timer">
        {[
          { valor: dias, label: "dias" },
          { valor: horas, label: "horas" },
          { valor: minutos, label: "minutos" },
          { valor: segundos, label: "segundos" },
        ].map(({ valor, label }) => (
          <div
            key={label}
            className="days"
          >
            <div
              className="numbers"
            >
              {String(valor).padStart(2, "0")}
            </div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timer;
