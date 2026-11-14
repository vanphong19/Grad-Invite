"use client";

import { animate, MotionConfig, motion, useMotionValue, useTransform } from "motion/react";
import { Hand } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import { CoverSection } from "@/components/sections/cover";
import { InvitationSection } from "@/components/sections/invitation";
import { invitation } from "@/config/invitation";

const query = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const PAPER_PERSPECTIVE = 6000;

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

type PaperGesture = {
  id: number;
  x: number;
  y: number;
  startProgress: number;
  wasOpen: boolean;
  travel: number;
  dragging: boolean;
  lastX: number;
  lastTime: number;
  velocity: number;
  capture: HTMLElement;
};

export function InvitationExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const phase = useRef<"idle" | "dragging" | "settling">("idle");
  const gesture = useRef<PaperGesture | null>(null);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const skipClick = useRef(false);
  const cancelledPointer = useRef<number | null>(null);
  const clickFrame = useRef<number | null>(null);
  const reduced = useSyncExternalStore(subscribe, getReducedMotion, serverSnapshot);
  const progress = useMotionValue(0);
  // A full half-turn in a fixed portrait frame: the information page stays
  // in place underneath the cover, with no desktop spread or layout resize.
  const rotation = useTransform(progress, value => -180 * clamp(value));
  const shade = useTransform(progress, value => reduced ? 0 : Math.sin(clamp(value) * Math.PI) * .3);
  const crease = useTransform(progress, [0, .5, 1], [0, .35, .12]);

  const settle = useCallback((open: boolean, fromGesture = false, releaseVelocity = 0) => {
    if (phase.current === "settling" || (phase.current === "dragging" && !fromGesture)) return;
    const target = open ? 1 : 0;
    if (open === isOpen && Math.abs(progress.get() - target) < .001) {
      phase.current = "idle";
      setBusy(false);
      setDragging(false);
      return;
    }
    const moveFocus = open !== isOpen && (fromGesture || Boolean(card.current?.contains(document.activeElement)));
    phase.current = "settling";
    setBusy(true);
    setDragging(false);
    if (open && !isOpen) card.current?.querySelector<HTMLElement>("#invitation-content")?.scrollTo({ top: 0, behavior: "instant" });
    setIsOpen(open);
    animation.current?.stop();
    animation.current = animate(progress, target, {
      ...(reduced
        ? { duration: .08, ease: "linear" as const }
        : { type: "spring" as const, stiffness: 100, damping: 22, mass: 1, velocity: Math.max(-1.8, Math.min(1.8, releaseVelocity)), restDelta: .0005, restSpeed: .008 }),
      onComplete: () => {
        phase.current = "idle";
        animation.current = null;
        setBusy(false);
        if (moveFocus) card.current?.querySelector<HTMLElement>(open ? "#invitation-content" : ".paper-grip-open")?.focus({ preventScroll: true });
      },
    });
  }, [isOpen, progress, reduced]);

  const cancelGesture = useCallback(() => {
    const active = gesture.current;
    gesture.current = null;
    if (!active) return;
    cancelledPointer.current = active.id;
    if (active.capture.hasPointerCapture(active.id)) active.capture.releasePointerCapture(active.id);
    if (active.dragging) settle(active.wasOpen, true);
  }, [settle]);

  useEffect(() => {
    return () => {
      animation.current?.stop();
      gesture.current = null;
      if (clickFrame.current !== null) cancelAnimationFrame(clickFrame.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if ((event.target as HTMLElement)?.closest("input,textarea,select,[contenteditable='true']")) return;
      if (["Tab", "Enter", " ", "ArrowRight", "ArrowLeft", "Escape"].includes(event.key)) setKeyboardNavigation(true);
      if (event.key === "Escape" && gesture.current) { event.preventDefault(); cancelGesture(); return; }
      if (event.key === "ArrowRight") { event.preventDefault(); settle(true); }
      if (event.key === "ArrowLeft" || event.key === "Escape") { event.preventDefault(); settle(false); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("blur", cancelGesture);
    window.addEventListener("resize", cancelGesture);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("blur", cancelGesture); window.removeEventListener("resize", cancelGesture); };
  }, [cancelGesture, settle]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) { cancelGesture(); return; }
    if (event.button !== 0 || phase.current !== "idle") return;
    setKeyboardNavigation(false);
    cancelledPointer.current = null;
    const target = event.target as HTMLElement;
    if (!target.closest(".cover-front,.cover-back,.inside-sheet")) return;
    const grip = target.closest<HTMLElement>(".paper-grip");
    if (target.closest("a,button") && !grip) return;
    if (isOpen && event.pointerType === "mouse" && !grip) return;
    const capture = grip ?? event.currentTarget;
    gesture.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      startProgress: progress.get(), wasOpen: isOpen,
      travel: Math.max(160, event.currentTarget.offsetWidth),
      dragging: false, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0, capture,
    };
    capture.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || event.pointerId !== active.id) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (!active.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 5) return;
      if (Math.abs(dy) > Math.abs(dx) * 1.2) { cancelGesture(); return; }
      active.dragging = true;
      phase.current = "dragging";
      setDragging(true);
      setBusy(true);
    }
    event.preventDefault();
    const elapsed = event.timeStamp - active.lastTime;
    if (elapsed > 0) active.velocity = active.velocity * .6 + (event.clientX - active.lastX) / elapsed * .4;
    active.lastX = event.clientX;
    active.lastTime = event.timeStamp;
    progress.set(clamp(active.startProgress - dx / active.travel));
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (cancelledPointer.current === event.pointerId) {
      cancelledPointer.current = null;
      event.preventDefault();
      skipClick.current = true;
      clickFrame.current = requestAnimationFrame(() => { skipClick.current = false; clickFrame.current = null; });
      return;
    }
    const active = gesture.current;
    if (!active || event.pointerId !== active.id) return;
    gesture.current = null;
    if (!active.dragging) return;
    event.preventDefault();
    skipClick.current = true;
    clickFrame.current = requestAnimationFrame(() => { skipClick.current = false; clickFrame.current = null; });
    const dx = event.clientX - active.x;
    const velocity = event.timeStamp - active.lastTime < 100 ? active.velocity : 0;
    const next = active.wasOpen
      ? !(progress.get() <= .72 || (dx > 28 && velocity > .55))
      : progress.get() >= .28 || (dx < -28 && velocity < -.55);
    settle(next, true, -velocity * 1000 / active.travel);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="invitation-stage" aria-label={`Thiệp mời tốt nghiệp ${invitation.fullName}`}>
        <div className="invitation-frame">
        <motion.div
          ref={card}
          className={`greeting-card ${isOpen ? "is-open" : "is-closed"} ${dragging ? "is-dragging" : ""} ${keyboardNavigation ? "keyboard-navigation" : ""} ${reduced ? "reduced-motion" : ""}`}
          style={{ perspective: `${PAPER_PERSPECTIVE}px` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={event => { if (gesture.current?.id === event.pointerId) cancelGesture(); }}
          onLostPointerCapture={event => { if (gesture.current?.id === event.pointerId) cancelGesture(); }}
          onClickCapture={event => { if (skipClick.current) { event.preventDefault(); event.stopPropagation(); skipClick.current = false; } }}
        >
          <div className="inside-sheet" aria-hidden={!isOpen} inert={!isOpen}>
            <InvitationSection />
            <button className="paper-grip paper-grip-close" type="button" onClick={() => settle(false)} aria-label="Gấp thiệp về bìa" aria-controls="invitation-cover" aria-disabled={busy || undefined}>
              <span className="grip-fold" aria-hidden="true"><Hand size={17} strokeWidth={1.3} /></span>
            </button>
          </div>
          <motion.div className="cover-sheet" initial={false} style={{ rotateY: reduced ? (isOpen ? -180 : 0) : rotation }}>
            <div id="invitation-cover" className="cover-front" aria-hidden={isOpen} inert={isOpen}>
              <CoverSection />
              <motion.div className="paper-turn-shade" style={{ opacity: shade }} aria-hidden="true" />
              <button className="paper-grip paper-grip-open" type="button" onClick={() => settle(true)} aria-label="Mở thiệp mời" aria-expanded={isOpen} aria-controls="invitation-content" aria-disabled={busy || undefined}>
                <span className="grip-fold" aria-hidden="true"><Hand size={17} strokeWidth={1.3} /></span>
              </button>
            </div>
            <div className="cover-back" aria-hidden="true" />
          </motion.div>
          <motion.div className="book-crease" style={{ opacity: reduced ? 0 : crease }} aria-hidden="true" />
        </motion.div>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Trang {isOpen ? "2" : "1"} trên 2. {isOpen ? "Nội dung thiệp mời." : "Bìa thiệp."}</p>
      </main>
    </MotionConfig>
  );
}

