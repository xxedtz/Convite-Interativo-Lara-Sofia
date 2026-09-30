import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoltenMetal from './components/MoltenMetal';
import Ferrofluid from './components/Ferrofluid';
import SpecularButton from './components/SpecularButton';
import RubberSegment from './components/RubberSegment';
import ParticleText from './components/ParticleText';
import FoldText from './components/FoldText';
import './styles.css';

/* ---------------- Dados do evento (edite aqui) ---------------- */
const EVENT = new Date('2026-12-12T18:30:00-03:00');
const WA = 'https://wa.me/5582991423318?text=' + encodeURIComponent('Olá! Confirmo a minha presença na formatura da Lara Sofia!');
const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Casa Blanca Arapiraca');
const UNITS = { Meses: ['mês', 'meses'], Semanas: ['semana', 'semanas'], Dias: ['dia', 'dias'], Horas: ['hora', 'horas'] };
const SEGMENTS = Object.keys(UNITS);
const FERRO = ['#EAB308', '#1605ec', '#EAB308'];
const ESSENCIAIS = [
  ['ACOMPANHANTE', 'Cada convidado pode levar um acompanhante.'],
  ['BEBIDAS E COMIDAS', 'Para levar qualquer bebida ou comida, é necessário ter consentimento prévio.'],
  ['CONVITE EM MÃOS', 'Tenha este convite em mãos ao chegar ao local, para comprovar a sua legitimidade.']
];
const guest = new URLSearchParams(location.search).get('convidado'); // ?convidado=Maria
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(hover: none)').matches;

const remaining = (unit, now) => {
  const d = EVENT - now;
  if (d <= 0) return 0;
  if (unit === 'Horas') return Math.floor(d / 36e5);
  if (unit === 'Dias') return Math.floor(d / 864e5);
  if (unit === 'Semanas') return Math.floor(d / 6048e5);
  const m = (EVENT.getFullYear() - now.getFullYear()) * 12 + EVENT.getMonth() - now.getMonth();
  const t = new Date(now);
  t.setMonth(t.getMonth() + m);
  return Math.max(0, t > EVENT ? m - 1 : m);
};

/* Texto pequeno = FoldText (revela ao rolar) */
const F = p => <FoldText trigger="scroll" splitBy="char" duration={0.6} stagger={0.028} fontWeight={600} {...p} />;

/* ---------------- Selo de cera vermelho com capelo dourado ---------------- */
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const BLOB = (() => {
  const R = [2, -2, 3, -1, 1, -3, 2, 0, -2, 3, -1, 2, -3, 1];
  const P = R.map((v, i) => {
    const a = (i / 14) * Math.PI * 2;
    return [50 + Math.cos(a) * (42 + v), 50 + Math.sin(a) * (42 + v)];
  });
  let d = 'M' + mid(P[0], P[1]);
  for (let i = 1; i <= 14; i++) d += `Q${P[i % 14]} ${mid(P[i % 14], P[(i + 1) % 14])}`;
  return d + 'Z';
})();

const Wax = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d={BLOB} fill="url(#waxG)" />
    <path d={BLOB} fill="none" stroke="#6b0212" strokeOpacity=".55" />
    <circle cx="50" cy="50" r="31" fill="none" stroke="#8f0716" strokeWidth="1.6" />
    <circle cx="50" cy="50" r="28" fill="#c90f26" opacity=".55" />
    <g fill="url(#goldG)">
      <path d="M50 32 79 44 50 56 21 44Z" />
      <path d="M34 52v9c0 5 7.5 8 16 8s16-3 16-8v-9l-16 7Z" opacity=".92" />
      <rect x="76" y="44" width="2.2" height="14" />
      <circle cx="77" cy="60" r="2.8" />
    </g>
    <ellipse cx="33" cy="25" rx="15" ry="6.5" fill="#fff" opacity=".24" transform="rotate(-32 33 25)" />
  </svg>
);

