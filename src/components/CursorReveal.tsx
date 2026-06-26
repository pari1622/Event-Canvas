import { useEffect, useRef, useState, type ReactNode } from "react";

type CursorRevealProps = {
  baseImage: string;
  revealImage: string;
  children?: ReactNode;
};

const DESKTOP_RADIUS = 280;
const TABLET_RADIUS = 220;
const MOBILE_RADIUS = 170;

export default function CursorReveal({
  baseImage,
  revealImage,
  children,
}: CursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const revealRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: -999,
    y: -999,
  });

  const smooth = useRef({
    x: -999,
    y: -999,
  });

  const raf = useRef<number | null>(null);

  const [inside, setInside] = useState(false);

  const radiusRef = useRef(DESKTOP_RADIUS);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        radiusRef.current = MOBILE_RADIUS;
      } else if (window.innerWidth < 1024) {
        radiusRef.current = TABLET_RADIUS;
      } else {
        radiusRef.current = DESKTOP_RADIUS;
      }
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const move = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      mouse.current.x = e.clientX - rect.left;

      mouse.current.y = e.clientY - rect.top;
    };

    const enter = () => {
      setInside(true);
    };

    const leave = () => {
      setInside(false);

      mouse.current = {
        x: -999,
        y: -999,
      };
    };

    container.addEventListener("mousemove", move);

    container.addEventListener("mouseenter", enter);

    container.addEventListener("mouseleave", leave);

    return () => {
      container.removeEventListener("mousemove", move);

      container.removeEventListener("mouseenter", enter);

      container.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;

      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      if (revealRef.current) {
        const r = radiusRef.current;

        const mask = `
          radial-gradient(
            circle ${r}px at
            ${smooth.current.x}px
            ${smooth.current.y}px,

            rgba(255,255,255,1) 0%,

            rgba(255,255,255,1) 40%,

            rgba(255,255,255,.78) 60%,

            rgba(255,255,255,.40) 75%,

            rgba(255,255,255,.12) 88%,

            transparent 100%
          )
        `;

        revealRef.current.style.webkitMaskImage = mask;

        revealRef.current.style.maskImage = mask;

        revealRef.current.style.opacity = inside ? "1" : "0";
      }

      raf.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [inside]);

  return (
    <div
      ref={containerRef}
      className="
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* BASE IMAGE */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${baseImage})`,
        }}
      />

      {/* REVEAL IMAGE */}

      <div
        ref={revealRef}
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          pointer-events-none
        "
        style={{
          backgroundImage: `url(${revealImage})`,
          opacity: 0,
          transition: "opacity .25s ease",
        }}
      />

      {/* BLUE TINT */}

      <div
        className="
          absolute
          inset-0
          bg-blue-950/10
          pointer-events-none
        "
      />

      {/* DARK OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/25
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
