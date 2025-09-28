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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(135deg, hsl(222.2, 84%, 4.9%) 0%, hsl(222.2, 84%, 4.9%) 30%, transparent 70%, hsl(222.2, 84%, 4.9%) 100%), url('${animatedBg}')`,
    backgroundSize: 'cover, cover',
    backgroundPosition: `center ${scrollY * 0.5}px, center`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundAttachment: 'scroll, fixed',
  };

  return (
    <div 
      className={`relative min-h-screen animate-bg-float ${className}`}
      style={backgroundStyle}
    >
      <div className="absolute inset-0 opacity-40 bg-gradient-secondary animate-bg-pulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};