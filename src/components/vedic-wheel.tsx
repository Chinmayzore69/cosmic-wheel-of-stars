import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const rashis = [
  ["मेष", "Mesha", "♈"], ["वृषभ", "Vrishabha", "♉"],
  ["मिथुन", "Mithuna", "♊"], ["कर्क", "Karka", "♋"],
  ["सिंह", "Simha", "♌"], ["कन्या", "Kanya", "♍"],
  ["तुला", "Tula", "♎"], ["वृश्चिक", "Vrishchika", "♏"],
  ["धनु", "Dhanu", "♐"], ["मकर", "Makara", "♑"],
  ["कुम्भ", "Kumbha", "♒"], ["मीन", "Meena", "♓"],
];
const grahas = ["सूर्य", "चन्द्र", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "राहु", "केतु"];
const point = (radius: number, degrees: number) => {
  const angle = degrees * Math.PI / 180;
  return { x: 300 + radius * Math.cos(angle), y: 300 + radius * Math.sin(angle) };
};

export function VedicWheel() {
  const [paused, setPaused] = useState(false);
  return <div className="vedic-wheel-scene" data-paused={paused}>
    <svg className="vedic-wheel" viewBox="0 0 600 600" role="img" aria-labelledby="vedic-wheel-title vedic-wheel-desc">
      <title id="vedic-wheel-title">Vedic zodiac wheel</title>
      <desc id="vedic-wheel-desc">The twelve Hindu rashis, from Mesha to Meena, surrounding sacred geometry, Om, and the nine grahas. Decorative symbolism, not a calculated birth chart.</desc>
      <g className="wheel-rotor">
        {[276, 269, 254, 243, 185, 174, 139, 103].map((r, i) => <circle key={r} cx="300" cy="300" r={r} className={i % 3 === 0 ? "wheel-ring-gold" : "wheel-ring"} />)}
        {Array.from({ length: 120 }, (_, i) => {
          const a = point(i % 5 === 0 ? 258 : 265, i * 3);
          const b = point(269, i * 3);
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="wheel-tick" />;
        })}
        {rashis.map(([hindi, latin, symbol], i) => {
          const angle = i * 30 - 90;
          const glyph = point(221, angle);
          const name = point(200, angle);
          const start = point(185, angle - 15);
          const end = point(254, angle - 15);
          const dot = point(276, angle);
          return <g key={latin}><title>{latin} — {hindi}</title><line x1={start.x} y1={start.y} x2={end.x} y2={end.y} className="wheel-ring" /><circle cx={dot.x} cy={dot.y} r="2.4" className="wheel-star" /><text x={glyph.x} y={glyph.y} className="wheel-glyph" textAnchor="middle" dominantBaseline="central">{symbol}</text><text x={name.x} y={name.y} className="wheel-rashi" textAnchor="middle" dominantBaseline="central" lang="hi">{hindi}</text></g>;
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const p = point(103, i * 30 - 90);
          return <circle key={i} cx={p.x} cy={p.y} r="52" className="wheel-petal" />;
        })}
        <polygon points="300,145 434,377 166,377" className="wheel-sacred" />
        <polygon points="300,455 166,223 434,223" className="wheel-sacred" />
        {grahas.map((graha, i) => { const p = point(158, i * 40 - 90); return <text key={graha} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" className="wheel-graha" lang="hi">{graha}</text>; })}
      </g>
      <circle cx="300" cy="300" r="50" className="wheel-center" />
      <circle cx="300" cy="300" r="42" className="wheel-ring-gold" />
      <text x="300" y="302" textAnchor="middle" dominantBaseline="central" className="wheel-om" lang="hi">ॐ</text>
    </svg>
    <div className="wheel-caption"><span>राशि चक्र <span aria-hidden="true">·</span> THE VEDIC ZODIAC</span><Button variant="ghost" size="icon" className="wheel-motion" aria-label={paused ? "Play zodiac wheel rotation" : "Pause zodiac wheel rotation"} aria-pressed={paused} title={paused ? "Play rotation" : "Pause rotation"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button></div>
  </div>;
}