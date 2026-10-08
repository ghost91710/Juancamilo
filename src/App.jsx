import { useEffect, useRef, useState } from 'react';
import Character from './components/Character';
import videoStore from './assets/video1.1.mp4';
import videoBudget from './assets/video2.1.mp4';
import videoAuraverse from './assets/video-auraverse.mp4';
import cv from './assets/cv-JuanCamiloGonzalez.pdf';

const technologies = [
  'React', 'Next.js', 'JavaScript', 'TypeScript', 'PHP',
  'Nest.js', 'PostgreSQL', 'Supabase', 'Drizzle', 'Zustand',
  'Tailwind CSS', 'HTML', 'CSS', 'Vite', 'Git', 'Vercel',
];

const projects = [
  { name: 'Auraverse.', category: 'PLATAFORMA SOCIAL', number: '01', status: 'En desarrollo', description: 'Una red social para compartir fotos y clips, participar en batallas y subir en el ranking de la comunidad.', contribution: 'Desarrollo de la plataforma por encargo de un cliente.', focus: 'Publicaciones, batallas y ranking en un mismo recorrido.', implementation: 'Next.js y TypeScript con PostgreSQL y Drizzle para los datos.', tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle'], previewLabel: 'auraverse.site', poster: '/project-auraverse.png', video: videoAuraverse, url: 'https://auraverse.site/' },
  { name: 'Todo en orden.', category: 'GESTIÓN DE TIENDA', number: '02', description: 'Una aplicación que reúne la gestión de una tienda y un catálogo público para llevarla también a la web.', contribution: 'Desarrollo de la aplicación de gestión y el catálogo.', focus: 'Conectar inventario, proveedores y ventas.', implementation: 'React para la interfaz y Nest.js para el servidor, con Supabase.', tech: ['React', 'Nest.js', 'Supabase', 'Tailwind'], previewLabel: 'minimercado / dashboard', poster: '/project-store.jpg', video: videoStore, url: 'https://minimercadodemo-cmdr.vercel.app/' },
  { name: 'Cuentas claras.', category: 'FINANZAS PERSONALES', number: '03', description: 'Un espacio para registrar gastos, seguir movimientos y entender mejor las finanzas personales.', contribution: 'Desarrollo de la aplicación para registrar y consultar gastos.', focus: 'Hacer más fácil el seguimiento de los movimientos.', implementation: 'React y JavaScript para la interfaz, con Supabase para los datos.', tech: ['React', 'JavaScript', 'Supabase', 'Tailwind'], previewLabel: 'mis gastos / dashboard', poster: '/project-budget.jpg', video: videoBudget, url: 'https://appgastos-ten.vercel.app/' },
];

function Arrow() { return <svg className="icon-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function DownArrow() { return <svg className="icon-down" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function PlayIcon() { return <svg className="icon-play" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor" /></svg>; }
function Sparkle() { return <svg className="icon-sparkle" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6m0-15.6L4.2 19.8" stroke="currentColor" strokeWidth="2" /></svg>; }

const contactWords = [
  'genial', 'asombroso', 'chimba', 'chévere', 'magnífico',
  'increíble', 'bacano', 'brutal', 'memorable', 'distinto',
];

function RotatingContactWord() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let swapTimeout;
    const interval = window.setInterval(() => {
      setLeaving(true);
      swapTimeout = window.setTimeout(() => {
        setIndex((current) => (current + 1) % contactWords.length);
        setLeaving(false);
      }, 300);
    }, 3400);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimeout);
    };
  }, []);

  const word = contactWords[index];
  return <span className="contact-word-slot">
    {contactWords.map((entry) => <span key={entry} className={`contact-word-measure${entry.length > 6 ? ' is-long' : ''}`} aria-hidden="true">{entry}.</span>)}
    <em key={word} className={`contact-word${word.length > 6 ? ' contact-word-long' : ''}${index === 0 ? ' contact-word-initial' : ''}${leaving ? ' is-leaving' : ''}`}>{word}.</em>
  </span>;
}

