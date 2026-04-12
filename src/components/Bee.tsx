"use client";

import { motion } from "framer-motion";

export default function Bee({ className = "w-16 h-16", delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay }}
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-xl"
      >
        {/* Arka Kanat */}
        <motion.ellipse 
          cx="45" cy="25" rx="18" ry="10" fill="#ffffff" opacity="0.7" 
          animate={{ rotate: [-15, 30, -15], transformOrigin: "45px 35px" }}
          transition={{ repeat: Infinity, duration: 0.08 }}
        />
        
        {/* Gövde */}
        <rect x="25" y="35" width="50" height="34" rx="17" fill="#FACC15" /> {/* Sarı/Altın rengi */}
        
        {/* Siyah Çizgiler */}
        <rect x="35" y="35" width="8" height="34" fill="#000000" />
        <rect x="53" y="35" width="8" height="34" fill="#000000" />
        
        {/* İğne (Stinger) */}
        <polygon points="25,48 5,52 25,56" fill="#000000" strokeLinejoin="round" />
        
        {/* Kafa */}
        <circle cx="75" cy="52" r="16" fill="#FACC15" />
        
        {/* Göz */}
        <circle cx="83" cy="47" r="3" fill="#000000" />
        
        {/* Gülümseme */}
        <path d="M 78 57 Q 82 61 86 55" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Anten */}
        <path d="M 73 40 Q 70 28 75 22" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="76" cy="21" r="2.5" fill="#000000" />
        
        {/* Ön Kanat */}
        <motion.ellipse 
          cx="55" cy="30" rx="20" ry="12" fill="#E2E8F0" opacity="0.9" 
          animate={{ rotate: [15, -30, 15], transformOrigin: "55px 42px" }}
          transition={{ repeat: Infinity, duration: 0.08 }}
        />
      </motion.svg>
    </motion.div>
  );
}
