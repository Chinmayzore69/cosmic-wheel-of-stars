import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Copy, Orbit, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { calculateNumbers } from "@/lib/numerology";

export type Entry = "numerology" | "astrologer" | "birth-chart" | "account" | "privacy" | "terms" | "contact" | "about" | null;

const meanings: Record<number, [string, string]> = {
  1: ["The Pioneer", "Independence, initiative, and originality. Where could you take a small, confident first step?"],
  2: ["The Harmoniser", "Cooperation, sensitivity, and balance. How can you honour your own needs while supporting others?"],
  3: ["The Expressive Soul", "Creativity, expression, and joy. What idea deserves a little more of your attention?"],
  4: ["The Builder", "Consistency, practicality, and structure. What small habit could support your bigger vision?"],
  5: ["The Explorer", "Freedom, curiosity, and adaptability. Where might a fresh perspective help you grow?"],
  6: ["The Nurturer", "Care, responsibility, and harmony. What would caring for yourself look like today?"],
  7: ["The Seeker", "Reflection, inquiry, and inner wisdom. Which question are you ready to explore more deeply?"],
  8: ["The Visionary", "Ambition, stewardship, and purposeful action. How can your goals reflect what really matters to you?"],
  9: ["The Humanitarian", "Compassion, perspective, and service. What can you let go of to make room for growth?"],
  11: ["The Intuitive", "Inspiration, sensitivity, and insight. How can you balance intuition with practical action?"],
  22: ["The Master Builder", "Vision, dedication, and constructive action. What is one grounded step toward your long-term goal?"],
  33: ["The Compassionate Guide", "Care, expression, and service. How can you offer support without forgetting your own boundaries?"],
};

