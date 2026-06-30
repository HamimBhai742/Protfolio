'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Active Main Image Screen */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/80 bg-gray-100 dark:bg-gray-950 group shadow-md">
        <Image
          src={images[activeIndex]}
          alt={`${title} Screenshot ${activeIndex + 1}`}
          fill
          className="object-contain"
          priority
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-900/85 dark:hover:bg-gray-900 text-gray-850 dark:text-gray-200 transition-all opacity-0 group-hover:opacity-100 shadow-md border border-gray-200/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-900/85 dark:hover:bg-gray-900 text-gray-850 dark:text-gray-200 transition-all opacity-0 group-hover:opacity-100 shadow-md border border-gray-200/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* View Fullscreen overlay */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold transition-all shadow-md"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span>View Fullscreen</span>
        </button>

        {/* Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-semibold backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Grid of thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {images.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden border bg-gray-50 dark:bg-gray-950 transition-all ${
                activeIndex === index
                  ? 'border-blue-600 ring-2 ring-blue-500/30 scale-102 shadow-md'
                  : 'border-gray-200/70 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-650 opacity-80 hover:opacity-100'
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${title} Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Fullscreen Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-850/80 hover:bg-gray-805 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Large image wrapper */}
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
            <Image
              src={images[activeIndex]}
              alt={`${title} Screenshot Fullscreen`}
              fill
              className="object-contain"
            />

            {/* Lightbox Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Caption */}
          <div className="mt-4 text-center text-white/90">
            <p className="text-sm font-semibold tracking-wide">{title}</p>
            <p className="text-xs text-white/50 mt-1">Image {activeIndex + 1} of {images.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
