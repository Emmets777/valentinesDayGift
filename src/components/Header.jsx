import "./styles/Header.css";
import you from "./audio/wuant_you.mp3";
import GIW from "./audio/FIR_god_is_a_weapon.mp3";
import SDG from "./audio/FIR_sexy_drug.mp3";
import TWQ from "./audio/50C_21_questions.mp3";
import OQA from "./audio/ARLINDOC_o_que_e_amor.mp3";
import ALC from "./audio/tribalistas_alianca.mp3";
import IWY from "./audio/AM_i_wanna_be_yours.mp3";
import LSG from "./audio/KP_love_songs.mp3";
import LPN from "./audio/LILP_nuts.mp3";
import LPSS from "./audio/LILP_star_shopping.mp3";
import LPFD from "./audio/LILP_falling_down.mp3";

function Header() {
  return (
    <header>
      <section id="aboutU">
        <p className="you">
          Como explicar você? melhor, como explicar o inexplicável? dês do
          inicio quando bati os olhos em você eu me apaixonei, seu jeito, seu
          sorriso, sua risada, seus olhos, seu cabelo, tudo em você gritava me
          chamando, me aproximei sem ter certeza see teria alguma chance, mas só
          de saber que seu sorriso agora sorri pra mim, torna minha vida mais
          incrivel.
        </p>
        <p className="you">
          Mesmo que em pouco tempo eu já consigo ver um futuro lindo com você!
          Cada memoria que vamos criar, cada risada que vamos dar, cada novo
          sonho que vamos contruir juntos me faz querer ficar mais e mais com
          você, além disso, cada dia que passa parece que junta nós dois cada
          vez mais, como se já fossemos destinado a nós conhecer e ficarmos
          juntos.
        </p>
        <p className="you">
          Não importa o quanto eu pense que você é incrivel, cada dia que passa
          você se mostra melhor e melhor, cada dia que passa, você faz com que
          eu me apegue, me apaixone mais ainda por você. se caso nós dois, isso
          que temos e vamos ter seja um sonho, eu espero que nunca acabe, por
          que se eu acordar, sinto que nunca mais vouu poder viver normalmente,
          foram 3 dias juntos, 3 horas pra se conhecer, menos de 33 minutos para
          eu querer você e menos de 3 segundos para eu me apaixonar pela mulher
          que eu vi.
        </p>
        <audio src={you} controls></audio>
      </section>

      <section id="ourMusics">
        <h2>Meu top 10 músicas que remetam nós dois</h2>

        <div className="wrapper">
          <ul className="musicList">
            <p className="text">1. God is a weapon</p>
            <li className="musics">
              <audio src={GIW} controls>
                <source src={GIW} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">2. Sexy Drug</p>
            <li className="musics">
              <audio src={SDG} controls>
                <source src={SDG} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">3. 21 Questions</p>
            <li className="musics">
              <audio src={TWQ} controls>
                <source src={TWQ} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">4. O que é amor</p>
            <li className="musics">
              <audio src={OQA} controls>
                <source src={OQA} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">5. Aliança</p>
            <li className="musics">
              <audio src={ALC} controls>
                <source src={ALC} type="audio/mpeg" />
              </audio>
            </li>
          </ul>

          <ul className="musicList">
            <p className="text">6. I wanna be yours</p>
            <li className="musics">
              <audio src={IWY} controls>
                <source src={IWY} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">7. Love Songs</p>
            <li className="musics">
              <audio src={LSG} controls>
                <source src={LSG} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">8. Nuts</p>
            <li className="musics">
              <audio src={LPN} controls>
                <source src={LPN} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">9. Star Shopping</p>
            <li className="musics">
              <audio src={LPSS} controls>
                <source src={LPSS} type="audio/mpeg" />
              </audio>
            </li>
            <p className="text">10. Falling Down</p>
            <li className="musics">
              <audio src={LPFD} controls>
                <source src={LPFD} type="audio/mpeg" />
              </audio>
            </li>
          </ul>
        </div>
      </section>
    </header>
  );
}

export default Header;
