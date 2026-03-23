# Dalan.AI — Engineering Product Document (EPD)
**Version:** 1.0.0  
**Classification:** Internal Engineering & Design Specification  
**Authors:** Senior Software Engineer + Lead UI/UX Designer  
**Stack:** React 18 · Next.js 14 (Turbopack) · TypeScript · Tailwind CSS · Framer Motion  

---

## 0. Executive Summary

Dalan.AI is an AI-driven education platform focused on K–12 and STEM. The website is a **storytelling-first digital experience** anchored by the **Bakunawa** — a Philippine mythological serpent deity — as a narrative and visual metaphor for transformation, curiosity, and knowledge. The site is built on a **black canvas** with a rich, dark-fantasy aesthetic drawn from Philippine mythology, rendered in imperial blue, emerald, and warm gold.

This document covers the full product specification: design system, page architecture, component library, animation system, data models, routing, and implementation guide.

---

## 1. Brand & Theme Specification

### 1.1 Mythology Narrative
The **Bakunawa** (Moon Eater) is the centering metaphor of the brand. The serpent's journey of swallowing the 7 moons becomes an allegory for Dalan.AI's 7-stage educational philosophy — each moon representing a learning milestone from curiosity to mastery. As users scroll through the website, they witness the Bakunawa's story unfold, weaving in and out of content sections.

### 1.2 Color System

```css
/* === DALAN.AI DESIGN TOKENS === */
:root {
  /* Core Palette */
  --color-void:         #000000;   /* Primary background — absolute black */
  --color-abyss:        #080810;   /* Section backgrounds */
  --color-deep:         #0D0D1A;   /* Card backgrounds */
  --color-surface:      #12122A;   /* Elevated surface */

  /* Imperial Blue */
  --color-imperial-900: #0A0A2E;
  --color-imperial-700: #1A1A6E;
  --color-imperial-500: #2D2DB8;
  --color-imperial-300: #5B5BFF;
  --color-imperial-100: #B0B0FF;

  /* Emerald Gold (primary accent) */
  --color-emerald:      #00D4A0;   /* Bright emerald — CTAs, active states */
  --color-emerald-dim:  #007A5C;   /* Muted emerald */
  --color-emerald-glow: rgba(0,212,160,0.15); /* Glow backdrop */

  /* Warm Gold (secondary accent) */
  --color-gold:         #FFD166;   /* Warm gold — headlines, highlights */
  --color-gold-dim:     #B8922A;   /* Muted gold */
  --color-gold-glow:    rgba(255,209,102,0.12);

  /* 7 Moon Colors (each page section has a corresponding moon hue) */
  --moon-1: #C8B8FF;  /* Section 1: Landing — violet moon */
  --moon-2: #5B5BFF;  /* Section 2: Home — imperial blue */
  --moon-3: #00D4A0;  /* Section 3: Blog — emerald */
  --moon-4: #FFD166;  /* Section 4: FAQs — warm gold */
  --moon-5: #FF8C6B;  /* Section 5: About — coral ember */
  --moon-6: #7FDBFF;  /* Section 6: Partnership — sky */
  --moon-7: #FF6B9D;  /* Section 7: Vote — rose */

  /* Typography */
  --color-text-primary:   #F0EDE8;
  --color-text-secondary: #A09A8E;
  --color-text-muted:     #5C5850;
}
```

### 1.3 Typography

```css
/* Font Stack */
/* Display/Hero: "Cinzel Decorative" (Google Fonts) — Roman serif, mythological gravitas */
/* Heading: "Cinzel" (Google Fonts) — Refined Roman caps */
/* Body: "Crimson Pro" (Google Fonts) — Warm editorial serif */
/* Mono/Accent: "Space Mono" — Technical contrast */
/* UI Labels: "DM Sans" — Clean, modern UI elements */

--font-display:  'Cinzel Decorative', serif;
--font-heading:  'Cinzel', serif;
--font-body:     'Crimson Pro', serif;
--font-mono:     'Space Mono', monospace;
--font-ui:       'DM Sans', sans-serif;
```

