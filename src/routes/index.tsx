import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Fingerprint,
  Globe2,
  Hash,
  Heart,
  LockKeyhole,
  Menu,
  MessageCircle,
  Orbit,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KundliEntry, type Entry } from "@/components/kundli-entry";
import cosmicArt from "@/assets/cosmic-background.jpg";
import { VedicWheel } from "@/components/vedic-wheel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kundli AI — Discover yourself through stars and numbers" },
      {
        name: "description",
        content:
          "Discover your free numerology profile and explore Vedic astrology with Kundli AI. Ancient wisdom, thoughtful insights, and a new perspective.",
      },
      { property: "og:title", content: "Kundli AI — Discover yourself through stars and numbers" },
      {
        property: "og:description",
        content:
          "Your cosmic journey starts with self-discovery. Explore free numerology and traditional Vedic wisdom.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const faqs = [
  [
    "What is Kundli AI?",
    "Kundli AI is a thoughtful space to explore traditional Vedic astrology and numerology for reflection and self-discovery. This initial version includes a free, calculated numerology report; live AI and birth charts are planned.",
  ],
  [
    "Is the numerology report really free?",
    "Yes. Enter your full name and date of birth to get your Life Path and Birth Numbers, the calculation method, and traditional reflection prompts. No email or account is required.",
  ],
  [
    "How does the AI astrologer work?",
    "Live AI is not connected in this preview. Once available, it will explain traditional concepts conversationally and use verified chart calculations for chart-specific answers, rather than inventing planetary positions.",
  ],
  [
    "What birth details are required?",
    "Numerology needs only your name and date of birth. A future birth chart will need your birth date, time, and birthplace. Unknown birth times will be handled with clearly explained limitations.",
  ],
  [
    "Can I save my reports?",
    "Not to an account yet. You can copy your numerology report now. Accounts and saved reports are planned for a future release.",
  ],
  [
    "Is my information private?",
    "Your numerology details are processed only in the current page and are not sent to an AI service or saved as a report. Reloading clears them. Read the initial privacy notice for the scope of this preview.",
  ],
  [
    "Can astrology predict my future with certainty?",
    "No. Astrology and numerology are traditional or spiritual frameworks for reflection, not scientifically established prediction methods. Your decisions and circumstances matter; no outcome is guaranteed.",
  ],
];

