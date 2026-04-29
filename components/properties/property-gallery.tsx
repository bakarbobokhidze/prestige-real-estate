"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images = [], title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const validImages = images.filter((img) => img && img.trim() !== "");

  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl bg-muted flex flex-col items-center justify-center border-2 border-dashed border-border text-muted-foreground gap-3">
        <div className="p-4 rounded-full bg-background shadow-sm">
          <ImageIcon className="h-10 w-10 opacity-20" />
        </div>
        <p className="font-medium">სურათები არ არის დამატებული</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length,
    );
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden shadow-md">
        {/* Main Image */}
        <div
          className="md:col-span-2 relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted"
          onClick={() => {
            setCurrentIndex(0);
            setIsLightboxOpen(true);
          }}
        >
          <Image
            src={validImages[0]}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>

        {/* Side Images */}
        <div className="hidden md:grid grid-rows-2 gap-3">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted"
              onClick={() => {
                if (validImages[idx]) {
                  setCurrentIndex(idx);
                  setIsLightboxOpen(true);
                }
              }}
            >
              {validImages[idx] ? (
                <>
                  <Image
                    src={validImages[idx]}
                    alt={`${title} - Image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="33vw"
                  />
                  {idx === 2 && validImages.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white text-xl font-bold tracking-tight">
                        +{validImages.length - 3}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 opacity-10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-300">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full h-12 w-12"
          >
            <X className="h-8 w-8" />
          </Button>

          {/* Navigation */}
          {validImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-6 text-white hover:bg-white/10 rounded-full h-14 w-14"
              >
                <ChevronLeft className="h-10 w-10" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-6 text-white hover:bg-white/10 rounded-full h-14 w-14"
              >
                <ChevronRight className="h-10 w-10" />
              </Button>
            </>
          )}

          {/* Image */}
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-4 select-none">
            <Image
              src={validImages[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium tracking-widest border border-white/10">
            {currentIndex + 1} / {validImages.length}
          </div>
        </div>
      )}
    </>
  );
}