### 1.4 Animation Philosophy
- **Bakunawa Scroll System**: SVG serpent path animates its `stroke-dashoffset` as user scrolls — the snake "slithers" through the page vertically.
- **Moon Parallax**: 7 moon orbs float at different z-depths, each tied to a section.
- **Entrance Animations**: Elements fade up + slight blur-in with staggered delays using Framer Motion.
- **Hover States**: Cards get gold/emerald border glow pulses; buttons emit a shimmer sweep.
- **Transition**: Page transitions use a serpent-scale iris wipe.

---

## 2. Technical Architecture

### 2.1 Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2+ |
| Bundler | Turbopack | Built-in |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x + custom config |
| Animation | Framer Motion | 11.x |
| 3D / Canvas | Three.js (via @react-three/fiber) | R3F 8.x |
| CMS (Blog) | Contentlayer + MDX | 0.3.x |
| State | Zustand | 4.x |
| Forms | React Hook Form + Zod | Latest |
| Auth (Vote) | NextAuth.js | 5.x |
| Database (Vote/Partnership) | Supabase (Postgres) | Latest |
| Deployment | Vercel | — |

### 2.2 Project Structure

```
dalan-ai/
├── app/                        # Next.js App Router
│   ├── (marketing)/
│   │   ├── page.tsx            # Landing + Home merged scroll
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog index
│   │   │   └── [slug]/page.tsx # Blog post
│   │   ├── faqs/page.tsx
│   │   ├── about/page.tsx
│   │   ├── partnership/page.tsx
│   │   └── vote/page.tsx
│   ├── api/
│   │   ├── vote/route.ts
│   │   └── partnership/route.ts
│   ├── layout.tsx              # Root layout w/ Bakunawa canvas layer
│   └── globals.css
│
├── components/
│   ├── bakunawa/
│   │   ├── BakunawaCanvas.tsx  # Three.js/SVG main serpent
│   │   ├── MoonOrb.tsx         # Animated moon component
│   │   ├── MoonConstellation.tsx # 7-moon array display
│   │   └── ScrollSerpent.tsx   # Scroll-linked SVG path
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SectionTransition.tsx
│   ├── sections/
│   │   ├── LandingHero.tsx
│   │   ├── HomeSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── PartnershipSection.tsx
│   │   └── VoteSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── GlowText.tsx
│       ├── MoonTag.tsx
│       └── SerpentDivider.tsx
│
├── lib/
│   ├── bakunawa-path.ts        # SVG path math for serpent
│   ├── moon-config.ts          # 7-moon section mapping
│   └── supabase.ts
│
├── content/
│   └── blog/                   # MDX blog posts
│
├── public/
│   ├── bakunawa/               # SVG/sprite assets
│   └── fonts/
│
├── styles/
│   └── tokens.css
│
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. Design System — Component Specifications

### 3.1 Global Layout Layer

The root `layout.tsx` renders a **fixed full-viewport canvas layer** (`z-index: -1`) that contains:
- The Bakunawa SVG/Three.js scene (always present)
- Floating moon orbs keyed to scroll position
- Subtle noise texture overlay (`opacity: 0.03`)
- A radial vignette on all four edges

```tsx
// app/layout.tsx (conceptual)
export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-void text-text-primary">
        <BakunawaCanvas />          {/* Fixed background layer */}
        <MoonConstellation />       {/* Fixed floating orbs */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 3.2 Navbar

**Behavior:** Starts fully transparent over the hero. After 80px scroll: glassmorphic dark bar appears (`backdrop-blur-md bg-black/40 border-b border-imperial-700/30`).

**Layout:** Logo left | Nav links center | CTA right

**Logo:** "DALAN" in Cinzel Decorative gold + ".AI" in Space Mono emerald + small Bakunawa glyph SVG

**Nav Links:** Landing · Home · Blog · FAQs · About · Partnership · Vote

**Active state:** A small moon orb floats below the active link, color matching the moon of that section.

**Mobile:** Hamburger menu with a full-screen overlay; Bakunawa tail animation closes/opens the menu.

### 3.3 Bakunawa Canvas (Core Visual)

**Implementation:** SVG-based for scroll performance. Three.js optional for the hero 3D moment.

```
Design Spec:
- 2000px tall SVG path runs down the center-left of the page
- Path curves organically around section content
- stroke: gradient from --color-imperial-300 → --color-emerald
- stroke-width: 2px with glow filter (feGaussianBlur + feComposite)
- stroke-dasharray = total path length
- stroke-dashoffset = totalLength - (scrollProgress * totalLength)
- Serpent HEAD: illustrated SVG at path start; scales from 0→1 when above fold
- Serpent TAIL: fades in at page bottom near footer
- Scales: decorative diamond shapes at path intervals, each scale illuminates when its section enters viewport
```

### 3.4 Moon Orbs (7 Moons)

Each moon is a `<MoonOrb />` component:
- 60–120px diameter circle
- Radial gradient fill (center bright, edge dark rim)
- Outer glow using `box-shadow` multi-layer
- Slow rotation animation (20–40s loop) with surface texture SVG overlay
- Positioned absolutely or fixed at prescribed coordinates
- On scroll: the current section's moon "swells" to 1.3x scale and brightens; others dim to 0.3 opacity

**Moon–Section Mapping:**

| Moon # | Color Token | Section | Meaning |
|--------|------------|---------|---------|
| 1 | `--moon-1` violet | Landing | Awakening |
| 2 | `--moon-2` imperial | Home | Discovery |
| 3 | `--moon-3` emerald | Blog | Knowledge |
| 4 | `--moon-4` gold | FAQs | Clarity |
| 5 | `--moon-5` coral | About | Origins |
| 6 | `--moon-6` sky | Partnership | Alliance |
| 7 | `--moon-7` rose | Vote | Ascension |

---

## 4. Page Specifications

---

### 4.1 LANDING PAGE (`/`)

**Narrative Role:** "The Bakunawa awakens."

**Layout:**
```
[ FULL VIEWPORT HERO ]
  ↳ Centered text block — asymmetric grid
  ↳ Bakunawa head emerges from bottom of viewport on load
  ↳ 7 moons orbit the hero text in a loose ellipse
  ↳ CTA: "Begin the Journey" (emerald ghost button) | "Explore Platform" (gold solid)
  ↳ Scroll indicator: animated serpent scale bouncing down

BACKGROUND:
  ↳ Absolute black
  ↳ Deep nebula radial gradient behind headline (imperial blue/void)
  ↳ Particle system: 200 slow-drifting dust motes
```

**Content:**
```
EYEBROW: [Cinzel, emerald, tracked] "AI-DRIVEN EDUCATION"
HEADLINE: [Cinzel Decorative, 88px, gold] "Dalan.AI"
SUBHEADLINE: [Crimson Pro, 24px, text-secondary]
  "Where the ancient serpent of knowledge meets the future of learning.
   AI-powered education for K–12 and STEM."
TAGLINE: [Space Mono, 12px, muted] "// 7 moons. 1 path. Infinite potential."
```

**Animations:**
- On page load: Bakunawa head rises from bottom edge with `spring()` physics (1.2s)
- Headline: word-by-word fade-up with 0.1s stagger
- Moons: begin orbit animation at `delay: 1.5s`
- Scroll cue: `animate={{ y: [0, 12, 0] }}` loop

---

### 4.2 HOME (`/home` or homepage section below landing)

**Narrative Role:** "The serpent surveys the land — a map of learning."

**Layout:** 3-column feature grid with oversized section number typography

**Content Sections:**
```
1. PLATFORM INTRO
   Title: "The Path of Dalan"
   Body: Brief platform overview — AI-driven, adaptive, Philippine-rooted
   Visual: Animated path diagram connecting K-12 → STEM → AI

2. SUBSECTOR CARDS (2 cards)

   Card A — K to 12
   Icon: Graduation cap morphing into serpent scale (SVG animation)
   Title: "K–12 Intelligence"
   Desc: Personalized learning journeys for elementary through senior high
   Color accent: --moon-2 imperial blue
   Hover: Border illuminates, small moon appears top-right

   Card B — STEM
   Icon: DNA helix / circuit integrated with Bakunawa scales
   Title: "STEM Mastery"
   Desc: AI-powered STEM curriculum with adaptive assessments
   Color accent: --moon-3 emerald
   Hover: Same interaction

3. STATISTICS ROW (animated counters)
   "10,000+ Learners" | "7 Learning Milestones" | "AI-Adaptive Paths" | "98% Engagement"

4. FEATURED VIDEO/DEMO
   Glassmorphic player card with play button (moon glyph replaces standard play icon)
```

**Component: `<FeatureCard />`**
```tsx
interface FeatureCardProps {
  moonColor: string;
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}
// Glass card: bg-deep/60, backdrop-blur-sm
// Border: 1px solid color/20 → hover: 1px solid color/80
// Glow on hover: box-shadow 0 0 40px color/20
```

---

### 4.3 BLOG (`/blog`)

**Narrative Role:** "The scales of the serpent — each scale a story."

**Layout:**
- Hero: Oversized "CHRONICLES" title with Bakunawa scale pattern as background texture
- Featured post: Full-width card, large image area (top 40vh)
- Post grid: Masonry-style, 3 columns desktop / 2 tablet / 1 mobile
- Each card styled as a "serpent scale" — hexagonal or diamond-cut corner clip-path

**Post Card Design:**
```
[ SCALE CLIP IMAGE TOP ]
[ MOON TAG: category ]
[ Title in Cinzel ]
[ Date + Author in DM Sans muted ]
[ Read time indicator: X moon glyphs = X min read ]
[ Hover: entire card tilts 2deg, glow spreads ]
```

**Tags / Categories:**
- AI & Education *(emerald)*
- K–12 Insights *(imperial blue)*
- STEM Innovation *(gold)*
- Platform Updates *(coral)*
- Philippine Education *(rose)*

**MDX Blog Post Page:**
- Full-width header with section moon color
- Bakunawa decorative element in left margin (desktop)
- Reading progress bar at top (thin emerald line)
- Table of contents: floating right sidebar
- End of post: "Next Chronicle" card

---

### 4.4 FAQs (`/faqs`)

**Narrative Role:** "The Bakunawa answers the people's questions — each moon a truth."

**Layout:** Two-column — category sidebar left, accordion content right

**FAQ Categories (each gets a moon color):**
1. About Dalan.AI *(moon-1)*
2. K–12 Programs *(moon-2)*
3. STEM Curriculum *(moon-3)*
4. AI Personalization *(moon-4)*
5. Pricing & Access *(moon-5)*
6. Technical & Platform *(moon-6)*
7. Privacy & Safety *(moon-7)*

**Accordion Design:**
```
CLOSED: [Moon orb tiny] [Question in Cinzel] [+ glyph]
OPEN:   Expands with Framer Motion height animation
        Answer in Crimson Pro 18px
        Border-left: 2px solid active-moon-color
        Background: bg-surface/40
```

**Interaction:** Clicking a category glows that moon in the constellation and filters questions.

---

### 4.5 ABOUT (`/about`)

**Narrative Role:** "The origin of the Bakunawa — where Dalan.AI was born."

**Sections:**

```
1. MANIFESTO (full-bleed)
   "We believe every Filipino learner deserves a path lit by intelligence."
   Background: Bakunawa illustration, full serpent visible for the first time

2. MISSION & VISION
   Split card layout — Mission left (emerald), Vision right (gold)

3. TEAM
   Cards with:
   - Portrait with hexagonal clip (serpent scale shape)
   - Name in Cinzel
   - Role in DM Sans
   - Small moon color indicator per department

4. OUR STORY (timeline)
   Vertical timeline using Bakunawa path as the thread
   Milestone nodes = moon orbs
   Each node: Year | Event title | Brief description

5. VALUES
   7 values, each mapped to one moon:
   Moon 1: Curiosity
   Moon 2: Innovation
   Moon 3: Accessibility
   Moon 4: Excellence
   Moon 5: Roots (Philippine identity)
   Moon 6: Collaboration
   Moon 7: Transformation

6. PHILIPPINE EDUCATION COMMITMENT
   Map visualization of reach + stats
```

---

### 4.6 PARTNERSHIP (`/partnership`)

**Narrative Role:** "The moons align — the Bakunawa calls for allies."

**Sections:**

```
1. HERO
   "Build the Future of Philippine Education With Us"
   Bakunawa outstretching toward viewer (perspective SVG)

2. PARTNERSHIP TIERS
   3 tier cards styled as moon phases:
   
   CRESCENT — Affiliate Partner
   Color: moon-6 sky
   Benefits list
   CTA: "Apply"
   
   HALF MOON — Institutional Partner  
   Color: moon-4 gold
   Benefits list (extended)
   CTA: "Apply" (highlighted)
   
   FULL MOON — Strategic Partner
   Color: moon-1 violet
   Full benefit suite
   CTA: "Contact Us"

3. CURRENT PARTNERS
   Logo grid with hover glow effect

4. PARTNERSHIP APPLICATION FORM
   React Hook Form + Zod validation
   Fields:
   - Organization Name
   - Partnership Type (select)
   - Contact Person + Email
   - Description of interest (textarea)
   - Upload deck (file input)
   Submit → Supabase table → confirmation email via Resend

5. WHY PARTNER WITH US
   Icon grid: Reach, Technology, Co-branding, Research Access
```

---

### 4.7 VOTE (`/vote`)

**Narrative Role:** "The 7th moon — the people choose."

**Concept:** Community voting on upcoming Dalan.AI features, curriculum priorities, and product direction. Users vote once per topic using NextAuth social login.

**Sections:**

```
1. HERO
   "Your Voice Shapes the Path"
   Bakunawa tail swirling around a ballot/moon visual

2. ACTIVE VOTES (cards)
   Each vote card:
   - Moon color by category
   - Question in Cinzel
   - Options as large clickable pills
   - Animated vote bar (Framer Motion width transition)
   - Vote count + % 
   - Lock state if voted (shows your choice illuminated)
   - Deadline countdown timer

3. VOTE AUTHENTICATION
   "Connect to vote" → NextAuth GitHub/Google
   Profile avatar replaces connect button when authenticated

4. PAST RESULTS
   Completed votes with final tallies in a subdued archive grid

5. SUGGEST A VOTE
   Simple form: Submit a question for community consideration
```

**Data Model (Supabase):**
```sql
-- votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  category TEXT NOT NULL,
  moon_color TEXT NOT NULL,
  options JSONB NOT NULL,       -- [{ id, label, count }]
  status TEXT DEFAULT 'active', -- active | closed
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- user_votes table (prevents double voting)
CREATE TABLE user_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,        -- NextAuth user ID
  vote_id UUID REFERENCES votes(id),
  option_id TEXT NOT NULL,
  voted_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, vote_id)
);
```

---

## 5. Routing & Navigation Architecture

```
/ (root)           → Landing Page (hero scroll experience)
/home              → Home overview (or scroll section)
/blog              → Blog index
/blog/[slug]       → Individual post
/faqs              → FAQs
/about             → About
/partnership       → Partnership
/vote              → Vote
/api/vote          → POST vote submission
/api/partnership   → POST partnership form
```

**Scroll-Linked Navigation:**
The Landing Page (`/`) uses a full-page scroll-snap or smooth scroll system where the user can scroll through ALL 7 sections in sequence. The top-level routes also work as direct deep links.

---

## 6. Animation System Specification

### 6.1 Framer Motion Variants Library

```tsx
// lib/motion-variants.ts

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0,212,160,0.1)',
      '0 0 40px rgba(0,212,160,0.3)',
      '0 0 20px rgba(0,212,160,0.1)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const moonOrbit = {
  animate: {
    rotate: 360,
    transition: { duration: 30, repeat: Infinity, ease: 'linear' }
  }
};

export const bakunawaReveal = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1, opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' }
  }
};

export const counterUp = (target: number) => ({
  from: 0, to: target,
  duration: 2,
  ease: 'easeOut'
});
```

### 6.2 Scroll System

```tsx
// Scroll progress tracking (in layout)
const { scrollYProgress } = useScroll();

// Map scroll to Bakunawa path draw
const pathDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

// Map scroll to active section (0–6 for 7 sections)
const activeSection = useTransform(scrollYProgress, 
  [0, 0.143, 0.286, 0.429, 0.571, 0.714, 0.857, 1],
  [0, 1, 2, 3, 4, 5, 6, 6]
);
```

### 6.3 Page Transition

```tsx
// Iris wipe using clip-path
const irisFadeVariants = {
  initial: { clipPath: 'circle(0% at 50% 50%)' },
  animate: { clipPath: 'circle(150% at 50% 50%)', transition: { duration: 0.8 } },
  exit:    { clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.5 } }
};
```

---

## 7. Performance & Accessibility

### 7.1 Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID/INP | < 100ms |
| CLS | < 0.1 |
| TTI | < 3.5s |
| Lighthouse Score | ≥ 90 |

**Strategies:**
- Bakunawa canvas: `will-change: transform`, GPU compositing
- Moon orbs: `transform: translate3d()` only (no layout triggers)
- Images: `next/image` with WebP + AVIF
- Fonts: `font-display: optional` fallback to prevent FOUT
- Three.js: Dynamic import with `ssr: false`, only loaded for hero
- Blog MDX: Static generation at build time via Contentlayer
- Code splitting: Each section lazy-loaded with `React.lazy` + Suspense

### 7.2 Accessibility

- All animations respect `prefers-reduced-motion`
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Keyboard navigation: full tab order, visible focus rings (emerald glow)
- ARIA labels on all icon-only buttons and moon visual elements
- Screen reader text for Bakunawa decorative elements (`aria-hidden="true"`)
- Form validation messages are ARIA live regions

---

## 8. Next.js Configuration

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' }
      }
    }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [/* Supabase storage, CDN */]
  },
  // MDX support
  pageExtensions: ['ts', 'tsx', 'mdx']
};