function Brand() {
  return (
    <span className="logo">
      <Orbit className="logo-icon" strokeWidth={1.2} />
      <span>
        Kundli <span className="logo-ai">AI</span>
      </span>
    </span>
  );
}
function Index() {
  const [entry, setEntry] = useState<Entry>(null);
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState("report");
  const [active, setActive] = useState("Home");
  const navigate = (label: string) => {
    setMenu(false);
    setActive(label);
    if (label === "Birth Chart") {
      setEntry("birth-chart");
      return;
    }
    document
      .getElementById(
        label === "Home" ? "home" : label === "How It Works" ? "how-it-works" : "free-tools",
      )
      ?.scrollIntoView({ behavior: "smooth" });
    if (label === "AI Astrologer") setEntry("astrologer");
  };
  return (
    <div>
      <header className="site-nav">
        <div className="site-container flex h-full items-center justify-between gap-5">
          <Button asChild variant="nav" className="p-0">
            <a href="#home" aria-label="Kundli AI home">
              <Brand />
            </a>
          </Button>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {["Home", "Numerology", "AI Astrologer", "Birth Chart", "How It Works"].map((label) => (
              <Button
                key={label}
                variant="nav"
                className="relative"
                data-active={active === label}
                onClick={() => navigate(label)}
              >
                {label}
              </Button>
            ))}
          </nav>
          <Button
            variant="celestial"
            className="hidden text-xs lg:inline-flex"
            onClick={() => setEntry("account")}
          >
            Begin your journey <ArrowUpRight />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {["Home", "Numerology", "AI Astrologer", "Birth Chart", "How It Works"].map((label) => (
              <Button
                variant="nav"
                className="justify-start"
                key={label}
                onClick={() => navigate(label)}
              >
                {label}
              </Button>
            ))}
          </nav>
        )}
      </header>
      <main>
        <section id="home" className="hero">
          <img
            className="hero-art"
            src={cosmicArt}
            alt="Purple star-filled cosmos"
            width={1920}
            height={1088}
            fetchPriority="high"
          />
          <VedicWheel />
          <div className="site-container">
            <div className="hero-copy">
              <div className="eyebrow">
                <Star /> Ancient wisdom. New possibilities.
              </div>
              <h1>
                Discover Yourself
                <br />
                Through the <span className="text-cosmic">Stars</span>
                <br />
                and <span className="text-cosmic">Numbers.</span>
              </h1>
              <p className="hero-description">
                Explore your numerology profile, discover the traditions behind your birth chart,
                and ask personalised questions in one intelligent cosmic experience.
              </p>
              <div className="hero-actions">
                <Button variant="cosmic" size="hero" onClick={() => setEntry("numerology")}>
                  <Hash />
                  Get My Free Numerology Report <ArrowUpRight />
                </Button>
                <Button variant="celestial" size="hero" onClick={() => setEntry("astrologer")}>
                  <MessageCircle />
                  Chat With AI Astrologer
                </Button>
              </div>
              <p className="hero-caption">
                <ShieldCheck />
                Personalised insights. Simple explanations. Your journey, at your pace.
              </p>
            </div>
          </div>
          <div className="orbit-caption">The universe within you</div>
        </section>
        <div className="site-container trust-strip">
          <span>
            <Orbit />
            Rooted in Vedic traditions
          </span>
          <span>
            <Fingerprint />
            Personalised to your journey
          </span>
          <span>
            <LockKeyhole />
            Privacy, by intention
          </span>
          <span>
            <Heart />
            Guidance without fear
          </span>
        </div>
        <section id="free-tools" className="section site-container">
          <div className="section-heading">
            <div className="eyebrow">A little curiosity. A deeper connection.</div>
            <h2>Two paths to knowing yourself.</h2>
            <p>Start with your numbers. Find a new perspective in the stars.</p>
          </div>
          <div className="tools-grid">
            <article className="tool-card">
              <div className="flex items-center justify-between">
                <div className="tool-icon">
                  <Hash />
                </div>
                <span className="free-badge">✦ FREE TO EXPLORE</span>
              </div>
              <span className="number-decoration" aria-hidden="true">
                7
              </span>
              <h3>Free Numerology Report</h3>
              <p>
                There’s more to your numbers than meets the eye. Discover the patterns that make
                your journey uniquely yours.
              </p>
              <ul>
                {[
                  "Your Life Path & Birth Numbers",
                  "Traditional meanings, simply explained",
                  "Strengths & thoughtful reflection prompts",
                ].map((text) => (
                  <li key={text}>
                    <Check />
                    {text}
                  </li>
                ))}
              </ul>
              <Button variant="cosmic" size="hero" onClick={() => setEntry("numerology")}>
                Generate My Free Report <ArrowRight />
              </Button>
            </article>
            <article className="tool-card cyan-card">
              <div className="flex items-center justify-between">
                <div className="tool-icon">
                  <MessageCircle />
                </div>
                <span className="free-badge">✦ PREVIEW EXPERIENCE</span>
              </div>
              <h3>Your AI Astrologer</h3>
              <p>
                A space for your bigger questions. Explore ancient perspectives with a thoughtful,
                conversational companion.
              </p>
              <ul>
                {[
                  "Career, relationships & personal growth",
                  "Clear explanations of Vedic concepts",
                  "Live conversations coming in the next phase",
                ].map((text) => (
                  <li key={text}>
                    <Check />
                    {text}
                  </li>
                ))}
              </ul>
              <Button variant="celestial" size="hero" onClick={() => setEntry("astrologer")}>
                Meet Your AI Astrologer <ArrowRight />
              </Button>
            </article>
          </div>
        </section>
        <section className="section band">
          <div className="site-container">
            <div className="section-heading">
              <div className="eyebrow">Not just predictions. Perspective.</div>
              <h2>Cosmic wisdom. Human at heart.</h2>
              <p>Made for your curiosity, with clarity and care at every step.</p>
            </div>
            <div className="benefits">
              {[
                {
                  icon: Fingerprint,
                  title: "Uniquely your journey",
                  text: "Personalised numbers and reflection, not one-size-fits-all horoscopes.",
                },
                {
                  icon: Compass,
                  title: "Wisdom, made simple",
                  text: "Traditional ideas, explained in language that feels clear and familiar.",
                },
                {
                  icon: MessageCircle,
                  title: "Space for your questions",
                  text: "A conversational vision, built around thoughtful exploration, not certainty.",
                },
                {
                  icon: Globe2,
                  title: "Wherever life takes you",
                  text: "A calm, accessible experience on your phone, tablet, or computer.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon className="benefit-icon" strokeWidth={1.4} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="how-it-works" className="section site-container">
          <div className="section-heading">
            <div className="eyebrow">Your journey, simplified</div>
            <h2>A little about you. A world to explore.</h2>
            <p>Three simple steps towards a fresh perspective.</p>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "Share your birth details",
                "Start with your name and date of birth. Nothing more than we need.",
              ],
              [
                "02",
                "Discover your cosmic profile",
                "Explore your calculated numerology report. Birth charts are coming next.",
              ],
              [
                "03",
                "Reflect. Explore. Grow.",
                "Read the interpretation, consider the questions, and make the journey your own.",
              ],
            ].map(([number, title, text]) => (
              <div className="step" key={number}>
                <div className="step-number">{number}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section band">
          <div className="site-container preview-layout">
            <div className="preview-copy">
              <div className="eyebrow">
                <Star />A glimpse of your journey
              </div>
              <h2>
                Small insights.
                <br />
                <span className="text-cosmic">Meaningful discoveries.</span>
              </h2>
              <p>
                A number can be a starting point. A question can open a new door. Take a look at
                what exploring with Kundli AI can feel like.
              </p>
              <Button variant="celestial" onClick={() => setEntry("numerology")}>
                Discover your own numbers <ArrowUpRight />
              </Button>
            </div>
            <div className="preview-panel">
              <div className="preview-tabs">
                <Button
                  variant="nav"
                  aria-pressed={preview === "report"}
                  onClick={() => setPreview("report")}
                >
                  <Hash />
                  Numerology report
                </Button>
                <Button
                  variant="nav"
                  aria-pressed={preview === "chat"}
                  onClick={() => setPreview("chat")}
                >
                  <MessageCircle />
                  AI conversation
                </Button>
              </div>
              <div className="sample-label">Illustrative example · Not your personal result</div>
              {preview === "report" ? (
                <>
                  <div className="sample-numbers">
                    <div>
                      <strong>7</strong>
                      <span>Life Path Number</span>
                    </div>
                    <div>
                      <strong>3</strong>
                      <span>Birth Number</span>
                    </div>
                  </div>
                  <h4>The Seeker. The Expressive Soul.</h4>
                  <p>
                    In traditional numerology, 7 is associated with curiosity and introspection,
                    while 3 invites creativity and expression. What happens when your inner wisdom
                    finds its voice?
                  </p>
                </>
              ) : (
                <>
                  <div className="sample-question">What can my chart tell me about my career?</div>
                  <div className="sample-answer">
                    <Orbit className="size-6" />
                    <p>
                      A verified birth chart would be needed to discuss your placements. Even then,
                      traditional interpretations offer themes for reflection—not a fixed career or
                      guaranteed outcome. What kinds of work feel most meaningful to you?
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="section site-container">
          <div className="privacy-layout">
            <ShieldCheck strokeWidth={1.3} />
            <div>
              <h2>Your universe. Your privacy.</h2>
              <p>
                Your name and date of birth stay in this page for your numerology calculation. No
                saved profiles or conversations yet. Clear methods, honest limitations, and no
                fear-based predictions—because trust matters more than mystery.
              </p>
            </div>
            <Button variant="celestial" onClick={() => setEntry("privacy")}>
              Our privacy promise <ArrowUpRight />
            </Button>
          </div>
        </section>
        <section className="section band">
          <div className="site-container faq-layout">
            <div>
              <div className="eyebrow">Clarity before curiosity</div>
              <h2>
                A few questions,
                <br />
                written in the stars.
              </h2>
              <p>
                A little more about Kundli AI,
                <br />
                and what you can expect.
              </p>
            </div>
            <Accordion type="single" collapsible>
              {faqs.map(([question, answer], i) => (
                <AccordionItem key={question} value={`faq-${i}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section id="account" className="account-section">
          <div className="site-container">
            <div className="eyebrow justify-center">
              <Orbit />
              Your next chapter
            </div>
            <h2>Your Cosmic Journey Starts Here.</h2>
            <p>Create your account to save your reports and continue your conversations.</p>
            <div className="account-actions">
              <Button variant="cosmic" size="hero" onClick={() => setEntry("account")}>
                Sign up with email <ArrowRight />
              </Button>
              <Button variant="celestial" size="hero" onClick={() => setEntry("account")}>
                <Globe2 />
                Continue with Google
              </Button>
              <Button variant="nav" size="hero" onClick={() => setEntry("account")}>
                Sign in with email <ArrowUpRight />
              </Button>
            </div>
            <p className="mt-4 text-xs">
              Accounts and saved journeys are coming soon. Explore free numerology today.
            </p>
          </div>
        </section>
      </main>
      <footer className="footer site-container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              Ancient wisdom meets a new perspective.
              <br />A thoughtful space to explore the universe within.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <Button variant="nav" onClick={() => setEntry("numerology")}>
                Free Numerology Report
              </Button>
              <Button variant="nav" onClick={() => setEntry("astrologer")}>
                AI Astrologer
              </Button>
              <Button variant="nav" onClick={() => setEntry("birth-chart")}>
                Birth Chart
              </Button>
              <Button variant="nav" onClick={() => navigate("How It Works")}>
                How It Works
              </Button>
            </div>
          </div>
          <div>
            <h3>Kundli AI</h3>
            <div className="footer-links">
              {(
                [
                  ["About", "about"],
                  ["Contact", "contact"],
                  ["Privacy Policy", "privacy"],
                  ["Terms of Service", "terms"],
                ] as const
              ).map(([label, action]) => (
                <Button variant="nav" key={label} onClick={() => setEntry(action)}>
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kundli AI. Made for your journey.</span>
          <span>
            Astrology and numerology are traditional frameworks for reflection, not scientifically
            established predictions. Your future is yours to shape.
          </span>
        </div>
      </footer>
      <KundliEntry entry={entry} onChange={setEntry} />
    </div>
  );
}