export function KundliEntry({ entry, onChange }: { entry: Entry; onChange: (entry: Entry) => void }) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateNumbers> | null>(null);
  const [copied, setCopied] = useState(false);
  const titles: Record<Exclude<Entry, null>, string> = {
    numerology: result ? `Your numbers, ${name.trim().split(" ")[0]}` : "Your story is in your numbers.",
    astrologer: "Meet your AI astrologer", "birth-chart": "Your birth chart, thoughtfully explained", account: "Your cosmic journey starts here.", privacy: "Your details belong to you.", terms: "A thoughtful approach to cosmic wisdom", contact: "Get in touch", about: "Ancient wisdom. A new perspective.",
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) { setError("Please enter your full name (at least two characters)."); return; }
    try { setResult(calculateNumbers(date)); setError(""); } catch (err) { setError(err instanceof Error ? err.message : "Please check your details."); }
  };
  return <Dialog open={entry !== null} onOpenChange={(open) => { if (!open) onChange(null); }}>
    <DialogContent onOpenAutoFocus={() => { const active = document.activeElement; returnFocus.current = active instanceof HTMLElement ? active : null; }} onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus.current?.focus(); }} onInteractOutside={(event) => { if (entry === "numerology" && (name || date)) event.preventDefault(); }}>
      <div className="tool-icon mb-2"><Orbit /></div>
      <DialogHeader><DialogTitle className="pr-4 font-display text-2xl leading-snug">{entry ? titles[entry] : "Kundli AI"}</DialogTitle><DialogDescription>{entry === "numerology" ? "A little self-discovery, rooted in traditional numerology." : "Explore at your own pace, with clarity and care."}</DialogDescription></DialogHeader>
      {entry === "numerology" && !result && <form onSubmit={submit} noValidate>
        <label className="form-field" htmlFor="full-name">Full name *<input id="full-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required maxLength={100} aria-invalid={!!error} /></label>
        <label className="form-field" htmlFor="birth-date">Date of birth *<input id="birth-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required aria-invalid={!!error} /></label>
        {error && <p className="form-error mb-4" role="alert">{error}</p>}
        <Button variant="cosmic" size="hero" className="w-full" type="submit">Generate My Free Report <ArrowRight /></Button>
        <p className="modal-note mt-4 flex items-start gap-2"><ShieldCheck className="mt-1 size-4 shrink-0" />No email required. Your details stay in this page and are not saved or sent to a service.</p>
      </form>}
      {entry === "numerology" && result && <div className="space-y-5">
        <div className="sample-numbers"><div><strong>{result.lifePath}</strong><span>Life Path Number</span></div><div><strong>{result.birthNumber}</strong><span>Birth Number</span></div></div>
        <h3 className="text-xl">{meanings[result.lifePath]?.[0]}</h3><p className="modal-note">{meanings[result.lifePath]?.[1]}</p>
        <details className="modal-note"><summary className="cursor-pointer text-foreground">How your numbers are calculated</summary><p className="mt-2">We sum all digits in your date of birth, then reduce the total to one digit, retaining master numbers 11, 22, and 33. Your Birth Number uses the same reduction on the day of the month. This digit-sum convention is one numerology method; traditions vary. Your name personalises the greeting, not the calculation.</p></details>
        <p className="modal-note">These are traditional reflection prompts, not scientific predictions. This report is not saved; copy it before leaving.</p>
        <div className="flex flex-wrap gap-2"><Button variant="celestial" onClick={async () => { try { await navigator.clipboard.writeText(`${name} — Kundli AI\nLife Path: ${result.lifePath}\nBirth Number: ${result.birthNumber}\n${meanings[result.lifePath]?.join(": ")}\nTraditional reflection, not a prediction.`); setCopied(true); } catch { setError("Copy is unavailable in this browser. You can select and copy the report text."); } }}><Copy />{copied ? "Copied" : "Copy report"}</Button><Button variant="cosmic" onClick={() => onChange("astrologer")}>Explore AI Astrologer <ArrowRight /></Button><Button variant="ghost" onClick={() => { setResult(null); setCopied(false); }}>Edit details</Button></div>
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>}
      {entry === "astrologer" && <div className="space-y-4"><p className="modal-note">Live AI conversations are coming in the next phase. The conversation below is an illustrative example, not a live AI response.</p><div className="sample-question">How can I reflect on my strengths?</div><p className="modal-note">Traditional frameworks can offer questions to reflect on, rather than fixed answers about your future. Which activities leave you feeling most engaged, and what strengths do they draw on?</p><p className="modal-note">Chart-specific answers will require a verified birth chart. We will never guess your planetary placements.</p><Button variant="cosmic" onClick={() => onChange("numerology")}>Explore your numerology first <ArrowRight /></Button></div>}
      {entry === "birth-chart" && <div className="space-y-4"><p className="modal-note">Birth-chart generation is planned for the next phase. It will use your date, accurate birth time, and birthplace to calculate planetary placements before any interpretation.</p><p className="modal-note">If your birth time is unknown, we will explain which details cannot be determined reliably. No chart is being generated or saved yet.</p><Button variant="cosmic" onClick={() => onChange("numerology")}>Try the free numerology report <ArrowRight /></Button></div>}
      {entry === "account" && <div className="space-y-4"><span className="free-badge">COMING SOON</span><p className="modal-note">Email sign-up, email sign-in, and Google sign-in will be available when accounts are connected. You cannot create an account or save reports yet, and we are not collecting registration details.</p><Button variant="cosmic" onClick={() => onChange("numerology")}>Explore without an account <ArrowRight /></Button></div>}
      {entry === "privacy" && <div className="space-y-3 modal-note"><p>This initial version uses your name and date of birth only inside the current page to calculate your report. We do not send these details to an AI service or save reports or conversations.</p><p>Closing the page or reloading clears the report. Use “Edit details” to replace the details within this session. Account storage and saved-data deletion controls are not available yet; their privacy terms will be added before launch.</p><p>The hosting platform may process ordinary technical access information. This is an initial privacy notice, not a claim that the site uses no technical logging.</p><p>A verified support contact has not been supplied yet.</p></div>}
      {entry === "terms" && <div className="space-y-3 modal-note"><p>Kundli AI offers traditional astrology and numerology perspectives for reflection and entertainment. These are not scientifically established methods of predicting personal outcomes.</p><p>Do not rely on these interpretations for medical, legal, financial, or other high-stakes decisions. Seek qualified professional advice where appropriate.</p><p>This is an early preview. Live AI, birth charts, accounts, and saved reports are not connected. Formal service terms will be provided before those features launch.</p></div>}
      {entry === "contact" && <p className="modal-note">Our verified support contact will be added before public launch. No contact form is collecting messages in this preview.</p>}
      {entry === "about" && <p className="modal-note">Kundli AI brings Vedic traditions and numerology into a thoughtful, accessible experience. Our aim is self-understanding, not certainty: transparent calculations, clear explanations, and room for your own perspective.</p>}
    </DialogContent>
  </Dialog>;
}