export default nextConfig;
```

---

## 9. Tailwind Configuration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        abyss: '#080810',
        deep: '#0D0D1A',
        surface: '#12122A',
        imperial: {
          900: '#0A0A2E', 700: '#1A1A6E',
          500: '#2D2DB8', 300: '#5B5BFF', 100: '#B0B0FF'
        },
        emerald: { DEFAULT: '#00D4A0', dim: '#007A5C' },
        gold: { DEFAULT: '#FFD166', dim: '#B8922A' },
        moons: {
          1: '#C8B8FF', 2: '#5B5BFF', 3: '#00D4A0',
          4: '#FFD166', 5: '#FF8C6B', 6: '#7FDBFF', 7: '#FF6B9D'
        }
      },
      fontFamily: {
        display: ['Cinzel Decorative', 'serif'],
        heading: ['Cinzel', 'serif'],
        body: ['Crimson Pro', 'serif'],
        mono: ['Space Mono', 'monospace'],
        ui: ['DM Sans', 'sans-serif']
      },
      animation: {
        'moon-float': 'moonFloat 6s ease-in-out infinite',
        'serpent-glow': 'serpentGlow 3s ease-in-out infinite',
        'scale-shimmer': 'scaleShimmer 2s linear infinite',
      },
      keyframes: {
        moonFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        serpentGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(0,212,160,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(0,212,160,0.7))' }
        }
      },
      backdropBlur: { xs: '2px' },
      screens: {
        '3xl': '1920px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
};

export default config;
```

