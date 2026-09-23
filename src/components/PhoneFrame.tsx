const W = 318; // total phone width (px)
const H = 668; // total phone height (px)
const D = 34; // phone thickness (px) — how far the side edges extend in 3D
const FRONT_RADIUS = 46; // must match the front face's rounded-[2.9rem] corner (2.9 * 16)
const SCREEN_W = 300;
const SCREEN_H = 650;

// The side strip only spans the straight run of the edge, between where the
// front face's corners start curving away — with fully rounded (pill) caps,
// so it reads as a continuation of the front's curvature instead of a flat
// flap butting into a round corner.
const EDGE_HEIGHT = H - FRONT_RADIUS * 2;
const EDGE_RADIUS = D / 2;

const METAL_EDGE =
  "linear-gradient(90deg, #2a2a2e 0%, #96969e 28%, #f2f2f5 50%, #96969e 72%, #2a2a2e 100%)";

function SideEdge({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;
  return (
    <div
      className="absolute"
      style={{
        top: FRONT_RADIUS,
        height: EDGE_HEIGHT,
        width: D,
        left: `calc(50% - ${D / 2}px)`,
        borderRadius: EDGE_RADIUS,
        transform: `rotateY(${sign * 90}deg) translateZ(${W / 2}px)`,
        background: METAL_EDGE,
        transformStyle: "preserve-3d",
        boxShadow: "inset 0 0 3px rgba(0,0,0,0.5)",
      }}
    >
      {side === "left" ? (
        <>
          <Button top={36} height={26} />
          <Button top={82} height={46} />
          <Button top={140} height={46} />
        </>
      ) : (
        <Button top={100} height={58} />
      )}
    </div>
  );
}

function Button({ top, height }: { top: number; height: number }) {
  return (
    <div
      className="absolute left-1/2"
      style={{
        top,
        height,
        width: D * 0.5,
        transform: `translateX(-50%) translateZ(3px)`,
        borderRadius: 3,
        background: "linear-gradient(90deg, #6b6b73, #e8e8ec, #6b6b73)",
        boxShadow: "0 0 2px rgba(0,0,0,0.4)",
      }}
    />
  );
}

export default function PhoneFrame({ src }: { src: string }) {
  return (
    <div
      className="relative"
      style={{ width: W, height: H, transformStyle: "preserve-3d" }}
    >
      <SideEdge side="left" />
      <SideEdge side="right" />

      {/* front face */}
      <div
        className="absolute inset-0 rounded-[2.9rem] bg-gradient-to-br from-zinc-400 via-zinc-700 to-zinc-900 p-[3px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)]"
        style={{ transform: `translateZ(${D / 2}px)` }}
      >
        <div className="relative h-full w-full rounded-[2.75rem] bg-black p-[6px] shadow-[inset_0_0_2px_rgba(255,255,255,0.25),inset_0_2px_12px_rgba(0,0,0,0.9)]">
          <div className="absolute left-1/2 top-[14px] z-20 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
          <div
            className="relative overflow-hidden rounded-[2.15rem] bg-white"
            style={{ width: SCREEN_W, height: SCREEN_H }}
          >
            <iframe
              src={src}
              title="Lazy Booking live app"
              className="h-[844px] w-[390px] origin-top-left border-0"
              style={{ transform: "scale(0.76923)" }}
              loading="lazy"
            />
            {/* glass reflection */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
