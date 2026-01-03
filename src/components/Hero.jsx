import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";

export default function Hero() {
  const { scrollY } = useScroll();
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax Values - Deep Space Effect
  const yBackground = useTransform(scrollY, [0, 1000], [0, 400]); // Background moves slower
  const yTitle = useTransform(scrollY, [0, 500], [0, -150]); // Title moves faster up
  const ySubtitle = useTransform(scrollY, [0, 500], [0, -100]); // Subtitle follows
  const yVisual = useTransform(scrollY, [0, 500], [0, 50]); // Tech Core moves slightly down

  // Opacity fade out on scroll
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  /*
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  */

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center px-8 md:px-20 relative overflow-hidden bg-black"
    >
      {/* Fondo Parallax - Capa Profunda */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 bg-black z-0"
      >

        {/* Efecto de luz del cursor (ELIMINADO - Ahora es Global) */}
        {/*
        <div
          className="pointer-events-none fixed inset-0 z-20 transition-all duration-500"
          style={{
            background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(251, 191, 36, 0.08), 
              transparent 70%
            )`,
          }}
        />
        */}

        {/* Elementos geométricos sutiles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Líneas de grid muy sutiles */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent 49%, rgba(251, 191, 36, 0.1) 50%, transparent 51%)`,
                backgroundSize: '80px 80px'
              }}
            />
          </div>

          {/* Formas flotantes sutiles con movimiento independiente */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                top: `${10 + i * 30}%`,
                left: `${20 + i * 30}%`,
                background: `radial-gradient(circle, rgba(251, 191, 36, 0.02) 0%, transparent 70%)`
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>



      {/* TECH CORE VISUAL - Derecha */}
      <motion.div
        style={{ y: yVisual, opacity: opacityHero }}
        className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-10 hidden lg:block pointer-events-none"
      >
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">

          {/* Anillo Exterior - Lento */}
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-500/10 border-dashed"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-amber-300/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Anillo de Partículas Orbitando */}
          <motion.div
            className="absolute w-[400px] h-[400px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-amber-400/50 rounded-full blur-[1px] shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-amber-600/50 rounded-full blur-[1px]" />
          </motion.div>

          {/* Anillo Medio - Giroscopio 1 */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border border-amber-400/20"
            style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
            animate={{ rotate: 360, rotateX: 45, rotateY: 30 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Anillo Interno - Giroscopio 2 */}
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full border-2 border-amber-300/30"
            style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
            animate={{ rotate: -360, rotateX: -30, rotateY: 45 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* NÚCLEO CENTRAL */}
          <motion.div
            className="relative w-24 h-24 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full backdrop-blur-md border border-amber-400/50 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.2)]"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 50px rgba(251,191,36,0.2)",
                "0 0 80px rgba(251,191,36,0.4)",
                "0 0 50px rgba(251,191,36,0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaCode className="text-4xl text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          </motion.div>

        </div>
      </motion.div>

      {/* Contenido Foreground - Capa Frontal */}
      <div className="max-w-6xl relative z-10 w-full">
        <motion.div style={{ y: yTitle }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[clamp(3.5rem,9vw,8rem)] font-black leading-[1.1] tracking-tighter"
          >
            <span className="text-white block">JUAN CAMILO</span>
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent block mt-2">
              GONZÁLEZ MUÑOZ
            </span>
          </motion.h1>
        </motion.div>

        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 h-px w-40 bg-gradient-to-r from-yellow-400/50 to-transparent origin-left"
        />

        {/* Descripción */}
        <motion.p
          style={{ y: ySubtitle }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 max-w-xl text-gray-400 text-xl font-light tracking-wide"
        >
          Análisis y Desarrollo de Software
        </motion.p>

        {/* Botón CTA minimalista */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="group inline-flex items-center gap-3 mt-12 cursor-pointer"
        >
          <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase group-hover:text-white transition-colors duration-300">
            Ver Proyectos
          </span>
          <span className="w-8 h-px bg-yellow-400 group-hover:w-16 transition-all duration-300 bg-gradient-to-r from-yellow-400 to-transparent"></span>
        </motion.a>
      </div>
    </section>
  );
}