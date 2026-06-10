import { useEffect, useRef } from 'react';
import './styles/Heart.css';
 
const HEART_PATH =
  'M50 82 C18 60 3 46 3 28 C3 13 14 3 27 3 C35 3 43 8 50 17 C57 8 65 3 73 3 C86 3 97 13 97 28 C97 46 82 60 50 82Z';
 
function Heart() {
  const cardRef    = useRef(null);
  const wrapRef    = useRef(null);
  const stateRef   = useRef({
    rotY: 0, rotX: 0,
    dragging: false,
    startX: 0, startY: 0,
    lastRotY: 0, lastRotX: 0,
    velX: 0, velY: 0,
    lastMX: 0, lastMY: 0,
    rafId: null,
    idleAnim: null,
  });
 
  useEffect(() => {
    let anime;
 
    /* Carrega anime.js dinamicamente se não estiver disponível */
    const loadAnime = () =>
      new Promise((resolve) => {
        if (window.anime) { resolve(window.anime); return; }
        const s = document.createElement('script');
        s.src =
          'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
        s.onload = () => resolve(window.anime);
        document.head.appendChild(s);
      });
 
    loadAnime().then((animeLib) => {
      anime = animeLib;
      const st   = stateRef.current;
      const card = cardRef.current;
      const wrap = wrapRef.current;
 
      /* ---- helpers ---- */
      const applyTransform = (ry, rx) => {
        card.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
      };
 
      const getPos = (e) =>
        e.touches
          ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
          : { x: e.clientX,            y: e.clientY };
 
      /* ---- idle sway ---- */
      const stopIdle = () => {
        if (st.idleAnim) { st.idleAnim.pause(); st.idleAnim = null; }
      };
 
      const startIdle = () => {
        stopIdle();
        const proxy = { v: st.rotY };
        st.idleAnim = anime({
          targets: proxy,
          v: st.rotY + 10,
          duration: 1800,
          direction: 'alternate',
          easing: 'easeInOutSine',
          loop: true,
          update() {
            st.rotY = proxy.v;
            applyTransform(st.rotY, st.rotX);
          },
        });
      };
 
      /* ---- pulse dos corações ---- */
      anime({
        targets: [
          card.querySelector('.heart-front'),
          card.querySelector('.heart-back'),
        ],
        scale: [1, 1.06],
        duration: 700,
        direction: 'alternate',
        easing: 'easeInOutSine',
        loop: true,
      });
 
      /* ---- drag ---- */
      const onDown = (e) => {
        stopIdle();
        if (st.rafId) { cancelAnimationFrame(st.rafId); st.rafId = null; }
        st.dragging = true;
        const p = getPos(e);
        st.startX   = p.x;  st.startY   = p.y;
        st.lastMX   = p.x;  st.lastMY   = p.y;
        st.lastRotY = st.rotY;
        st.lastRotX = st.rotX;
        st.velX = 0; st.velY = 0;
      };
 
      const onMove = (e) => {
        if (!st.dragging) return;
        const p  = getPos(e);
        st.velX  = (p.x - st.lastMX) * 1.1;
        st.velY  = (p.y - st.lastMY) * 0.7;
        st.lastMX = p.x;
        st.lastMY = p.y;
        st.rotY   = st.lastRotY + (p.x - st.startX) * 0.55;
        st.rotX   = Math.max(-30, Math.min(30, st.lastRotX - (p.y - st.startY) * 0.3));
        applyTransform(st.rotY, st.rotX);
      };
 
      const onUp = () => {
        if (!st.dragging) return;
        st.dragging = false;
        inertia();
      };
 
      const inertia = () => {
        if (Math.abs(st.velX) < 0.25 && Math.abs(st.velY) < 0.25) {
          startIdle();
          return;
        }
        st.rotY += st.velX;
        st.rotX  = Math.max(-30, Math.min(30, st.rotX + st.velY));
        st.velX *= 0.88;
        st.velY *= 0.88;
        applyTransform(st.rotY, st.rotX);
        st.rafId = requestAnimationFrame(inertia);
      };
 
      /* ---- event listeners ---- */
      wrap.addEventListener('mousedown',  onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup',   onUp);
      wrap.addEventListener('touchstart', (e) => { e.preventDefault(); onDown(e); }, { passive: false });
      window.addEventListener('touchmove', (e) => { e.preventDefault(); onMove(e); }, { passive: false });
      window.addEventListener('touchend',  onUp);
 
      startIdle();
 
      /* cleanup */
      return () => {
        stopIdle();
        if (st.rafId) cancelAnimationFrame(st.rafId);
        wrap.removeEventListener('mousedown',  onDown);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup',   onUp);
        wrap.removeEventListener('touchstart', onDown);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend',  onUp);
      };
    });
  }, []);
 
  return (
    <div className="coracao-scene">
      <div className="coracao-wrap" ref={wrapRef}>
        <div className="coracao-card" ref={cardRef}>
 
          {/* FRENTE */}
          <div className="coracao-face coracao-face--front">
            <svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg">
              <path className="heart-front" d={HEART_PATH} fill="#E24B4A" />
              <text className="coracao-label--front" x="50" y="46">
                me gire
              </text>
            </svg>
          </div>
 
          {/* VERSO */}
          <div className="coracao-face coracao-face--back">
            <svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg">
              <path className="heart-back" d={HEART_PATH} fill="#c0392b" />
              <text className="coracao-label--back" x="50" y="41">
                eu amo você
              </text>
              <text className="coracao-label--back-small" x="50" y="56">
                ❤
              </text>
            </svg>
          </div>
 
        </div>
      </div>
    </div>
  );
}

export default Heart;