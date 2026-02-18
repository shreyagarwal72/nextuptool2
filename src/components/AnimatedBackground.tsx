import React, { useEffect, useState } from 'react';
import animatedBg from '@/assets/animated-bg.jpg';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedBackground = ({ children, className = "" }: AnimatedBackgroundProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${className}`}>
      {/* Parallax background image */}
      <div
        className="fixed inset-0 -z-10 animate-bg-float"
        style={{
          backgroundImage: `url('${animatedBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${scrollY * 0.25}px`,
          backgroundRepeat: 'no-repeat',
          transform: `scale(1.05)`,
          willChange: 'transform',
        }}
      />
      {/* M3 surface overlay – light mode: soft white wash; dark: deep navy */}
      <div className="fixed inset-0 -z-10 bg-gradient-surface opacity-80 dark:opacity-90" />
      {/* Subtle tonal mesh */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 20% 20%, hsl(var(--primary-container)) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(var(--secondary-container)) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 50% 50%, hsl(var(--tertiary-container)) 0%, transparent 65%)
          `,
        }}
      />
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};
