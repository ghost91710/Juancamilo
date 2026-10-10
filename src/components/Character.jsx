import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useCharacterJourney from './useCharacterJourney';

const actions = [
  { name: 'wave', duration: 2400, caption: '¡Ey! Qué bueno verte por aquí.' },
  { name: 'jump', duration: 2400, caption: '¡Ese bug ya quedó resuelto!' },
  { name: 'code', duration: 3000, caption: 'Una idea. Muchas posibilidades.' },
  { name: 'wink', duration: 2400, caption: 'Tú y yo nos entendemos.' },
  { name: 'fetch', duration: 6400, caption: 'Espérame aquí. Tengo algo para ti…', revealAt: 3900, reveal: '¡Atrápalo! Tu próxima idea empieza aquí.' },
  { name: 'dance', duration: 3600, caption: 'Compiló a la primera. Se celebra.' },
  { name: 'coffee', duration: 4200, caption: 'Un cafecito y seguimos creando.' },
  { name: 'rocket', duration: 7400, caption: 'Esa idea merece llegar muy lejos.', revealAt: 6100, reveal: '¡Volví! Allá arriba se ve brutal.' },
];

const sectionCaptions = {
  home: 'Un poco de código. Mucha curiosidad.',
  about: '¡Llegué! Por aquí está la mente detrás del código.',
  contact: '¡Te alcancé! ¿Le damos vida a esa idea?',
};
const sectionActions = {
  home: actions,
  about: [
    { name: 'inspect', duration: 3200, caption: 'Ojo al detalle. Hasta el bug más pequeño cuenta.' },
    { name: 'think', duration: 3000, caption: 'Primero entender el problema… luego viene el código.' },
  ],
  contact: [
    { name: 'mail', duration: 3000, caption: 'Yo pongo el sobre. Tú pon la primera idea.' },
    { name: 'invite', duration: 2800, caption: 'Por aquí se empieza: un mensajito y conversamos.' },
  ],
};

function Pencil() {
  return <g stroke="#151515" strokeWidth="2.5" strokeLinejoin="round">
    <path d="M22 8h103v24H22Z" fill="#f6df24" />
    <path d="M22 16h103v8H22Z" fill="#e8a52b" stroke="none" />
    <path d="m125 8 30 12-30 12Z" fill="#e7c59d" />
    <path d="m145 16 10 4-10 4Z" fill="#151515" />
    <path d="M10 8h12v24H10q-8 0-8-8v-8q0-8 8-8Z" fill="#ef958f" />
    <path d="M20 8h9v24h-9Z" fill="#f4f2e9" />
    <path d="M37 12h75" stroke="#fff6a3" strokeWidth="2" />
  </g>;
}

