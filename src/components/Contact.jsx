import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
  FaBuilding,
  FaPaperPlane,
  FaDownload
} from "react-icons/fa";

import cv from "../assets/cv-JuanCamiloGonzalez.pdf";

export default function Contact() {
  const containerRef = useRef();
  const [hoveredCard, setHoveredCard] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "camilo9171" + String.fromCharCode(64) + "gmail.com";
    const subject = "Oportunidad laboral - Portafolio Juan Camilo";
    const body = "Hola Juan Camilo,\n\nVi tu portafolio y me interesa hablar contigo sobre una oportunidad laboral.\n\nSaludos,";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const message = "Hola Juan Camilo, vi tu portafolio y me gustaría hablar contigo sobre una oportunidad laboral.";
    const phone = "573117863431";
    if (window.confirm("¿Quieres abrir WhatsApp para hablar sobre oportunidades laborales?")) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const contactOptions = [
    {
      id: 1,
      label: "Empresas",
      description: "Propuestas formales de contratación",
      icon: <FaBuilding />,
      items: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/juan-camilo-gonz%C3%A1lez-mu%C3%B1oz-a0855924b/",
          icon: <FaLinkedin />,
          description: "Ver perfil profesional",
          actionLabel: "Conectar"
        },
        {
          label: "Correo Electrónico",
          action: handleEmailClick,
          icon: <FaEnvelope />,
          description: "Enviar oferta formal",
          actionLabel: "Escribir"
        }
      ],
      color: "from-blue-500/10 to-blue-600/5",
      borderColor: "group-hover:border-blue-500/30",
      glow: "group-hover:from-blue-500/10 group-hover:to-blue-600/5"
    },
    {
      id: 2,
      label: "Proyectos / Freelance",
      description: "Colaboraciones y desarrollo",
      icon: <FaBriefcase />,
      items: [
        {
          label: "GitHub",
          href: "https://github.com/Juan-camilo-GM",
          icon: <FaGithub />,
          description: "Explorar repositorios",
          actionLabel: "Ver código"
        },
        {
          label: "WhatsApp",
          action: handleWhatsAppClick,
          icon: <FaWhatsapp />,
          description: "Chat directo y rápido",
          actionLabel: "Chatear"
        }
      ],
      color: "from-purple-500/10 to-purple-600/5",
      borderColor: "group-hover:border-purple-500/30",
      glow: "group-hover:from-purple-500/10 group-hover:to-purple-600/5"
    }
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="px-6 md:px-12 lg:px-24 py-24 md:py-40 relative overflow-hidden bg-black"
    >
      {/* Elementos de fondo sutiles - Menos intensos que antes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900/20 via-black to-black"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Encabezado ORIGINAL Restaurado */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">
              Conexión Profesional
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            ¿Trabajamos <span className="text-yellow-400">juntos?</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Estoy disponible tanto para <span className="text-white font-medium">oportunidades laborales</span> como para
            <span className="text-white font-medium"> proyectos freelance</span>.
          </p>

        </div>

        {/* Grid de opciones - Estilo con GLOW moderno */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {contactOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: option.id * 0.1 }}
              className={`relative group bg-gray-900/20 border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-white/10 overflow-hidden`}
            >
              {/* Glow Effect Moderno pero sutil */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />

              <div className="relative z-10">
                {/* Header de la opción */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-yellow-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {option.label}
                    </h3>
                    <p className="text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Items dentro de la opción */}
                <div className="space-y-4">
                  {option.items.map((item, index) => {
                    const Element = item.href ? 'a' : 'button';
                    const props = item.href
                      ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                      : { onClick: item.action, type: "button" };

                    return (
                      <Element
                        key={index}
                        {...props}
                        className="w-full group/item flex items-center gap-4 p-5 bg-black/40 hover:bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 text-left cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-yellow-400 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white mb-0.5">{item.label}</div>
                          <div className="text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors">{item.description}</div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 group-hover/item:text-yellow-400 transition-colors opacity-0 group-hover/item:opacity-100 translate-x-[-10px] group-hover/item:translate-x-0 transform duration-300">
                          <span>{item.actionLabel}</span>
                          <FaArrowRight />
                        </div>
                      </Element>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTON DE DESCARGAR CV - Movido aquí */}
        <div className="flex justify-center mb-12">
          <a
            href={cv}
            download="CV_Juan_Camilo.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 group"
          >
            <FaDownload className="text-yellow-400 group-hover:text-white transition-colors" />
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Descargar CV</span>
          </a>
        </div>

        {/* Footer simple */}
        <div className="text-center pt-8 border-t border-white/5">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-400 font-medium tracking-wide">
                Disponible ahora para trabajar
              </span>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}