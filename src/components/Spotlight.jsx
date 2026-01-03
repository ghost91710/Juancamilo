import { useState, useEffect } from 'react';

export default function Spotlight() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-10 transition-all duration-300"
            style={{
                background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(251, 191, 36, 0.08), 
          transparent 80%
        )`,
            }}
        />
    );
}
