import { useEffect, type RefObject } from "react";
import type { CarStatus } from "../types/race";
import { ANIM_SPECS, CAR_WIDTH_PX, RESET_ANIM_MS } from "../lib/constants";

interface Params {
  status: CarStatus;
  duration: number;
  brokenAtFraction: number | null;
  trackRef: RefObject<HTMLDivElement | null>;
  moverRef: RefObject<HTMLDivElement | null>;
}

export function useCarAnimation({
  status,
  duration,
  brokenAtFraction,
  trackRef,
  moverRef,
}: Params): void {
  useEffect(() => {
    const mover = moverRef.current;
    const track = trackRef.current;
    if (!mover || !track) return;

    const finishPx = Math.max(0, track.clientWidth - CAR_WIDTH_PX);

    switch (status) {
      case "driving": {
        mover.style.transition = `transform ${duration}ms ${ANIM_SPECS}`;
        mover.style.transform = `translateX(${finishPx}px)`;
        break;
      }
      case "broken": {
        const fraction = brokenAtFraction ?? 0;
        mover.style.transition = "none";
        mover.style.transform = `translateX(${finishPx * fraction}px)`;
        break;
      }
      case "finished": {
        mover.style.transition = "none";
        mover.style.transform = `translateX(${finishPx}px)`;
        break;
      }
      case "idle": {
        mover.style.transition = `transform ${RESET_ANIM_MS}ms ease`;
        mover.style.transform = "translateX(0px)";
        break;
      }
    }
  }, [status, duration, brokenAtFraction, trackRef, moverRef]);
}
