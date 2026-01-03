import { motion } from "framer-motion";
import {
    FaReact, FaNodeJs, FaJs, FaGitAlt, FaHtml5, FaCss3Alt, FaFigma
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiFramer } from "react-icons/si";

const skills = [
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-teal-400" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
    { name: "Framer Motion", icon: SiFramer, color: "text-purple-400" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
    { name: "Figma", icon: FaFigma, color: "text-pink-400" },
];

export default function SkillsMarquee() {
    return (
        <section className="py-10 md:py-16 -mt-0 md:-mt-12 mb-20 md:mb-24 overflow-hidden relative z-20">

            {/* Gradient Masks for fade effect at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-black via-black/80 to-transparent" />

            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex gap-8 md:gap-16 pr-8 md:pr-16 whitespace-nowrap"
                >
                    {/* Duplicamos la lista varias veces para asegurar el loop infinito sin cortes */}
                    {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-3 group cursor-default">
                            <skill.icon className={`text-2xl md:text-3xl ${skill.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`} />
                            <span className="text-lg md:text-xl font-mono text-gray-500 group-hover:text-white transition-colors duration-300">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