---

## 10. Implementation Phases

### Phase 1 — Foundation (Week 1–2)
- [ ] Initialize Next.js 14 project with Turbopack
- [ ] Configure TypeScript, Tailwind, ESLint, Prettier
- [ ] Set up design tokens (CSS variables + Tailwind config)
- [ ] Install Google Fonts (Cinzel Decorative, Cinzel, Crimson Pro, Space Mono, DM Sans)
- [ ] Build `Navbar` component (transparent → glass scroll behavior)
- [ ] Build `Footer` component
- [ ] Build `BakunawaCanvas` SVG scaffold (static, no animation yet)
- [ ] Build `MoonOrb` base component
- [ ] Set up Framer Motion, create motion variants library
- [ ] Scaffold all 7 route files with placeholder content

### Phase 2 — Core Pages (Week 3–4)
- [ ] **Landing Hero** — Full animation: Bakunawa rise, moon orbit, headline stagger, particles
- [ ] **Home Section** — Feature cards, subsector cards, statistics counters
- [ ] **About Page** — Manifesto, team cards, timeline with serpent thread, values
- [ ] **FAQs Page** — Accordion with moon category filter system
- [ ] Implement scroll-linked Bakunawa path animation
- [ ] Implement 7-moon section tracking and active moon behavior

### Phase 3 — Content & Dynamic (Week 5–6)
- [ ] **Blog** — Set up Contentlayer + MDX pipeline
- [ ] Blog index with masonry grid and scale-shaped cards
- [ ] Individual blog post template
- [ ] **Partnership Page** — Tier cards, partner logos, application form
- [ ] Set up Supabase, connect partnership form submission
- [ ] **Vote Page** — Vote cards with live bars, authentication with NextAuth

