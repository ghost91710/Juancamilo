import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-120px 0px -40% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="flex items-center justify-between px-6 md:px-20 py-6">
          {/* Nombre */}
          <a
            href="#inicio"
            onClick={closeMenu}
            className="font-mono text-sm text-yellow-400 hover:opacity-80 transition-opacity z-50 relative"
          >
            {"<Juan Camilo />"}
          </a>

          {/* Links Desktop */}
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-400">
            <NavLink
              label="Proyectos"
              href="#projects"
              active={activeSection === "projects"}
            />
            <NavLink
              label="Contacto"
              href="#contact"
              active={activeSection === "contact"}
            />
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white z-50 relative p-2"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <a
              href="#projects"
              onClick={closeMenu}
              className={`text-2xl font-light tracking-widest uppercase ${activeSection === "projects" ? "text-yellow-400" : "text-gray-400"
                }`}
            >
              Proyectos
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className={`text-2xl font-light tracking-widest uppercase ${activeSection === "contact" ? "text-yellow-400" : "text-gray-400"
                }`}
            >
              Contacto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ label, href, active }) {
  return (
    <a href={href} className="relative group">
      <span
        className={`transition-colors ${active ? "text-white" : "text-gray-400"
          } group-hover:text-white`}
      >
        {label}
      </span>

      <span
        className={`
          absolute left-0 -bottom-1 h-[1px] bg-yellow-400 transition-all duration-300
          ${active ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </a>
  );
}
