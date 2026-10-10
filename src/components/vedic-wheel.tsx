import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { angularDelta, rashis } from "@/lib/vedic-wheel";
const grahas = ["सूर्य", "चन्द्र", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "राहु", "केतु"];
const point = (radius: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  return {
    x: Number((300 + radius * Math.cos(angle)).toFixed(4)),
    y: Number((300 + radius * Math.sin(angle)).toFixed(4)),
  };
};

export function VedicWheel() {
  const [paused, setPaused] = useState(false);
  const rotor = useRef<SVGGElement>(null);
  const motion = useRef({ angle: 0, speed: 3, paused: false, reduced: false });
  const drag = useRef<{ id: number; angle: number; time: number } | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => { motion.current.reduced = preference.matches; };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    let frame = 0;
    let previous = 0;
    const animate = (time: number) => {
      const state = motion.current;
      const elapsed = previous ? Math.min(time - previous, 50) / 1000 : 0;
      previous = time;
      if (!state.paused && !state.reduced && !drag.current) {
        state.angle = (state.angle + state.speed * elapsed) % 360;
        const target = state.speed < 0 ? -3 : 3;
        state.speed += (target - state.speed) * Math.min(elapsed * 0.8, 1);
        rotor.current?.setAttribute("transform", `rotate(${state.angle} 300 300)`);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  const pointerAngle = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    return { angle: Math.atan2(y, x) * 180 / Math.PI, radius: Math.hypot(x, y), width: rect.width };
  };
  const startDrag = (event: PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0 || drag.current) return;
    const point = pointerAngle(event);
    if (point.radius < point.width * 0.09) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
    drag.current = { id: event.pointerId, angle: point.angle, time: event.timeStamp };
  };
  const moveDrag = (event: PointerEvent<SVGSVGElement>) => {
    const active = drag.current;
    if (!active || active.id !== event.pointerId) return;
    const point = pointerAngle(event);
    if (point.radius < point.width * 0.09) return;
    const delta = angularDelta(active.angle, point.angle);
    motion.current.angle += delta;
    motion.current.speed = Math.max(-50, Math.min(50, delta / Math.max((event.timeStamp - active.time) / 1000, 0.016)));
    rotor.current?.setAttribute("transform", `rotate(${motion.current.angle} 300 300)`);
    drag.current = { id: event.pointerId, angle: point.angle, time: event.timeStamp };
  };
  const endDrag = (event: PointerEvent<SVGSVGElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <div className="vedic-wheel-scene" data-paused={paused}>
      <svg
        className="vedic-wheel"
        viewBox="0 0 600 600"
        role="img"
        aria-labelledby="vedic-wheel-title vedic-wheel-desc"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <title id="vedic-wheel-title">Vedic zodiac wheel</title>
        <desc id="vedic-wheel-desc">
          The twelve Hindu rashis, from Mesha to Meena, surrounding sacred geometry, Om, and the
          nine grahas. Decorative symbolism, not a calculated birth chart.
        </desc>
        <g className="wheel-rotor" ref={rotor}>
          {[276, 269, 254, 243, 185, 174, 139, 103].map((r, i) => (
            <circle
              key={r}
              cx="300"
              cy="300"
              r={r}
              className={i % 3 === 0 ? "wheel-ring-gold" : "wheel-ring"}
            />
          ))}
          {Array.from({ length: 120 }, (_, i) => {
            const a = point(i % 5 === 0 ? 258 : 265, i * 3);
            const b = point(269, i * 3);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="wheel-tick" />;
          })}
          {rashis.map(([hindi, latin, symbol, meaning], i) => {
            const angle = i * 30 - 90;
            const glyph = point(230, angle);
            const name = point(196, angle);
            const start = point(185, angle - 15);
            const end = point(254, angle - 15);
            const dot = point(276, angle);
            return (
              <g key={latin} className={`wheel-sign wheel-sign-${i % 3}`}>
                <title>{`${latin} — ${hindi} — ${meaning}`}</title>
                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} className="wheel-ring" />
                <circle cx={dot.x} cy={dot.y} r="2.4" className="wheel-star" />
                <text
                  x={glyph.x}
                  y={glyph.y}
                  className="wheel-glyph"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {`${symbol}\uFE0E`}
                </text>
                <text
                  x={name.x}
                  y={name.y}
                  className="wheel-rashi"
                  textAnchor="middle"
                  dominantBaseline="central"
                  lang="hi"
                >
                  {hindi}
                </text>
              </g>
            );
          })}
          {Array.from({ length: 12 }, (_, i) => {
            const p = point(103, i * 30 - 90);
            return <circle key={i} cx={p.x} cy={p.y} r="52" className="wheel-petal" />;
          })}
          <polygon points="300,145 434,377 166,377" className="wheel-sacred" />
          <polygon points="300,455 166,223 434,223" className="wheel-sacred" />
          {grahas.map((graha, i) => {
            const p = point(158, i * 40 - 90);
            return (
              <text
                key={graha}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="wheel-graha"
                lang="hi"
              >
                {graha}
              </text>
            );
          })}
        </g>
        <circle cx="300" cy="300" r="50" className="wheel-center" />
        <circle cx="300" cy="300" r="42" className="wheel-ring-gold" />
        <text
          x="300"
          y="302"
          textAnchor="middle"
          dominantBaseline="central"
          className="wheel-om"
          lang="hi"
        >
          ॐ
        </text>
      </svg>
      <div className="wheel-caption">
        <span>
          राशि चक्र <span aria-hidden="true">·</span> THE VEDIC ZODIAC
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="wheel-motion"
          aria-label={paused ? "Play zodiac wheel rotation" : "Pause zodiac wheel rotation"}
          aria-pressed={paused}
          title={paused ? "Play rotation" : "Pause rotation"}
          onClick={() => {
            motion.current.paused = !paused;
            setPaused(!paused);
          }}
        >
          {paused ? <Play /> : <Pause />}
        </Button>
      </div>
    </div>
  );
}
