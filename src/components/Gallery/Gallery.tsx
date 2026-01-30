"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import mergeClasses from "../../../public/utils/mergeClasses";

type GalleryImageItem = {
  type: "image";
  src: string;
  label: string;
};

type GalleryVideoItem = {
  type: "video";
  vimeoId: string;
  thumbnail: string;
  label: string;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

type GalleryProps = {
  items: GalleryItem[];
  lightboxClassName?: string;
  gridClassName?: string;
};

const Gallery = ({ items, lightboxClassName, gridClassName }: GalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeItem = useMemo(() => {
    if (lightboxIndex === null) {
      return null;
    }
    return items[lightboxIndex] ?? null;
  }, [items, lightboxIndex]);

  useEffect(() => {
    if (items.length === 0) {
      setLightboxIndex(null);
    } else if (lightboxIndex !== null && lightboxIndex >= items.length) {
      setLightboxIndex(null);
    }
  }, [items.length, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null || items.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? prev : (prev + 1) % items.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? prev : (prev - 1 + items.length) % items.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, lightboxIndex]);

  return (
    <>
      <div className={mergeClasses("gallery-grid mt-8", gridClassName)}>
        {items.map((item, index) => {
          if (item.type === "video") {
            return (
              <button
                key={item.vimeoId}
                type="button"
                className="gallery-card gallery-card--video"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.label}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="gallery-image"
                />
                <span className="gallery-play">Play</span>
              </button>
            );
          }

          return (
            <button
              key={item.src}
              type="button"
              className="gallery-card"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="gallery-image"
              />
            </button>
          );
        })}
      </div>

      {activeItem && (
        <div
          className={mergeClasses("lightbox", lightboxClassName)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Close image preview"
            onClick={() => setLightboxIndex(null)}
          />
          <div className="lightbox-content">
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close image preview"
              onClick={() => setLightboxIndex(null)}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--prev"
              aria-label="Previous image"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? prev : (prev - 1 + items.length) % items.length,
                )
              }
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--next"
              aria-label="Next image"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? prev : (prev + 1) % items.length,
                )
              }
            >
              ›
            </button>
            <div className="lightbox-image">
              {activeItem.type === "video" ? (
                <iframe
                  title={activeItem.label}
                  src={`https://player.vimeo.com/video/${activeItem.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="lightbox-video"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={activeItem.src}
                  alt={activeItem.label}
                  fill
                  sizes="90vw"
                  className="lightbox-image-element"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
