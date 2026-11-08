"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; violet: boolean };

const LINK_DISTANCE = 130;
const CURSOR_DISTANCE = 170;
const BLUE = "59, 130, 246";
const VIOLET = "139, 92, 246";

/**
 * A slow network of connected points that reaches toward the cursor, a nod to
 * the communities this site is about. It stops drawing while off screen, and
 * draws one still frame for visitors who prefer reduced motion.
 */
export function ConstellationCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let isVisible = true;

    const seed = () => {
      const count = Math.min(70, Math.round((width * height) / 15000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        violet: Math.random() > 0.6,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance > LINK_DISTANCE) continue;

          context.strokeStyle = `rgba(${BLUE}, ${(1 - distance / LINK_DISTANCE) * 0.22})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }

        const toCursor = Math.hypot(node.x - cursor.x, node.y - cursor.y);
        if (toCursor < CURSOR_DISTANCE) {
          context.strokeStyle = `rgba(${VIOLET}, ${(1 - toCursor / CURSOR_DISTANCE) * 0.55})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(cursor.x, cursor.y);
          context.stroke();
        }

        context.fillStyle = `rgba(${node.violet ? VIOLET : BLUE}, 0.75)`;
        context.beginPath();
        context.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        context.fill();
      }
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reducedMotion) draw();
      else if (isVisible && !document.hidden) frame = requestAnimationFrame(step);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed();
      start();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = canvas.getBoundingClientRect();
      cursor.x = event.clientX - bounds.left;
      cursor.y = event.clientY - bounds.top;
    };

    const handleVisibility = () => start();

    const resizeObserver = new ResizeObserver(resize);
    const viewObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else cancelAnimationFrame(frame);
    });

    resizeObserver.observe(canvas);
    viewObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
