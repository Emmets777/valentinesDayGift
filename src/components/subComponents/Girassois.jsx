import { useState, useEffect, useRef } from 'react';
import * as animeModule from 'animejs';
import './Girassois.css';

// Resolução para o Vite
const extrairAnime = () => {
  if (typeof window !== 'undefined' && window.anime) return window.anime;
  if (animeModule && animeModule.default) return animeModule.default;
  if (typeof animeModule === 'function') return animeModule;
  return animeModule;
};
const anime = extrairAnime();

function Girassois() {
  const [animando, setAnimando] = useState(false);
  const [contador, setContador] = useState(0);
  const [girassois, setGirassois] = useState([]);
  
  const campoRef = useRef(null);
  const loopAnimeRef = useRef(null);

  const TOTAL = 150;
  const FILEIRAS = 10;
  const coresPetalas = [
    '#FFD700', '#FFC107', '#FFCA28', '#FFB300',
    '#FFD740', '#FFA000', '#FFE082', '#FFCA28'
  ];

  const gerarDadosGirassois = (largura, alturaChao) => {
    const horizonteY = alturaChao * 0.45;
    const porFileira = Math.round(TOTAL / FILEIRAS);
    const novosGirassois = [];

    for (let f = 0; f < FILEIRAS; f++) {
      const qtd = f === FILEIRAS - 1 ? TOTAL - porFileira * (FILEIRAS - 1) : porFileira;
      const t = f / (FILEIRAS - 1);
      const bottomPx = Math.round(horizonteY * (1 - t) + 5);
      const escalaBase = 0.25 + t * 0.75;
      const zIndex = f + 1;
      const posicoes = [];

      for (let i = 0; i < qtd; i++) {
        let x, tentativas = 0;
        const minDist = 10 + t * 8;
        do {
          x = Math.round(10 + Math.random() * (largura - 20));
          tentativas++;
        } while (posicoes.some(p => Math.abs(p - x) < minDist) && tentativas < 40);
        
        posicoes.push(x);
        const escala = escalaBase + Math.random() * 0.1;

        const alturaBase = Math.round(60 + escala * 90);
        const larguraCaule = Math.round(4 + escala * 5);
        const raioFlor = Math.round(14 + escala * 14);
        const radioCentro = Math.round(6 + escala * 6);

        // Ajuste nas dimensões das pétalas para não se sobreporem de forma bagunçada
        const petalas = Array.from({ length: 12 }).map((_, index) => ({
          angulo: (index / 12) * 360,
          cor: coresPetalas[index % coresPetalas.length],
          width: Math.round(raioFlor * 0.45),   // Largura da pétala proporcional
          height: Math.round(raioFlor * 0.95),  // Comprimento da pétala para fora do miolo
          // O deslocamento ideal para a pétala sair da metade do raio do miolo
          translateY: Math.round(radioCentro + (raioFlor * 0.3)) 
        }));

        novosGirassois.push({
          id: `${f}-${i}-${x}`,
          x,
          bottomPx,
          zIndex,
          escala,
          alturaBase,
          larguraCaule,
          raioFlor,
          radioCentro,
          petalas
        });
      }
    }
    return novosGirassois;
  };

  const iniciarPlantacao = () => {
    if (animando) return;

    setAnimando(true);
    setContador(0);

    if (loopAnimeRef.current) {
      loopAnimeRef.current.pause();
      loopAnimeRef.current = null;
    }

    const largura = campoRef.current.offsetWidth;
    const alturaChao = campoRef.current.offsetHeight;
    const dados = gerarDadosGirassois(largura, alturaChao);
    
    setGirassois(dados);
  };

  useEffect(() => {
    if (girassois.length === 0 || !animando) return;

    const elementos = campoRef.current.querySelectorAll('.girassol');
    if (elementos.length === 0) return;

    anime({
      targets: elementos,
      opacity: [0, 1],
      scaleX: [0, 1],
      scaleY: [0, 1],
      translateY: [20, 0],
      delay: (el) => {
        const z = parseInt(el.style.zIndex) || 1;
        return (z - 1) * 300 + anime.random(0, 150);
      },
      duration: 450,
      easing: 'easeOutBack',
      change: () => {
        const visiveis = Array.from(elementos).filter(
          (el) => parseFloat(window.getComputedStyle(el).opacity) > 0.1
        ).length;
        setContador(Math.min(visiveis, TOTAL));
      },
      complete: () => {
        setContador(TOTAL);
        setAnimando(false);

        // Vento suave aplicando rotação baseada na base inferior da flor inteira
        loopAnimeRef.current = anime({
          targets: elementos,
          rotate: () => [anime.random(-5, -2), anime.random(2, 5)],
          duration: () => anime.random(2200, 3800),
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true
        });
      }
    });

  }, [girassois]);

  useEffect(() => {
    return () => {
      if (loopAnimeRef.current) loopAnimeRef.current.pause();
    };
  }, []);

  return (
    <div className="container-girassois">
      <div id="campo" ref={campoRef}>
        <div className="sol"></div>
        <div className="nuvem" style={{ width: '90px', height: '30px', top: '28px', left: '60px' }}></div>
        <div className="nuvem" style={{ width: '60px', height: '22px', top: '38px', left: '90px' }}></div>
        <div className="nuvem" style={{ width: '70px', height: '24px', top: '22px', left: '220px' }}></div>
        <div className="nuvem" style={{ width: '50px', height: '18px', top: '30px', left: '248px' }}></div>

        {girassois.map((g) => (
          <div
            key={g.id}
            className="girassol"
            style={{
              left: `${g.x}px`,
              bottom: `${g.bottomPx}px`,
              width: `${g.raioFlor * 2 + 20}px`,
              zIndex: g.zIndex,
              position: 'absolute',
              opacity: 0,
              // O ponto de transformação no vento deve ser o chão (base inferior do girassol)
              transformOrigin: '50% 100%' 
            }}
          >
            {/* Caule */}
            <div 
              className="caule" 
              style={{ 
                width: `${g.larguraCaule}px`, 
                height: `${g.alturaBase}px`,
                margin: '0 auto',
                position: 'relative'
              }}
            >
              {/* Folhas */}
              <div
                className="folha"
                style={{
                  width: `${Math.round(16 * g.escala)}px`,
                  height: `${Math.round(9 * g.escala)}px`,
                  left: `${-Math.round(16 * g.escala) + 2}px`,
                  bottom: `${Math.round(g.alturaBase * 0.4)}px`,
                  transform: 'rotate(-35deg)'
                }}
              />
              <div
                className="folha"
                style={{
                  width: `${Math.round(16 * g.escala)}px`,
                  height: `${Math.round(9 * g.escala)}px`,
                  right: `${-Math.round(16 * g.escala) + 2}px`,
                  bottom: `${Math.round(g.alturaBase * 0.6)}px`,
                  transform: 'rotate(35deg) scaleX(-1)'
                }}
              />

              {/* CONTEINER DA COROA DO GIRASSOL 
                  Ancorado perfeitamente no topo centralizado do caule */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${g.raioFlor * 2}px`,
                  height: `${g.raioFlor * 2}px`,
                }}
              >
                {/* Pétalas dispostas radialmente */}
                {g.petalas.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      width: `${p.width}px`,
                      height: `${p.height}px`,
                      background: p.cor,
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // Formato de gota/pétala
                      top: '50%',
                      left: '50%',
                      // Origem no centro exato do miolo para a rotação fazer o círculo perfeito
                      transformOrigin: '50% 50%', 
                      // Move a pétala para fora do centro e rotaciona no ângulo correto
                      transform: `translate(-50%, -50%) rotate(${p.angulo}deg) translateY(-${p.translateY}px)`
                    }}
                  />
                ))}

                {/* Miolo (Centro escuro) */}
                <div
                  className="centro"
                  style={{
                    position: 'absolute',
                    width: `${g.radioCentro * 2}px`,
                    height: `${g.radioCentro * 2}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    zIndex: 2
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button id="btn" onClick={iniciarPlantacao} disabled={animando}>
        {animando ? '🌱 Crescendo...' : girassois.length > 0 ? '🔄 Replantar' : '🌻 Plantar girassóis'}
      </button>
      
      <p id="contador">
        {contador} / {TOTAL} girassóis {contador === TOTAL && '🌻'}
      </p>
    </div>
  );
}

export default Girassois;