### Phase 4 — Polish & Performance (Week 7–8)
- [ ] Page transitions (iris wipe)
- [ ] Mobile responsive pass — all 7 pages
- [ ] Reduced-motion accessibility audit
- [ ] Performance audit — Lighthouse optimization pass
- [ ] SEO: `metadata` objects for all routes, Open Graph images
- [ ] Cross-browser testing (Chrome, Safari, Firefox, mobile)
- [ ] Final QA pass

---

## 11. SEO & Metadata

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: 'Dalan.AI', template: '%s | Dalan.AI' },
  description: 'AI-driven education for K–12 and STEM. Where Philippine mythology meets the future of learning.',
  keywords: ['AI education', 'K-12 Philippines', 'STEM learning', 'adaptive education'],
  openGraph: {
    siteName: 'Dalan.AI',
    type: 'website',
    images: [{ url: '/og-bakunawa.png', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' },
  themeColor: '#000000'
};
```

---

## 12. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth (Vote)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Email (Partnership confirmations)
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
```

---

## 13. Design Deliverables Checklist

| Asset | Format | Notes |
|-------|--------|-------|
| Bakunawa SVG (full body) | SVG | Scalable, segmented for animation |
| 7 Moon SVG textures | SVG | Each moon unique surface pattern |
| Bakunawa scale pattern | SVG/CSS | Repeating background texture |
| Serpent divider | SVG | Reusable between sections |
| Logo lockup | SVG | Full, icon-only, dark/light |
| OG image | PNG 1200×630 | Bakunawa on black |
| Favicon set | ICO/PNG/SVG | Moon glyph or Bakunawa head |
| Blog post card default image | WebP | Fallback when no cover provided |

---

## 14. Key Design Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Black background | Maximizes contrast for glow effects; mythological void aesthetic |
| Cinzel Decorative for display | Roman serif with gold = ancient gravitas + prestige |
| Crimson Pro for body | Warm serif matches Philippine cultural warmth, highly readable |
| SVG Bakunawa (not 3D) | Better scroll performance; more consistent cross-device |
| 7 moons as section indicators | Natural navigation metaphor; ties storytelling to UX |
| Framer Motion over CSS-only | Complex path animations and physics need JS control |
| Contentlayer for blog | Type-safe MDX, zero runtime cost, Vercel compatible |
| Supabase over Firebase | SQL for vote counting prevents race conditions |
| NextAuth social login for Vote | Low friction; deters bots; no password management |

---

*EPD Version 1.0.0 — Dalan.AI | Senior SE + UI Design Lead*  
*For questions, ping the product team before sprint kickoff.*
