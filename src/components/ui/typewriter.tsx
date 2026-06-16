'use client';
import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export default function Typewriter({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="text-blue-600 dark:text-blue-400">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
