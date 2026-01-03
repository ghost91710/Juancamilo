import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Posición del mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        // Solo mostrar en dispositivos con puntero fino (mouse)
        const checkPointer = () => {
            if (window.matchMedia('(pointer: fine)').matches) {
                setIsVisible(true);
            }
        };
        checkPointer();

        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const tagName = e.target.tagName.toLowerCase();
            // Detectar elementos interactivos
            if (
                tagName === 'button' ||
                tagName === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(e.target).cursor === 'pointer'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-yellow-400 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: 1
            }}
            transition={{ duration: 0.2 }}
        />
    );
}
