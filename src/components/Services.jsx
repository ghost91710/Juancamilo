const whatsappMessage = encodeURIComponent('Hola Juan Camilo, vi tu página de servicios. Tengo un proyecto en mente y me gustaría contarte un poco más.');
const whatsappUrl = `https://wa.me/573117863431?text=${whatsappMessage}`;

function Arrow() {
  return <svg className="icon-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Brand() {
  return <a className="wordmark" href="/" aria-label="Juan Camilo, ver portafolio">
    <svg className="brand-symbol" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <g className="brand-monogram" stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M9 10h23v33c0 8-5 12-13 12H9V45" />
        <path d="M55 20V10H44c-8 0-12 5-12 13v19c0 8 5 13 13 13h10V45" />
        <path className="brand-accent" d="M20 10v10M45 32h10" strokeWidth="2.5" />
      </g>
    </svg>
    <span className="brand-name">camilo<span className="brand-role">DESARROLLADOR</span></span>
  </a>;
}

const services = [
  {
    number: '01',
    title: 'Producto digital o MVP',
    text: 'Para una idea que ya necesita convertirse en una primera versión usable: cuentas, datos, flujos y una interfaz clara.',
  },
  {
    number: '02',
    title: 'Sistema interno',
    text: 'Paneles y aplicaciones para ordenar información, procesos y equipos cuando las hojas de cálculo ya se quedan cortas.',
  },
  {
    number: '03',
    title: 'Web con lógica propia',
    text: 'Sitios y experiencias web que necesitan más que una plantilla: integraciones, datos, áreas privadas o funcionalidades a medida.',
  },
];

const steps = [
  ['01', 'Entendemos el proyecto', 'Hablamos del objetivo, las personas que lo usarán, el alcance inicial y qué tendría que pasar para que valga la pena hacerlo.'],
  ['02', 'Aterrizamos una ruta', 'Antes de construir, definimos qué incluir, qué puede esperar y cómo se verá el recorrido principal.'],
  ['03', 'Construimos con visibilidad', 'El proyecto avanza por etapas revisables; no tienes que esperar hasta el final para verlo tomar forma.'],
  ['04', 'Entregamos algo sostenible', 'La entrega contempla el producto funcionando y una base técnica que se pueda mantener y seguir mejorando.'],
];

export default function Services() {
  return <div className="services-page">
    <a className="skip-link" href="#servicios">Saltar al contenido</a>
    <header className="navigation services-navigation">
      <Brand />
      <nav aria-label="Navegación principal">
        <a href="/">Portafolio</a>
        <a href="#proceso">Proceso</a>
        <a className="nav-contact" href={whatsappUrl} target="_blank" rel="noreferrer">Hablemos <Arrow /></a>
      </nav>
    </header>

    <main>
      <section className="services-hero" id="servicios">
        <div className="services-eyebrow eyebrow"><span>DESARROLLO A MEDIDA</span><span><i /> DISPONIBLE PARA CONVERSAR</span></div>
        <div className="services-hero-grid">
          <div>
            <h1>Cuando una<br />plantilla no alcanza<span>.</span></h1>
            <p className="services-lead">Diseño y desarrollo aplicaciones web, sistemas internos y productos digitales para proyectos que necesitan lógica, datos e interfaces bien conectadas.</p>
            <div className="services-actions">
              <a className="pill yellow" href={whatsappUrl} target="_blank" rel="noreferrer">Cuéntame tu proyecto <Arrow /></a>
              <a className="services-text-link" href="/#projects">Ver trabajo seleccionado <Arrow /></a>
            </div>
          </div>
          <aside className="services-note">
            <span className="eyebrow">UNA BUENA CONVERSACIÓN EMPIEZA ASÍ</span>
            <p>“Tenemos esta idea o este proceso, pero no sabemos cuál es la forma correcta de llevarlo a la web.”</p>
          </aside>
        </div>
      </section>

      <section className="services-section" aria-labelledby="encaje-title">
        <div className="services-section-intro">
          <p className="eyebrow">01 / DÓNDE PUEDO APORTAR</p>
          <h2 id="encaje-title">No se trata de hacer <em>software</em> porque sí.</h2>
          <p>Es una buena opción cuando ya hay una necesidad concreta, una idea con potencial o un proceso que merece una solución propia.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => <article className="service-card" key={service.number}>
            <span className="eyebrow">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>)}
        </div>
      </section>

      <section className="services-process" id="proceso">
        <div className="services-process-title"><p className="eyebrow">02 / FORMA DE TRABAJAR</p><h2>Menos <em>suposiciones.</em><br />Más claridad.</h2></div>
        <div className="services-steps">
          {steps.map(([number, title, text]) => <article key={number}>
            <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>
          </article>)}
        </div>
      </section>

      <section className="services-proof" aria-labelledby="proof-title">
        <p className="eyebrow">03 / UNA BASE PARA EMPEZAR</p>
        <div><h2 id="proof-title">Ya he convertido ideas en experiencias que se pueden <em>usar.</em></h2><p>En mi portafolio puedes explorar proyectos que reúnen interfaces, datos y lógica de negocio: una plataforma social, una aplicación de gestión y una herramienta de finanzas personales.</p><a className="services-text-link" href="/#projects">Explorar proyectos <Arrow /></a></div>
      </section>

      <section className="services-cta">
        <p className="eyebrow">¿TIENES ALGO EN MENTE?</p>
        <h2>Empecemos por<br />entenderlo <em>bien.</em></h2>
        <p>Cuéntame qué quieres construir, para quién y en qué punto estás. Si hay un buen encaje, definimos el siguiente paso.</p>
        <a className="services-cta-button" href={whatsappUrl} target="_blank" rel="noreferrer">Hablar por WhatsApp <Arrow /></a>
      </section>
    </main>

    <footer className="footer services-footer"><Brand /><p>DISEÑADO Y DESARROLLADO POR JUAN CAMILO.</p><div><a href="https://github.com/Juan-camilo-GM" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/juan-camilo-gonz%C3%A1lez-mu%C3%B1oz-a0855924b/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></footer>
  </div>;
}
