# Kundli AI — initial design release

## Delivered
- Complete cosmic-purple landing page with generated zodiac observatory imagery inspired by the supplied reference, neon lighting, reusable semantic tokens and branded controls.
- Navigation, two free-tool entries, benefits, steps, switchable illustrative previews, privacy block, seven FAQs, bottom account entry and footer information dialogs.
- Responsive numerology form with deterministic digit-sum calculations, master-number preservation, calculation explanation, traditional reflection prompts, editing and copy action.
- Accessible dialogs, scroll locking, Escape closing, opener focus restoration and preserved in-session form details.

## Verified
- Eight unit tests passed for routing and numerology rules.
- Browser emulation at 320×568, 375×667, 390×844, 667×375, 844×390, 768×1024, 1024×768, 1280×800, 1440×900 and 1920×1080: no page overflow; report dialog fits each viewport.
- Empty-name validation, calculated report for 1995-08-14 (Life Path 1, Birth Number 5), Escape closing and focus restoration, mobile menu closing, FAQ expansion, privacy dialog and honest AI preview checked.
- Fixed tablet navigation overflow and narrow-screen preview overflow. No browser runtime errors in the verification run. Preview build log reports build OK.

## Deferred by initial-phase scope
- Real authentication, Google login, saved reports, saved conversations, live AI and astronomical birth-chart calculation are not connected; entry points disclose this explicitly.
- A verified support contact and formal launch privacy/terms must be supplied before public launch. No invented email address or fabricated signup success.
- No external database connection was made: the user's mention of neon was interpreted as a lighting preference, not a request to use database data.
- Physical devices, virtual-keyboard behaviour, screen-reader review and full production accessibility audit remain unverified. Clipboard copy has error handling but was not exercised in the browser checks.

## Next milestone
Review the landing-page design before connecting accounts, storage, chart calculations or live AI.

## Vedic wheel refinement
- Separated the background cosmos from a fully fitted, independently rotating SVG wheel. Added twelve Devanagari rashi names, nine graha names and central Om, retaining violet and antique-gold lighting.
- Gentle 160-second rotation with pause/play and reduced-motion support. Wheel stays below text on phones and beside it on larger screens.
- Verified rotation advances, pause stops it, twelve rashis and nine grahas render, reduced-motion disables animation, and six phone/landscape/tablet/desktop sizes show no overflow, cropping or text overlap.
- Fixed cross-runtime coordinate precision and SVG title hydration mismatches; final browser run recorded no runtime errors. Preview build reports build OK.