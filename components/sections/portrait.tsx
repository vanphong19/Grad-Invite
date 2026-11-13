"use client";

import Image from "next/image";
import { useState } from "react";
import { initials, invitation } from "@/config/invitation";

export function Portrait() {
  const [hasError, setHasError] = useState(false);

  if (!invitation.portraitImagePath || hasError) {
    return (
      <div className="portrait-fallback" role="img" aria-label={`Chân dung ${invitation.fullName}`}>
        <span>{initials}</span>
        <span className="portrait-fallback-label">A new chapter</span>
      </div>
    );
  }

  return (
    <Image
      src={invitation.portraitImagePath}
      alt={`Chân dung ${invitation.fullName}`}
      className="portrait-image"
      fill
      sizes="(max-width: 639px) 68vw, (max-width: 1023px) 38vw, 400px"
      onError={() => setHasError(true)}
    />
  );
}
