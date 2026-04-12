"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Bee from "./Bee";

export default function WanderingBee() {
  const [mount, setMount] = useState(false);
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Hydration hatasını önlemek için (window objesi) sadece client-side'da aktif et.
    setMount(true);
    
    // İlk başlangıç noktasını rastgele belirle
    const startX = Math.random() * (window.innerWidth - 100);
    const startY = Math.random() * (window.innerHeight - 100);
    setPositions({ x: startX, y: startY });

    const interval = setInterval(() => {
      // Ekranın sınırları dahilinde rastgele yeni X ve Y koordinatları üret
      const nextX = Math.random() * (window.innerWidth - 100);
      const nextY = Math.random() * (window.innerHeight - 100);
      
      setPositions(prev => {
        // Yeni kordinat sağda ise normal dur (0 derece), solda ise arı yüzünü sola dönsün (180 derece)
        const isMovingRight = nextX > prev.x;
        setRotation(isMovingRight ? 0 : 180);
        return { x: nextX, y: nextY };
      });
    }, 4500); // 4.5 saniyede bir yeni uçuş noktasına karar verir

    return () => clearInterval(interval);
  }, []);

  if (!mount) return null;

  return (
    <motion.div
      className="fixed z-[100] pointer-events-none"
      animate={{ x: positions.x, y: positions.y }}
      transition={{ type: "tween", ease: "easeInOut", duration: 4.5 }}
      style={{ top: 0, left: 0 }}
    >
      <motion.div 
        animate={{ rotateY: rotation }} 
        transition={{ duration: 0.5 }}
      >
        <Bee className="w-16 h-16 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" />
      </motion.div>
    </motion.div>
  );
}
