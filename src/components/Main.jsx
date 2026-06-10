import "./styles/Main.css";
import Girassois from "./subComponents/Girassois";
import Carrosel from "./subComponents/Carrosel";
import videoTrend from "./video/IDWBM_Trend.mp4";
import Timer from "./Timer";

function Main() {
  return (
    <main>
      <Girassois />

      <Carrosel />

      <video src={videoTrend} controls className="video"></video>

      <section id="someWords">
        <p>
            Como pode ver, tudo teve um proposito, tudo tem um sentido, um contexto, uma razão, e você é minha razão de sorrir, de levantar, de buscar melhorar, de buscar evoluir, você tomou pra si meu sonho, meus deesejos, meus pensamentos e meus sorrisos, você se tornou aquilo que eu sempre busquei, o amor da minha vida, e sempre que estiver na duvida lembre, o que sinto por você não esta em palavras, nem em fotos, mas está em cada <span className="red">eu te amo</span>, cada <span className="darkblue">boa noite</span>, em cada <span className="lightyellow">bom dia</span>, o que sinto por você é mais do que palavra, é mais que fala, é mais que eu mesmo possa expressar.
        </p>
        <div className="counterWrapper">
          <Timer />
          <p>
            Esse é o tempo exato que nós dois nos conhecemos e vamos contando, pois nem todo o tempo do mundo é longo o bastante do teu lado, talvel nem decadas, milenios ao teu lado seria o suficiente para matar minha vontade de você, eu amo você minha garota! obrigado por existir!
          </p>
        </div>
      </section>
    </main>
  );
}

export default Main;
