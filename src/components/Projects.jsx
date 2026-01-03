import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaPause,
  FaExpand,
  FaTimes,
  FaMobileAlt
} from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";

import video1 from "../assets/video1.1.mp4";
import video2 from "../assets/video2.1.mp4";

const projects = [
  {
    id: "01",
    title: "App Web Gestión de Tienda ",
    subtitle: "Gestión completa para minimercado",
    summary: "Aplicación web full-stack integral para la gestión eficiente de inventarios, proveedores y análisis de ventas en tiempo real. Incluye un catálogo público intuitivo que facilita las compras en línea y un módulo robusto para el registro preciso de ventas, todo envuelto en un diseño moderno, responsive y fácil de usar.",
    tech: ["React", "JavaScript", "Supabase", "Tailwind", "Nest.js"],
    demo: "https://minimercadodemo-cmdr.vercel.app/",
    code: "https://github.com",
    video: video1,
  },
  {
    id: "02",
    title: "App Web Gestión de Gastos",
    subtitle: "Gestión de gastos personal",
    summary: "Sistema para gestión de gastos personal con seguimiento financiero y análisis de datos.",
    tech: ["React", "JavaScript", "Supabase", "Tailwind",],
    demo: "https://appgastos-ten.vercel.app/",
    code: "https://github.com",
    video: video2,
  },
];

