import { useEffect, useRef, useState } from 'react';

const actions = ['wave', 'jump', 'code', 'wink'];
const captions = {
  idle: 'Un poco de código. Mucha curiosidad.',
  wave: '¡Ey! Qué bueno verte por aquí.',
  jump: '¡Ese bug ya quedó resuelto!',
  code: 'Una idea. Muchas posibilidades.',
  wink: 'Tú y yo nos entendemos.',
};

export default function Character() {
  const [action, setAction] = useState('idle');
  const nextAction = useRef(0);
  const timer = useRef();
  const characterRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function perform() {
    window.clearTimeout(timer.current);
    setAction(actions[nextAction.current % actions.length]);
    nextAction.current += 1;
    timer.current = window.setTimeout(() => setAction('idle'), 2400);
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

  return <button ref={characterRef} type="button" className={`character character-${action}`} aria-label="Animar al personaje: saludar, saltar, programar o guiñar el ojo" onClick={perform} onPointerMove={look} onPointerLeave={resetLook}>
    <svg viewBox="0 0 320 350" fill="none" aria-hidden="true">
      <ellipse className="character-shadow" cx="163" cy="328" rx="80" ry="9" fill="currentColor" opacity=".12" />
      <g className="character-body">
        <g stroke="#151515" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M123 242L115 295 83 304Q76 317 96 316L128 314 146 249M189 243L206 297 237 305Q247 317 227 317L195 313 169 249" fill="#f6df24" />
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
      </g>
      <g className="character-sparks" stroke="#f6df24" strokeWidth="5" strokeLinecap="round"><path d="M201 33L207 13M220 42L237 28M224 60L248 59"/></g>
      <g className="character-code-bits" fill="#f6df24" fontFamily="monospace" fontSize="22"><text x="22" y="92">{'{ }'}</text><text x="244" y="210">{'</>'}</text></g>
    </svg>
    <span className="character-note" aria-live="polite">{captions[action]}</span>
    <span className="character-hint">TÓCAME · TENGO IDEAS <span aria-hidden="true">↗</span></span>
  </button>;
}
