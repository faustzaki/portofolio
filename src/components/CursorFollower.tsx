"use client";

import { useEffect, useRef } from "react";

// Custom cursor: white circle in `mix-blend-mode: difference` (inverts whatever
// sits underneath) that trails the pointer with a smooth delay and magnetically
// merges into interactive elements (buttons/links), then peels off on leave.
// Desktop + fine-pointer only; native cursor is hidden via globals.css.
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const BASE = 14; // resting diameter (px)
    const PAD = 22; // px the pill grows past a plain link/button box
    const POS_EASE = 0.16; // position lag -> the "delay" feel
    const SIZE_EASE = 0.22; // box merge speed

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let w = BASE;
    let h = BASE;
    let hovered: HTMLElement | null = null;
    let measured: HTMLElement | null = null;
    // Resting cursor is a circle; on merge it becomes a soft-cornered BOX that
    // hugs the element's own rectangle. Framed (sharp-bordered) elements also
    // get pad 0 so nothing bleeds past their outline; plain text links keep the
    // roomier PAD so the swell stays visible.
    let pad = PAD;
    let radius = "9999px";
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };

    // Snap target: nearest interactive ancestor, else null.
    const targetOf = (e: PointerEvent) =>
      (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor='magnet']",
      ) ?? null;

    const onOver = (e: PointerEvent) => {
      hovered = targetOf(e);
    };

    const onOut = (e: PointerEvent) => {
      const from = targetOf(e);
      if (from && from === hovered) hovered = null;
    };

    const onDown = () => (dot.style.opacity = "0.6");
    const onUp = () => (dot.style.opacity = "1");
    const onLeaveDoc = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Stick to the hovered element's box; otherwise rest at BASE.
      let tw = BASE;
      let th = BASE;
      let tx = mx;
      let ty = my;
      if (hovered?.isConnected) {
        if (measured !== hovered) {
          const s = getComputedStyle(hovered);
          const bw =
            parseFloat(s.borderTopWidth) +
            parseFloat(s.borderRightWidth) +
            parseFloat(s.borderBottomWidth) +
            parseFloat(s.borderLeftWidth);
          const sharp =
            bw >= 1 &&
            parseFloat(s.borderTopLeftRadius) <= 4 &&
            parseFloat(s.borderTopRightRadius) <= 4 &&
            parseFloat(s.borderBottomRightRadius) <= 4 &&
            parseFloat(s.borderBottomLeftRadius) <= 4;
          pad = sharp ? 0 : PAD;
          radius = "0px"; // merge shape = hard square box
          measured = hovered;
        }
        const r = hovered.getBoundingClientRect();
        tx = r.left + r.width / 2;
        ty = r.top + r.height / 2;
        tw = r.width + pad;
        th = r.height + pad;
      } else {
        // Pointerout nulls `hovered` before the next tick, so reset the box
        // measurement every idle frame instead of only on the transition.
        hovered = null;
        measured = null;
        pad = PAD;
        radius = "9999px";
      }

      x += (tx - x) * POS_EASE;
      y += (ty - y) * POS_EASE;
      w += (tw - w) * SIZE_EASE;
      h += (th - h) * SIZE_EASE;

      dot.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0)`;
      dot.style.width = `${w}px`;
      dot.style.height = `${h}px`;
      dot.style.borderRadius = radius;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeaveDoc);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeaveDoc);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div ref={dotRef} aria-hidden className="pointer-follower" />;
}