export default function Projects() {
  const containerRef = useRef();
  const titleRef = useRef();

  const { scrollYProgress: containerScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: titleScroll } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });

  // Transformaciones del encabezado
  const titleY = useTransform(titleScroll, [0, 1], [100, -100]);
  const titleOpacity = useTransform(titleScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const containerScale = useTransform(containerScroll, [0, 1], [1, 0.98]);

  // Transformaciones para fondo parallax
  const bgY1 = useTransform(containerScroll, [0, 1], [0, 100]);
  const bgY2 = useTransform(containerScroll, [0, 1], [0, -150]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="px-6 md:px-12 lg:px-24 py-12 md:py-32 relative overflow-hidden scroll-mt-8 md:scroll-mt-12"
    >
      {/* Fondo parallax mejorado */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: bgY1 }}
          className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-yellow-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          style={{ y: bgY2 }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"
        />
      </div>

      {/* Encabezado con parallax */}
      <motion.div
        ref={titleRef}
        style={{ opacity: titleOpacity, scale: containerScale }}
        className="max-w-7xl mx-auto mb-12 md:mb-24 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
          <span className="text-white">Proyectos</span>
          <br />
          <span className="text-yellow-400 font-normal">destacados</span>
        </h2>
      </motion.div>

      {/* Lista de proyectos */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="space-y-24 md:space-y-40">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------
// PROJECT CARD WITH 3D TILT EFFECT
// ---------------------------------------------
function ProjectCard({ project, index }) {
  const containerRef = useRef();
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transformaciones parallax
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Control del video - SIMPLIFICADO
  useEffect(() => {
    if (isMobile) return; // No autoplay en móvil

    const video = videoRef.current;
    if (!video) return;

    if (isHovered && !isPlaying) {
      const timeout = setTimeout(() => {
        video.play().then(() => setIsPlaying(true)).catch(console.log);
      }, 300);

      return () => clearTimeout(timeout);
    } else if (!isHovered && isPlaying) {
      if (!isFullscreen) {
        video.pause();
        setIsPlaying(false);
      }
    }
  }, [isHovered, isPlaying, isFullscreen, isMobile]);

  const togglePlay = async () => {
    if (isMobile) {
      setShowVideoModal(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Play/pause error:", error);
    }
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!document.fullscreenElement) {
        await video.requestFullscreen();
        setIsFullscreen(true);
        if (!isPlaying) {
          await video.play();
          setIsPlaying(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.log("Fullscreen error:", error);
    }
  };

  // Event listeners para fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Cerrar modal
  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (showVideoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showVideoModal]);

  return (
    <>
      <motion.div
        ref={containerRef}
        style={{ y, opacity, scale }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        className="relative group"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Número flotante parallax */}
        <div className="absolute -left-8 top-8 hidden lg:block">
          <div className="text-8xl font-bold text-gray-900/30">{project.id}</div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start relative">
          {/* Columna izquierda - Información */}
          <div className="lg:col-span-5 space-y-8 relative z-20">
            {/* Número y línea */}
            <div className="flex items-center gap-6">
              <div className="relative cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-yellow-400/50 transition-colors">
                  <span className="text-gray-500 font-mono group-hover:text-yellow-400 transition-colors">
                    {project.id}
                  </span>
                </div>
              </div>

              <div className="h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent" />
            </div>

            {/* Título y subtítulo */}
            <div>
              <h3 className="text-3xl md:text-4xl font-light mb-2 text-white group-hover:text-yellow-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-lg">
                {project.subtitle}
              </p>
            </div>

            {/* Descripción */}
            <p className="text-gray-400 leading-relaxed">
              {project.summary}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-900">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-900/50 rounded text-sm text-gray-400 border border-gray-800 hover:border-gray-700 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-8">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-yellow-400 hover:bg-yellow-400/10 transition-all group/btn"
              >
                <FaExternalLinkAlt className="w-4 h-4 text-gray-400 group-hover/btn:text-yellow-400 transition-colors" />
                <span className="text-white group-hover/btn:text-yellow-400 transition-colors">Ver demo</span>
              </a>

              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-800 transition-all group/btn"
              >
                <FaGithub className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />
                <span className="text-gray-400 group-hover/btn:text-white transition-colors">Código</span>
              </a>
            </div>
          </div>

          {/* Columna derecha - Video */}
          <div className="lg:col-span-7 relative z-10 lg:pl-8">
            <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video shadow-2xl border border-white/5 group-hover:border-yellow-400/20 transition-all duration-500 transform group-hover:scale-[1.02]">

              <video
                ref={videoRef}
                src={project.video}
                poster="/api/placeholder/800/450"
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                onClick={togglePlay}
                onDoubleClick={toggleFullscreen}
              />

              {/* Overlay de controles en Desktop */}
              <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered && !isPlaying && !isMobile ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <FaPlay className="text-white ml-1 w-6 h-6" />
                </div>
              </div>

              {/* Overlay móvil para indicar toque */}
              {isMobile && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <div className="bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2">
                    <FaMobileAlt className="text-yellow-400 animate-pulse" />
                    <span className="text-xs text-white uppercase tracking-wider">Toca para ver</span>
                  </div>
                </div>
              )}

              {/* Overlay Desktop para indicar Hover (NUEVO) */}
              {!isMobile && !isHovered && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none transition-opacity duration-300">
                  <div className="bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/5 flex items-center gap-3">
                    <FaPlay className="text-yellow-400 w-3 h-3" />
                    <span className="text-xs text-gray-200 uppercase tracking-widest font-medium">Vista Previa</span>
                  </div>
                </div>
              )}

              {/* Controles simples Desktop */}
              {!isMobile && (
                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <button
                    onClick={togglePlay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    aria-label="Pantalla completa"
                  >
                    <FaExpand />
                  </button>
                </div>
              )}
            </div>

            {/* Decoración extra - Sombra moderna */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-t from-yellow-400/10 to-transparent rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </motion.div>

      {/* Modal móvil */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={closeVideoModal} // Cerrar al tocar fondo
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
              onClick={(e) => e.stopPropagation()} // Prevenir cierre al tocar video
            >
              <div className="relative aspect-video">
                <video
                  src={project.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              <div className="p-6 bg-gray-900 border-t border-white/5">
                <h3 className="text-xl text-white font-medium mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{project.subtitle}</p>

                <div className="flex gap-3">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-yellow-400 text-black text-center rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                    Ver Demo
                  </a>
                  <button onClick={closeVideoModal} className="flex-1 py-3 bg-gray-800 text-white text-center rounded-lg font-medium hover:bg-gray-700 transition-colors">
                    Cerrar
                  </button>
                </div>
              </div>

              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors"
              >
                <FaTimes />
              </button>
            </motion.div>

            <p className="mt-8 text-gray-500 text-sm animate-pulse">Toca fuera para cerrar</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}