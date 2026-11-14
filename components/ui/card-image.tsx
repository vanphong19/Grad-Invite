"use client";

import Image from "next/image";
import { useState } from "react";

type CardImageProps = {
  src: string;
  alt: string;
  sizes: string;
  eager?: boolean;
  fallback?: string;
};

export function CardImage({ src, alt, sizes, eager = false, fallback = "UIT · 2026" }: CardImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return <span className="image-fallback" role="img" aria-label={alt}>{fallback}</span>;
  }

  return <Image src={src} alt={alt} fill sizes={sizes} draggable={false} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} />;
}
