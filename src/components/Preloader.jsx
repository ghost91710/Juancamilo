import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Bloquear scroll
        document.body.style.overflow = 'hidden';

        // Animación de conteo
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 100); // Pausa mínima al final
                    return 100;
                }
                // Velocidad mucho más rápida
                const increment = Math.floor(Math.random() * 15) + 5;
                return Math.min(prev + increment, 100);
            });
        }, 20);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = 'auto'; // Restaurar scroll
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
                >
                    {/* Contador Gigante */}
                    <div className="relative">
                        <motion.div
                            className="text-[15vw] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-tr from-gray-800 to-gray-600 opacity-20 select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                            {count}
                        </motion.div>

                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <span className="text-4xl md:text-6xl font-mono text-yellow-400 font-bold">
                                {count}%
                            </span>
                            <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-yellow-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${count}%` }}
                                />
                            </div>
                            <span className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2">
                                Inicializando sistema
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