function Brand() {
  return <a className="wordmark" href="#inicio" aria-label="Juan Camilo, volver al inicio">
    <svg className="brand-symbol" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* Monograma modular JC: ambas iniciales comparten el trazo central. */}
      <g className="brand-monogram" stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M9 10h23v33c0 8-5 12-13 12H9V45" />
        <path d="M55 20V10H44c-8 0-12 5-12 13v19c0 8 5 13 13 13h10V45" />
        <path className="brand-accent" d="M20 10v10M45 32h10" strokeWidth="2.5" />
      </g>
    </svg>
    <span className="brand-name">camilo<span className="brand-role">DESARROLLADOR</span></span>
  </a>;
}


export default function App() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current.querySelectorAll('.project-card');
    // Tall cards must scroll to their bottom before the next card covers them.
    const observer = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        target.style.setProperty('--project-height', `${target.getBoundingClientRect().height}px`);
      });
    });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = pageRef.current.querySelectorAll('.section-heading, .project-layout, .about > div, .contact-title');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach((target) => {
      target.classList.add('reveal');
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#projects">Saltar a los proyectos</a>
    <header className="navigation">
      <Brand />
      <nav aria-label="Navegación principal"><a href="#projects">Proyectos <span>{String(projects.length).padStart(2, '0')}</span></a><a href="#about">Sobre mí</a><a className="nav-contact" href="#contact">Hablemos <Arrow /></a></nav>
    </header>
    <main ref={pageRef}>
      <section className="hero" id="inicio">
        <div className="hero-top eyebrow"><span>JUAN CAMILO GONZÁLEZ MUÑOZ</span><span className="availability"><i /> ABIERTO A OPORTUNIDADES</span></div>
        <h1>Ideas que se<br/>vuelven <span className="software-word">software<svg viewBox="0 0 410 25" preserveAspectRatio="none" aria-hidden="true"><path d="M5 17Q177 -3 401 11M36 23Q197 5 375 20" /></svg></span><span className="period">.</span></h1>
        <div className="hero-bottom"><div className="hero-copy"><p>Desarrollador de software.<br/>Me mueve resolver problemas complejos. <br className="desktop-break"/>Conecto lógica, datos e interfaces para <br className="desktop-break"/>construir software que tenga sentido.</p><a className="pill yellow" href="#projects">Explora mi trabajo <DownArrow /></a></div><Character /></div>
        <div className="hero-foot eyebrow"><span>SOFTWARE, CURIOSIDAD & UN TOQUE DE PERSONALIDAD</span><a href="#projects">SIGUE EXPLORANDO <DownArrow /></a></div>
      </section>
      <div className="ticker" role="img" aria-label={`Tecnologías: ${technologies.join(', ')}`}>
        <div aria-hidden="true">{[0, 1].map(copy => <span className="ticker-group" key={copy}>
          {technologies.map(technology => <span className="ticker-item" key={technology}>{technology.toUpperCase()} <Sparkle /></span>)}
        </span>)}</div>
      </div>
      <section className="work section-wrap" id="projects">
        <div className="section-heading"><div><p className="eyebrow">01 / TRABAJO SELECCIONADO</p><h2>Del código<br/>a la <em>realidad.</em></h2></div><p>Ideas convertidas en aplicaciones.<br/>Explora lo que he estado construyendo.</p></div>
        <div className="project-stack">{projects.map((project, index) => <article
          className="project-card"
          key={project.number}
          style={{
            '--project-sticky-mobile': `${12 + index * 12}px`,
            '--project-sticky-desktop': `${25 + index * 20}px`,
            '--project-layer': index + 1,
          }}
        >
          <div className="project-top eyebrow"><span>{project.category}</span><span>PROYECTO / {project.number}</span></div>
          <div className="project-layout"><div className="project-info"><h3>{project.name}</h3>{project.status && <span className="project-status"><i />{project.status}</span>}<p>{project.description}</p><dl className="project-context"><div><dt>MI APORTE</dt><dd>{project.contribution}</dd></div><div><dt>ENFOQUE</dt><dd>{project.focus}</dd></div><div><dt>BASE TÉCNICA</dt><dd>{project.implementation}</dd></div></dl><ul className="tags">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul><a className="project-link" href={project.url} target="_blank" rel="noreferrer">Ver {project.name.replace(/\.$/, '')} <Arrow /></a></div><div className="project-preview"><div className="browser-bar" aria-hidden="true"><span className="browser-dots"><i /><i /><i /></span><span>{project.previewLabel}</span><Arrow /></div><video controls playsInline loading="lazy" preload="none" poster={project.poster} aria-label={project.number === '01' ? 'Recorrido por Inicio, Buscar, Batallas y Ranking de Auraverse' : `Vista previa de ${project.name}`} src={`${project.video}#t=0.1`} /><p className="preview-caption">{project.number === '01' ? 'INICIO · BUSCAR · BATALLAS · RANKING' : 'DALE PLAY Y MÍRALO EN ACCIÓN'} <PlayIcon /></p></div></div>
        </article>)}</div>
      </section>
      <section className="about section-wrap" id="about"><div><p className="eyebrow">02 / DETRÁS DEL CÓDIGO</p><h2>Una mente curiosa.<br/>Manos en el <em>código.</em></h2><div className="about-sticker" aria-hidden="true">{ '</>' }</div></div><div className="about-copy"><p>Soy Juan Camilo, desarrollador de software con experiencia en QA y soporte TI. Me gusta entrar en problemas complejos, entender cómo encajan sus piezas y convertirlos en software útil. Mi experiencia en QA y soporte me enseñó a pensar también en lo que puede fallar y en quienes usan cada sistema.</p><p>Trabajo con React, Next.js, Nest.js y PostgreSQL para conectar interfaces, lógica de negocio y datos. Me interesa seguir creciendo en arquitectura de software y construir sistemas cada vez más sólidos, sin perder el cuidado por los detalles.</p><div className="experience-list" aria-label="Experiencia profesional">
          <h3>Experiencia y proyecto actual</h3>
          <article className="experience-item">
            <div className="experience-header"><h4>Auraverse</h4><span>Actualidad</span></div>
            <p>Desarrollo de plataforma social por encargo de un cliente</p>
          </article>
          <article className="experience-item">
            <div className="experience-header"><h4>Rappi</h4><span>6 meses · Prácticas</span></div>
            <p>Analista QA · Pruebas manuales y uso de Jira</p>
          </article>
          <article className="experience-item">
            <div className="experience-header"><h4>Alcaldía de Armenia</h4><span>6 meses</span></div>
            <p>Mesa de ayuda y control de aplicativos institucionales · Armenia, Quindío</p>
          </article>
        </div><a className="pill outline" href={cv} download="CV_Juan_Camilo.pdf">Descargar mi CV <DownArrow /></a><div className="about-details"><span>MI ENFOQUE</span><p>Lógica y datos bien conectados.<br/>Calidad en cada detalle.<br/>Aprendizaje constante.</p></div></div></section>
      <section className="contact section-wrap" id="contact"><div className="contact-top eyebrow"><span>03 / EL SIGUIENTE PASO</span><span>¿TIENES ALGO EN MENTE?</span></div><a className="contact-title" href="mailto:camilo9171@gmail.com" aria-label="Escribir a Juan Camilo por correo"><h2>Hagamos<br/>algo <RotatingContactWord /></h2><span className="contact-arrow"><Arrow /></span></a><div className="contact-bottom"><p>Una idea, un proyecto o una oportunidad.<br/>Me encantará saber de ti.</p><div className="contact-options">
          <a className="contact-whatsapp" href="https://wa.me/573117863431" target="_blank" rel="noreferrer">Hablemos por WhatsApp <Arrow /></a>
          <a className="contact-email" href="mailto:camilo9171@gmail.com">camilo9171@gmail.com <Arrow /></a>
        </div></div></section>
    </main>
    <footer className="footer"><Brand /><p>DISEÑADO Y DESARROLLADO POR JUAN CAMILO.</p><div><a href="https://github.com/Juan-camilo-GM" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/juan-camilo-gonz%C3%A1lez-mu%C3%B1oz-a0855924b/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://wa.me/573117863431" target="_blank" rel="noreferrer">WhatsApp <Arrow /></a></div></footer>
  </>;
}
