import React from 'react';
import { motion } from 'framer-motion';
import animatedBg from '@/assets/animated-bg.jpg';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedBackground = ({ children, className = "" }: AnimatedBackgroundProps) => {
  return (
    <div 
      className={`relative min-h-screen overflow-hidden ${className}`}
    >
      {/* Parallax background image */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: `url('${animatedBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/90 backdrop-blur-[2px]" />
      
      {/* Animated floating orbs */}
      <motion.div
        className="fixed top-20 left-10 w-72 h-72 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, hsla(244, 71%, 58%, 0.15) 0%, transparent 70%)' }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-96 h-96 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, hsla(270, 80%, 65%, 0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 w-64 h-64 rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, hsla(285, 85%, 70%, 0.1) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, -30, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