/* ---------------- Dress code desenhado em código ---------------- */
function Dress({ onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    d.showModal();
    return () => d.open && d.close();
  }, []);
  const line = { stroke: '#EAB308', strokeOpacity: 0.55, strokeWidth: 0.8 };
  return (
    <dialog ref={ref} onClose={onClose} onClick={e => e.target === ref.current && ref.current.close()} aria-label="Dress code">
      <div className="dbox">
        <button className="x" onClick={() => ref.current.close()} aria-label="Fechar">
          <svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" /></svg>
        </button>
        <FoldText className="dtitle" text="DRESS CODE" trigger="mount" fontSize="1.7rem" fontWeight={700} color="#F3DE9B" stagger={0.05} />
        <FoldText className="dsub" text="Roupa adequada ao evento" splitBy="word" trigger="mount" fontSize="0.95rem" fontWeight={500} color="#E2E8F0" />
        <div className="figs">
          <figure>
            <svg viewBox="0 0 120 260" role="img" aria-label="Vestido longo minimalista">
              <path d="M46 47Q54 24 60 8Q66 24 74 47" fill="none" stroke="#EAB308" strokeWidth="1.4" />
              <path d="M38 44Q49 52 60 46Q71 52 82 44L76 92Q88 112 84 128L106 250H14L36 128Q32 112 44 92Z" fill="#6d1730" {...line} />
              <path d="M60 50V250M48 100 32 250M72 100 88 250" stroke="#fff" strokeOpacity=".09" fill="none" />
              <path d="M44 92Q60 99 76 92" fill="none" stroke="#EAB308" strokeWidth="2" />
              <path d="M84 128 96 250" stroke="#ff8fa3" strokeOpacity=".4" fill="none" />
            </svg>
            <figcaption>Vestido</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 120 260" role="img" aria-label="Terno minimalista">
              <path d="M30 140H60V168L56 250H34ZM60 140H90L86 250H64L60 168Z" fill="#1d2130" {...line} />
              <path d="M34 30 50 20 60 66 70 20 86 30 98 142H22Z" fill="#2c3145" {...line} />
              <path d="M50 20 60 66 70 20Z" fill="#f3ecdc" />
              <path d="M50 20 34 30 46 84 60 66ZM70 20 86 30 74 84 60 66Z" fill="#3b4158" {...line} />
              <path d="M60 40 56.5 50 60 88 63.5 50Z" fill="#EAB308" />
              <circle cx="60" cy="108" r="2" fill="#EAB308" />
              <circle cx="60" cy="124" r="2" fill="#EAB308" />
              <path d="M78 66h10l-1 6H79Z" fill="#f3ecdc" />
            </svg>
            <figcaption>Terno</figcaption>
          </figure>
        </div>
        <div className="warn" role="note">
          <strong>Evite azul e tons semelhantes.</strong> Essa é a cor da roupa dos formandos.
          <div className="sw" aria-hidden="true">
            {['#1e3a8a', '#2563eb', '#38bdf8', '#0e7490'].map(c => <i key={c} style={{ background: c }} />)}
          </div>
        </div>
      </div>
    </dialog>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const [phase, setPhase] = useState('closed'); // closed -> page -> done
  const [content, setContent] = useState(false);
  const [unit, setUnit] = useState('Dias');
  const [now, setNow] = useState(() => new Date());
  const [dress, setDress] = useState(false);
  const stage = useRef(null), env = useRef(null), sway = useRef(null), busy = useRef(false), shown = useRef(false);

  useEffect(() => { document.body.classList.toggle('lock', phase !== 'done'); if (phase === 'done') setTimeout(() => ScrollTrigger.refresh(), 60); }, [phase]);
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);

  /* Carta balançando o tempo todo, chamando para ser aberta */
  useEffect(() => {
    if (reduce) return;
    sway.current = gsap.fromTo(env.current, { rotation: -2.4, y: 0 }, { rotation: 2.4, y: -10, duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 8%' });
    return () => sway.current?.kill();
  }, []);

  /* O papel vira a página: o convite se revela e o ferrofluido aparece por baixo */
  useEffect(() => {
    if (phase !== 'page') return;
    gsap.to(stage.current.querySelector('.sheet'), {
      autoAlpha: 0, duration: 1.2, delay: 0.2, ease: 'power2.inOut',
      onUpdate() { if (!shown.current && this.progress() > 0.45) { shown.current = true; setContent(true); } },
      onComplete: () => setPhase('done')
    });
  }, [phase]);

  const expand = () => {
    const root = stage.current, q = s => root.querySelector(s), p = q('.paper').getBoundingClientRect(), sh = q('.sheet');
    gsap.set(sh, { left: p.left, top: p.top, width: p.width, height: p.height, autoAlpha: 1, borderRadius: 6 });
    gsap.set(q('.paper'), { autoAlpha: 0 });
    const t = gsap.timeline({ onComplete: () => setPhase('page') });
    t.to(sh, { left: 0, top: 0, width: innerWidth, height: innerHeight, borderRadius: 0, duration: 1.15, ease: 'expo.inOut' }, 0)
      .to(q('.env'), { yPercent: 55, scale: 0.86, autoAlpha: 0, duration: 0.95, ease: 'power3.in' }, 0)
      .to([q('.intro-head'), q('.intro-hint')], { autoAlpha: 0, duration: 0.5 }, 0)
      .to(q('.molten'), { autoAlpha: 0, duration: 0.9 }, 0.3);
    if (reduce) t.timeScale(2.5);
  };

  /* Quebra do selo -> aba abre -> carta sobe -> papel ocupa a tela */
  const open = () => {
    if (busy.current) return;
    busy.current = true;
    const root = stage.current, q = s => root.querySelector(s), envEl = env.current;
    sway.current?.kill();
    const shards = Array.from({ length: 14 }, () => {
      const s = document.createElement('i'), z = 5 + Math.random() * 8;
      s.className = 'shard'; s.style.width = z + 'px'; s.style.height = z * 0.8 + 'px';
      envEl.appendChild(s);
      return s;
    });
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: expand });
    tl.to(envEl, { rotation: 0, y: 0, duration: 0.4, ease: 'power2.out' }, 0)
      .set(q('.seal'), { visibility: 'hidden' }, 0.05)
      .set(root.querySelectorAll('.half'), { visibility: 'visible' }, 0.05)
      .fromTo(q('.half.l'), { x: 0, y: 0, rotation: 0 }, { x: -52, y: 380, rotation: -44, duration: 1.15, ease: 'power2.in' }, 0.05)
      .fromTo(q('.half.r'), { x: 0, y: 0, rotation: 0 }, { x: 58, y: 430, rotation: 50, duration: 1.15, ease: 'power2.in' }, 0.05)
      .to(shards, { x: () => gsap.utils.random(-120, 120), y: () => gsap.utils.random(-60, 300), rotation: () => gsap.utils.random(-300, 300), opacity: 0, duration: 1.1, ease: 'power2.in', onComplete: () => shards.forEach(s => s.remove()) }, 0.05)
      .to(q('.flap'), { rotationX: -180, duration: 0.95 }, 0.3)
      .set(q('.flap'), { zIndex: 1 }, 0.75)
      .to(q('.paper'), { yPercent: -56, duration: 1, ease: 'power3.out' }, 1.05);
    if (reduce) tl.timeScale(2.5);
  };

  const n = remaining(unit, now), [one, many] = UNITS[unit];
  const acts = [
    { t: 'Confirmar presença', go: () => window.open(WA, '_blank', 'noopener'), i: <><circle cx="12" cy="12" r="9.5" /><path d="m7.8 12.4 3 3 5.6-6.4" /></> },
    { t: 'Localização', go: () => window.open(MAPS, '_blank', 'noopener'), i: <><path d="M12 21.5s7-6.2 7-11.7a7 7 0 1 0-14 0c0 5.5 7 11.7 7 11.7z" /><circle cx="12" cy="9.6" r="2.6" /></> },
    { t: 'Dress code', go: () => setDress(true), i: <><path d="M2.5 7.5 10 11.2v1.6l-7.5 3.7z" /><path d="M21.5 7.5 14 11.2v1.6l7.5 3.7z" /><rect x="10" y="10.2" width="4" height="3.6" rx="1" /></> }
  ];

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false"><defs>
        <radialGradient id="waxG" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#ff5b62" /><stop offset=".45" stopColor="#e4132c" /><stop offset="1" stopColor="#8e0416" /></radialGradient>
        <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0a8" /><stop offset=".5" stopColor="#EAB308" /><stop offset="1" stopColor="#a87506" /></linearGradient>
        <linearGradient id="navB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#17318a" /><stop offset="1" stopColor="#0d1b5a" /></linearGradient>
        <linearGradient id="navC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f2166" /><stop offset="1" stopColor="#0a1547" /></linearGradient>
        <linearGradient id="navF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f3ea3" /><stop offset="1" stopColor="#12266f" /></linearGradient>
        <linearGradient id="navR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a1547" /><stop offset="1" stopColor="#060f38" /></linearGradient>
      </defs></svg>

      {phase !== 'closed' && (
        <div className="ferro">
          <Ferrofluid colors={FERRO} speed={0.5} scale={1} turbulence={1} fluidity={0.1} rimWidth={0.2} sharpness={3} shimmer={1} glow={2} flowDirection="down" opacity={1} mouseInteraction mouseStrength={1} mouseRadius={0.3} />
        </div>
      )}

      {content && (
        <main className="page">
          <div className="frame" />
          <F className="eyebrow" text="CONVITE DE FORMATURA" fontSize="0.8rem" color="#EAB308" trigger="mount" />
          <div className="hero">
            <ParticleText text="LARA SOFIA" fontFamily="Cinzel, serif" fontSize="clamp(2.6rem, 12vw, 4.6rem)" fontWeight={700} color="#ffffff" highlightColor="#EAB308" particleSize={2} density={3} scatter={160} pointerRepel={46} repelRadius={110} idleDrift={0.7} trigger="click" />
          </div>
          <F className="lead" splitBy="word" trigger="mount" stagger={0.04} fontSize="1.02rem" fontWeight={500} color="#E2E8F0"
            text={`${guest ? guest + ', c' : 'C'}om muita alegria e gratidão, convido você para celebrar comigo este momento tão especial da minha formatura!`} />
          <F className="sign" splitBy="word" trigger="mount" fontSize="0.95rem" color="#F3DE9B" text="Com carinho, Lara Sofia" />

          <section className="card when">
            <F className="k" text="SÁBADO" fontSize="0.78rem" color="#94A3B8" />
            <div className="dnum">12</div>
            <F className="k" text="DE DEZEMBRO DE 2026" fontSize="0.78rem" color="#94A3B8" />
            <div className="rows">
              <div><F className="k" text="HORA" fontSize="0.7rem" color="#94A3B8" /><strong>ÀS 18:30</strong></div>
              <div><F className="k" text="LOCAL" fontSize="0.7rem" color="#94A3B8" /><strong>Casa Blanca Arapiraca</strong></div>
            </div>
          </section>

          <section className="card count">
            <F className="k" text="FALTAM" fontSize="0.74rem" color="#94A3B8" />
            <div className="num">
              <ParticleText text={String(n)} fontFamily="Cinzel, serif" fontSize="clamp(4.2rem, 22vw, 6.6rem)" fontWeight={700} color="#ffffff" highlightColor="#EAB308" particleSize={2} density={3} scatter={120} stagger={300} gatherDuration={1100} pointerRepel={36} repelRadius={90} idleDrift={0.5} trigger="click" />
            </div>
            <F className="unit" splitBy="word" trigger="mount" fontSize="0.95rem" color="#F3DE9B" text={`${n === 1 ? one : many} para o grande dia`} />
            <RubberSegment items={SEGMENTS} defaultValue="Dias" onChange={setUnit} trackColor="#0a1233" thumbColor="#EAB308" textColor="#F3E6B5" activeTextColor="#1a1204" size="lg" radius={14} inset={4} equalSlots={false} aria-label="Unidade da contagem regressiva" />
          </section>

          <nav className="acts" aria-label="Ações do convite">
            {acts.map(a => (
              <div className="act" key={a.t}>
                <SpecularButton className="orb" size="md" radius={999} tint="#EAB308" tintOpacity={0.1} blur={4} textColor="#F3DE9B" lineColor="#FFF3C4" baseColor="#B38728" intensity={1.3} shineSize={16} shineFade={40} thickness={1.4} speed={0.35} followMouse proximity={320} autoAnimate={coarse} onClick={a.go}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">{a.i}</svg>
                  <span className="sr">{a.t}</span>
                </SpecularButton>
                <F className="k" splitBy="word" text={a.t} fontSize="0.7rem" color="#F3DE9B" />
              </div>
            ))}
          </nav>

          <section className="card ess">
            <F className="k gold" text="COISAS ESSENCIAIS" fontSize="0.78rem" color="#EAB308" />
            {ESSENCIAIS.map(([h, p]) => (
              <article key={h}>
                <F className="k" text={h} fontSize="0.7rem" color="#F3DE9B" />
                <F className="p" splitBy="word" text={p} fontSize="0.95rem" fontWeight={500} color="#E2E8F0" stagger={0.03} />
              </article>
            ))}
          </section>
          <F className="k end" text="LARA SOFIA · FORMATURA 2026" fontSize="0.7rem" color="#94A3B8" />
        </main>
      )}

      {dress && <Dress onClose={() => setDress(false)} />}

      {phase !== 'done' && (
        <section className="stage" ref={stage}>
          <div className="molten">{phase === 'closed' && (
            <MoltenMetal color1="#2739ff" color2="#0817ea" color3="#EAB308" speed={0.35} scale={4} detail={3} glow={1.6} coreSize={0.1} swirl={1} fold={-0.2} blackPoint={0.05} brightness={1.3} colorMode="molten" grain grainIntensity={0.05} mouseInteraction mouseStrength={0.3} opacity={1} />
          )}</div>

          <header className="intro-head">
            <div className="pt"><ParticleText text="CONVITE" fontFamily="Cinzel, serif" fontSize="clamp(2.6rem, 13vw, 4.6rem)" fontWeight={700} color="#ffffff" highlightColor="#EAB308" particleSize={2} density={3} scatter={140} idleDrift={0.6} trigger="click" /></div>
            <FoldText className="sub" text="DE FORMATURA" trigger="mount" fontSize="0.82rem" fontWeight={600} color="#F3DE9B" stagger={0.04} />
          </header>

          <button className="env" ref={env} onClick={open} aria-label="Abrir o convite de formatura de Lara Sofia">
            <svg className="layer l-back" viewBox="0 0 300 405" aria-hidden="true"><path d="M0 0 150 215 300 0V405H0Z" fill="#06103a" /><path d="M0 0 150 215 300 0" fill="#040a26" /></svg>
            <span className="paper"><b>LS</b></span>
            <svg className="layer l-front" viewBox="0 0 300 405" aria-hidden="true">
              <path d="M0 0 150 215 0 405Z" fill="url(#navB)" /><path d="M300 0 150 215 300 405Z" fill="url(#navB)" /><path d="M0 405 150 215 300 405Z" fill="url(#navC)" />
              <g fill="none" stroke="#EAB308"><path d="M0 405 150 215 300 405M0 0 150 215 300 0" strokeOpacity=".5" strokeWidth=".8" /><rect x="6" y="6" width="288" height="393" rx="3" strokeOpacity=".35" strokeWidth=".8" /></g>
            </svg>
            <span className="label">
              <FoldText text={`PARA ${(guest || 'O(A) CONVIDADO(A)').toUpperCase()}`} trigger="mount" fontSize="0.68rem" fontWeight={600} color="#94A3B8" stagger={0.03} className="lbl" />
              <FoldText text="Convite de Lara Sofia" splitBy="word" trigger="mount" fontSize="1rem" fontWeight={700} color="#F3DE9B" className="lbl2" />
            </span>
            <span className="flap">
              <svg className="face" viewBox="0 0 300 215" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H300L150 215Z" fill="url(#navF)" stroke="#EAB308" strokeOpacity=".6" strokeWidth=".9" /><path d="M26 9H274L150 190Z" fill="none" stroke="#EAB308" strokeOpacity=".3" strokeWidth=".7" /></svg>
              <svg className="face rev" viewBox="0 0 300 215" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H300L150 215Z" fill="url(#navR)" stroke="#EAB308" strokeOpacity=".4" strokeWidth=".8" /></svg>
            </span>
            <span className="seal"><Wax /></span>
            <span className="half l"><Wax /></span>
            <span className="half r"><Wax /></span>
          </button>

          <FoldText className="intro-hint" text="TOQUE NO SELO PARA ABRIR" trigger="mount" fontSize="0.76rem" fontWeight={600} color="#F3DE9B" stagger={0.03} />
          <div className="sheet"><b>LS</b></div>
        </section>
      )}
    </>
  );
}