export default function Character() {
  const [action, setAction] = useState('idle');
  const [caption, setCaption] = useState('Un poco de código. Mucha curiosidad.');
  const [rocketPeek, setRocketPeek] = useState(false);
  const [throwOrigin, setThrowOrigin] = useState(null);
  const impactAnimation = useRef(null);
  const nextAction = useRef({ home: 0, about: 0, contact: 0 });
  const [place, setPlace] = useState('home');
  const [traveling, setTraveling] = useState(false);
  const busy = useRef(false);
  const timers = useRef([]);
  const characterRef = useRef(null);
  const homeRef = useRef(null);
  const changeScene = useCallback((section, moving) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    impactAnimation.current?.cancel();
    busy.current = moving;
    setRocketPeek(false);
    setThrowOrigin(null);
    setAction('idle');
    setPlace(section);
    setTraveling(moving);
    setCaption(sectionCaptions[section]);
  }, []);
  useCharacterJourney(homeRef, characterRef, changeScene);

  useEffect(() => () => {
    timers.current.forEach(window.clearTimeout);
    impactAnimation.current?.cancel();
  }, []);

  function perform() {
    if (busy.current) return;
    timers.current.forEach(window.clearTimeout);
    const scenes = sectionActions[place];
    const scene = scenes[nextAction.current[place] % scenes.length];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // SVG transforms use viewBox units, so account for the smaller actor on mobile.
    const scale = characterRef.current.querySelector('svg').clientWidth / 320 * Number(characterRef.current.style.getPropertyValue('--journey-scale') || 1);
    characterRef.current.style.setProperty('--escape-x', `${(window.innerWidth + 320) / scale}px`);
    characterRef.current.style.setProperty('--escape-y', `${-(window.innerHeight + 350) / scale}px`);
    nextAction.current[place] += 1;
    busy.current = true;
    setAction(scene.name);
    setCaption(reducedMotion ? scene.reveal || scene.caption : scene.caption);
    if (scene.name === 'rocket' && !reducedMotion) {
      timers.current.push(window.setTimeout(() => {
        setRocketPeek(true);
        setCaption('¡Ey! Ahora estoy por este lado.');
      }, 2000));
      timers.current.push(window.setTimeout(() => setRocketPeek(false), 4600));
    }
    if (scene.name === 'fetch' && !reducedMotion) {
      timers.current.push(window.setTimeout(() => {
        const pencil = characterRef.current.querySelector('.character-pencil').getBoundingClientRect();
        setThrowOrigin({ x: pencil.left + pencil.width / 2, y: pencil.top + pencil.height / 2, width: 120 * scale });
        impactAnimation.current = document.getElementById('root').animate([
          { transform: 'translate(0,0)' }, { transform: 'translate(-5px,3px)' },
          { transform: 'translate(4px,-2px)' }, { transform: 'translate(-2px,1px)' },
          { transform: 'translate(0,0)' },
        ], { duration: 320, delay: 650, easing: 'ease-out' });
      }, 4800));
    }
    if (scene.revealAt && !reducedMotion) {
      timers.current.push(window.setTimeout(() => setCaption(scene.reveal), scene.revealAt));
    }
    timers.current.push(window.setTimeout(() => {
      setRocketPeek(false);
      setThrowOrigin(null);
      impactAnimation.current?.cancel();
      setAction('idle');
      setCaption(sectionCaptions[place]);
      busy.current = false;
    }, reducedMotion ? 1800 : scene.duration));
  }

  function look(event) {
    if (event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    characterRef.current.style.setProperty('--look-x', `${((event.clientX - box.left) / box.width - 0.5) * 9}px`);
    characterRef.current.style.setProperty('--look-y', `${((event.clientY - box.top) / box.height - 0.5) * 7}px`);
  }

  function resetLook() {
    characterRef.current.style.setProperty('--look-x', '0px');
    characterRef.current.style.setProperty('--look-y', '0px');
  }

  // Reuse the same artwork when peeking from the viewport edge.
  const actor = <g className="character-body">
        <g stroke="#151515" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <g className="character-legs" fill="#f6df24"><path className="character-leg-left" d="M123 242L115 295 83 304Q76 317 96 316L128 314 146 249" /><path className="character-leg-right" d="M189 243L206 297 237 305Q247 317 227 317L195 313 169 249" /></g>
          <g className="character-left-arm" stroke="#f6df24"><path d={action === 'jump' ? "M83 152Q48 151 47 111M47 111C34 112 31 103 35 94Q40 86 45 95Q48 83 54 88Q61 94 57 104Z" : "M83 152Q35 175 44 221M46 216Q30 206 28 221L33 239M43 223L46 244M51 219L57 237"} /></g>
          <g className="character-right-arm" stroke="#f6df24"><path d={action === 'jump' ? "M231 151Q268 149 271 111M271 111C284 112 287 103 283 94Q278 86 273 95Q270 83 264 88Q257 94 261 104Z" : "M231 151Q273 156 282 115M272 124L267 100M280 119L285 94M285 126L300 107"} /></g>
          <rect x="77" y="54" width="164" height="202" rx="75" fill="#f6df24" transform="rotate(-9 159 155)" />
          <path className="character-smile" d="M124 176Q151 199 179 169" />
        </g>
        <g className="character-gaze"><g className="character-eyes" fill="#151515"><ellipse cx="123" cy="128" rx="10" ry="24" transform="rotate(-9 123 128)"/><g className="character-wink-eye"><ellipse cx="169" cy="121" rx="10" ry="24" transform="rotate(-9 169 121)"/></g></g></g>
        <g className="character-laptop" stroke="#151515" strokeWidth="5" strokeLinejoin="round">
          <path d="M88 204H228L215 278H101Z" fill="#f4f2e9"/><path d="M87 279H230" strokeLinecap="round"/>
          <path className="character-code-symbol" d="m143 232-10 9 10 9m30-18 10 9-10 9m-11-23-8 27" fill="none" strokeWidth="4" />
        </g>
        <g className="character-pencil">
          <g transform="translate(267 130) rotate(-65) scale(.75)"><Pencil /></g>
        </g>
        <g className="character-magnifier" stroke="#151515" strokeWidth="5" strokeLinecap="round">
          <path d="m199 165 27 42" stroke="#f4f2e9" strokeWidth="13" />
          <circle cx="181" cy="137" r="34" fill="#f4f2e9" fillOpacity=".8" />
          <path d="M160 132q3-17 20-18" stroke="#fff" />
          <path d="m204 184 15 21" stroke="#f6df24" strokeWidth="15" />
        </g>
        <g className="character-letter" stroke="#151515" strokeWidth="4" strokeLinejoin="round">
          <path className="character-letter-paper" d="M110 210v-49h99v49" fill="#fffdf3" />
          <path className="character-letter-paper" d="m143 185 10 10 22-22" fill="none" />
          <rect x="99" y="201" width="123" height="75" rx="8" fill="#f4f2e9" />
          <path d="m100 205 61 39 60-39m-120 68 42-35m77 35-42-35" fill="none" />
        </g>
        <g className="character-thought" fill="#f4f2e9" stroke="#151515" strokeWidth="3">
          <circle cx="227" cy="67" r="5" /><circle cx="245" cy="49" r="9" />
          <path d="M237 7q35-27 62 0v29h-62Z" />
          <text x="257" y="28" stroke="none" fill="#151515" fontSize="29" fontFamily="monospace">?</text>
        </g>
        <g className="character-headphones" stroke="#151515" strokeWidth="7">
          <path d="M85 117C65 28 199 11 219 97" stroke="#f4f2e9" strokeWidth="13" />
          <rect x="74" y="98" width="25" height="46" rx="12" fill="#f4f2e9" transform="rotate(-9 86 121)" />
          <rect x="207" y="77" width="25" height="46" rx="12" fill="#f4f2e9" transform="rotate(-9 220 100)" />
        </g>
        <g className="character-coffee-cup" stroke="#151515" strokeWidth="5" strokeLinejoin="round">
          <g className="character-steam" stroke="#f4f2e9" strokeWidth="3" strokeLinecap="round"><path d="M153 195q-9-9 0-18t0-18m20 36q-9-9 0-18" /></g>
          <path d="M188 211h10c23 0 20 31-6 31" fill="none" />
          <path d="M128 205h65l-6 44q-25 16-53 0Z" fill="#f4f2e9" />
          <ellipse cx="160" cy="205" rx="32" ry="7" fill="#88552d" />
          <path d="m151 223 7 7 12-12" fill="none" strokeLinecap="round" />
          <path d="M122 234q-19-17-22-1t27 14" fill="#f6df24" />
        </g>
        <g className="character-rocket-pack" stroke="#151515" strokeWidth="5" strokeLinejoin="round">
          <path d="M84 194q-26 25-18 82l23-12m144-70q26 25 18 82l-23-12" fill="#f4f2e9" />
          <path className="character-flame" d="m70 276 8 44 11-44m139 0 10 44 10-44" fill="#f6df24" stroke="#f6df24" />
        </g>
      </g>;

  return <><div ref={homeRef} className="character character-home" aria-hidden="true" />
  {createPortal(<div className="character-journey"><button ref={characterRef} type="button" className={`character character-actor character-${action}`} aria-label={`Animar al personaje: ${place === 'about' ? 'conocer su lado curioso' : place === 'contact' ? 'preparar una nueva idea' : 'descubrir la siguiente sorpresa'}`} aria-disabled={traveling || action !== 'idle'} onClick={perform} onPointerMove={look} onPointerLeave={resetLook}>
    <svg viewBox="0 0 320 350" fill="none" aria-hidden="true">
      <ellipse className="character-shadow" cx="163" cy="328" rx="80" ry="9" fill="currentColor" opacity=".12" />
      <g className="character-traveler">
      {actor}
      </g>
      <g className="character-music" fill="#f6df24" fontSize="36" fontFamily="Arial"><text x="24" y="111">♪</text><text x="264" y="193">♫</text><text x="249" y="58">♪</text></g>
      <g className="character-dust" stroke="#f4f2e9" strokeWidth="4" strokeLinecap="round"><path d="M46 298H23m38 14H37m10-28H33" /></g>
      <g className="character-sparks" stroke="#f6df24" strokeWidth="5" strokeLinecap="round"><path d="M201 33L207 13M220 42L237 28M224 60L248 59"/></g>
      <g className="character-code-bits" fill="#f6df24" fontFamily="monospace" fontSize="22"><text x="22" y="92">{'{ }'}</text><text x="244" y="210">{'</>'}</text></g>
    </svg>
    <span className="character-note" aria-live="polite">{traveling ? '' : caption}</span>
    <span className="character-hint">{action !== 'idle' ? 'UN MOMENTICO…' : place === 'about' ? 'TÓCAME · SOY TODO CURIOSIDAD' : place === 'contact' ? 'TÓCAME · TENGO UN MENSAJE' : 'TÓCAME · OTRA SORPRESA'} <span aria-hidden="true">↗</span></span>
  </button></div>, document.body)}
  {rocketPeek && createPortal(<div className="character-peek-stage" aria-hidden="true">
    <div className="character-rocket-peek"><svg viewBox="0 0 320 350" fill="none">{actor}</svg></div>
  </div>, document.body)}
  {throwOrigin && createPortal(<div className="pencil-throw-stage" aria-hidden="true" style={{ '--pencil-x': `${throwOrigin.x}px`, '--pencil-y': `${throwOrigin.y}px`, '--pencil-width': `${throwOrigin.width}px` }}>
    <div className="pencil-projectile"><svg viewBox="0 0 160 40" fill="none"><Pencil /></svg></div>
    <div className="pencil-impact">
      <svg viewBox="0 0 240 240" fill="none">
        <circle className="pencil-impact-ring" cx="120" cy="120" r="60" />
        <g className="pencil-impact-lines"><path d="m120 26 0-17m66 45 13-13m15 79h17m-45 66 13 13m-79 15v17m-66-45-13 13m-15-79H9m45-66L41 41" /></g>
        <path className="pencil-impact-scribble" d="m88 127 39-29-20 40 38-31-13 29 20-8" />
      </svg>
    </div>
  </div>, document.body)}
  </>;
}
