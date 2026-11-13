"use client";

import { MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type TouchEvent } from "react";
import { CoverSection } from "@/components/sections/cover";
import { InvitationSection } from "@/components/sections/invitation";
import { invitation } from "@/config/invitation";

const query = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function InvitationExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; time: number } | null>(null);
  const reduced = useSyncExternalStore(subscribe, getReducedMotion, serverSnapshot);

  const turnCard = useCallback((open: boolean) => {
    if (locked.current || open === isOpen) return;
    locked.current = true;
    setBusy(true);
    const moveFocus = Boolean(card.current?.contains(document.activeElement));
    if (open) card.current?.querySelector<HTMLElement>("#invitation-content")?.scrollTo({ top: 0, behavior: "instant" });
    setIsOpen(open);
    timer.current = setTimeout(() => {
      locked.current = false;
      setBusy(false);
      if (moveFocus) {
        card.current?.querySelector<HTMLElement>(open ? "#invitation-content" : ".open-invitation")?.focus({ preventScroll: true });
      }
    }, reduced ? 100 : 860);
  }, [isOpen, reduced]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if ((event.target as HTMLElement)?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); turnCard(true); }
      if (event.key === "ArrowLeft" || event.key === "Escape") { event.preventDefault(); turnCard(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turnCard]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1 || (event.target as HTMLElement).closest("a,button")) { touch.current = null; return; }
    touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, time: Date.now() };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current;
    touch.current = null;
    if (!start || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - start.time < 900) turnCard(dx < 0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="invitation-stage" aria-label={`Thiệp mời tốt nghiệp ${invitation.fullName}`}>
        <div ref={card} className={`greeting-card ${isOpen ? "is-open" : "is-closed"}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={() => { touch.current = null; }}>
          <div className="inside-sheet" aria-hidden={!isOpen} inert={!isOpen}>
            <InvitationSection onClose={() => turnCard(false)} busy={busy} />
          </div>
          <motion.div
            className="cover-sheet"
            initial={false}
            animate={{ rotateY: isOpen ? -165 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{
              rotateY: { duration: reduced ? 0 : .78, ease: [.65, 0, .2, 1] },
              opacity: { duration: reduced ? 0 : .14, delay: isOpen && !reduced ? .62 : 0 },
            }}
          >
            <div className="cover-front" aria-hidden={isOpen} inert={isOpen}>
              <CoverSection onNext={() => turnCard(true)} busy={busy} />
            </div>
            <div className="cover-reverse" aria-hidden="true" />
          </motion.div>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Trang {isOpen ? "2" : "1"} trên 2. {isOpen ? "Nội dung thiệp mời." : "Bìa thiệp."}</p>
      </main>
    </MotionConfig>
  );
}

