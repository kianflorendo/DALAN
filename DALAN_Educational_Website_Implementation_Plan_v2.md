# DALAN — Educational Platform Implementation Plan v2
**Project:** Dalan Educational Platform · Axon Enjin  
**Stack:** Next.js 15 (Turbopack) · TypeScript · Tailwind CSS v4 · Framer Motion · Supabase · Gemini API  
**Architecture:** Monorepo (Turborepo) — `apps/landing` + `apps/app` deployed simultaneously on Vercel  
**Geographic Focus:** Philippines (Pilot) → ASEAN  
**Brand Position:** Gamified RAG Study Ecosystem — bridging the education-to-employment delta  
**Inspiration:** DataCamp (interactive learning + career tracks) + own portfolio engine + live competitions

---

## 🏗️ Monorepo Architecture (from previous session)

This plan lives inside `apps/app/` of the monorepo. The landing site (`apps/landing/`) has CTA buttons that link here.

```
dalan-project/                     ← single GitHub repo
├── apps/
│   ├── landing/                   ← existing marketing site (dalan.ph)
│   │   └── ...                    ← CTA buttons → app.dalan.ph
│   └── app/                       ← THIS PLAN (app.dalan.ph)
│       ├── app/                   ← Next.js App Router
│       ├── components/
│       ├── lib/
│       ├── hooks/
│       ├── stores/
│       └── types/
├── packages/
│   ├── ui/                        ← shared Button, Card, Badge, etc.
│   ├── config/                    ← shared Tailwind config, tsconfig
│   └── lib/                       ← shared Supabase client, Gemini calls
├── package.json                   ← npm workspaces root
├── turbo.json
└── vercel.json                    ← deploys both apps on one git push
```

### How the landing links to the app

```tsx
// apps/landing/components/hero/HeroSection.tsx
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'

<a href={`${APP_URL}/delta`}>
  <button>Calculate My Skills Delta</button>
</a>
<a href={`${APP_URL}/learn`}>
  <button>Go to the Platform</button>
</a>
```

### Local dev

```bash
# from repo root — runs both apps simultaneously
turbo run dev
# landing → localhost:3000
# app     → localhost:3001
```

---

## 🎨 Design System & Color Palette

```css
/* apps/app/app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Bebas+Neue&display=swap');

:root {
  --dalan-black:    #080B10;
  --dalan-navy:     #0D1421;
  --dalan-surface:  #121A2B;
  --dalan-border:   #1E2D45;
  --dalan-electric: #0EA5E9;
  --dalan-glow:     #38BDF8;
  --dalan-gold:     #F59E0B;
  --dalan-emerald:  #10B981;
  --dalan-crimson:  #EF4444;
  --dalan-indigo:   #6366F1;
  --dalan-text:     #F0F6FF;
  --dalan-muted:    #8BA3C4;
}
```

### Typography
- **Display:** `Syne` — geometric, forward-looking
- **Body / UI:** `DM Sans` — readable, warm
- **Code:** `JetBrains Mono` — reinforces the technical identity
- **Stats:** `Bebas Neue` — bold metrics

---

## 📋 Full Feature List — What Dalan Does (DataCamp-Inspired + Dalan-Unique)

---

### PILLAR 1 — Skills Delta Engine (Dalan-unique, no competitor has this)

#### Feature 1.1 — Delta Calculator
The flagship feature. Upload a university syllabus → get a precise, ranked list of missing skills mapped against live ASEAN job postings.

**How it works:**
1. Student uploads syllabus PDF or pastes text
2. Gemini `text-embedding-004` converts it to a 1536-dim vector stored in Supabase pgvector
3. A parallel pipeline has already ingested 4,000+ live ASEAN job postings as vectors
4. `pgvector` cosine similarity search finds the exact mathematical distance between what the syllabus teaches and what jobs demand
5. The delta — the gap — is retrieved and fed to Gemini to generate ranked bridge modules

```typescript
// apps/app/app/api/delta/route.ts
export async function POST(req: Request) {
  const { syllabusText, degree } = await req.json()
  const embed = await genai.getGenerativeModel({ model: 'text-embedding-004' })
  const { embedding } = await embed.embedContent(syllabusText)
  const { data: syllabus } = await supabase
    .from('syllabi')
    .insert({ content_text: syllabusText, degree, embedding: embedding.values })
    .select().single()
  const { data: gaps } = await supabase
    .rpc('calculate_delta', { syllabus_id: syllabus.id })
  return Response.json({ gaps, syllabusId: syllabus.id })
}
```

**UI components:**
- `SyllabusUploader.tsx` — drag-drop PDF or paste, degree selector
- `DeltaLoadingState.tsx` — animated scanning progress ("cross-referencing 4,280 ASEAN jobs...")
- `DeltaVisualizer.tsx` — Recharts RadarChart (syllabus coverage vs market demand vs the gap)
- `GapBreakdown.tsx` — ranked list of missing skills with job counts and severity color coding

---

#### Feature 1.2 — Curriculum Time Machine
A three-column diff view showing what a skill looks like in: 2015 syllabus (CHED CMO 25) vs 2026 industry standard vs 2026 ASEAN job demand. Makes the problem visceral.

```typescript
// apps/app/components/edu/CurriculumTimeMachine.tsx
// Three side-by-side panels with syntax-highlighted diffs
// Powered by: shiki for code highlighting, framer-motion for transitions
```

---

#### Feature 1.3 — Live Market Pulse Widget
Real-time counter widget showing job market movement: "React Developer jobs added today in PH: +47", "Most demanded skill this week: Kubernetes (+23%)", "Your delta score improved: 67% → 71%". Updates every 24 hours from job scraper cron job.

---

### PILLAR 2 — Interactive Learning (DataCamp-Inspired)

DataCamp's core mechanic is hands-on, browser-based coding exercises that feel more like a game than a lecture. Dalan adopts and extends this.

#### Feature 2.1 — Career Tracks (DataCamp's top feature, adapted for PH)
Pre-built learning paths mapped to real ASEAN job titles — not generic "Python Developer" but "BPO Data Analyst", "GCash Backend Engineer", "Accenture React Developer". Each track is a curated sequence of bridge modules.

```
apps/app/app/(edu)/tracks/
├── page.tsx               ← Track catalog grid
└── [trackSlug]/
    ├── page.tsx           ← Track overview (syllabus, jobs, XP total)
    └── [moduleId]/
        └── page.tsx       ← Individual lesson with interactive challenge
```

**Tracks included at launch:**
- React / Next.js Frontend Developer (Philippines)
- Cloud-Native Backend (AWS / GCP Southeast Asia)
- AI/ML Engineer for ASEAN Startups
- Data Analyst for BPO & Enterprise PH
- DevOps & Platform Engineer

#### Feature 2.2 — Interactive Code Challenges (DataCamp's core loop)
Every bridge module ends with a live coding challenge in the browser. No external IDE needed.

**Implementation using Monaco Editor (same engine as VS Code):**

```bash
npm install @monaco-editor/react
```

```typescript
// apps/app/components/edu/CodeChallenge.tsx
import Editor from '@monaco-editor/react'

export function CodeChallenge({ challenge, onComplete }) {
  const [code, setCode] = useState(challenge.starterCode)
  const [result, setResult] = useState<'idle'|'pass'|'fail'>('idle')

  async function runCode() {
    // Send to Gemini for evaluation against the RAG-grounded solution
    const res = await fetch('/api/evaluate-code', {
      method: 'POST',
      body: JSON.stringify({ code, expectedSkill: challenge.skill, context: challenge.context })
    })
    const { passed, feedback } = await res.json()
    setResult(passed ? 'pass' : 'fail')
    if (passed) onComplete(challenge.xpReward)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Editor
        height="320px"
        defaultLanguage="typescript"
        value={code}
        onChange={setCode}
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />
      <div className="challenge-panel">
        <p>{challenge.prompt}</p>
        <button onClick={runCode}>Run Code</button>
        {result === 'pass' && <XPAnimation xp={challenge.xpReward} />}
      </div>
    </div>
  )
}
```

#### Feature 2.3 — Guided Practice Mode vs Free Mode (DataCamp pattern)
- **Guided:** step-by-step hints available, lower XP reward
- **Free:** no hints, full XP + bonus badge on first attempt
- **Solution review:** after passing, see Gemini's ideal solution with annotations

#### Feature 2.4 — Video + Code Dual Panel (DataCamp's layout)
Bridge modules have a left panel (explanation text or short embedded video) and a right panel (interactive code editor). The explanation updates as the user progresses through sub-steps.

```typescript
// apps/app/app/(edu)/learn/[moduleId]/page.tsx
// Left: markdown explanation rendered with next-mdx-remote
// Right: Monaco editor with challenge
// Bottom: console output + test results
```

#### Feature 2.5 — AI Hint System (Dalan-unique)
Unlike DataCamp's static hints, Dalan's hints are RAG-grounded and context-aware. When a student is stuck:
1. Gemini reads their current code attempt
2. Cross-references against the expected skill delta
3. Generates a targeted hint that doesn't give away the answer but pushes them toward the gap concept

```typescript
// apps/app/app/api/hint/route.ts
export async function POST(req: Request) {
  const { currentCode, challenge, studentSyllabusContext } = await req.json()
  const hint = await generateHint({ currentCode, challenge, studentSyllabusContext })
  return Response.json({ hint })
}
```

---

### PILLAR 3 — Own Portfolio Engine (Dalan-unique)

This is the biggest differentiator from DataCamp. DataCamp gives certificates. Dalan gives proof.

#### Feature 3.1 — Auto-Generated Portfolio Page
Every student gets a public portfolio page at `app.dalan.ph/u/[username]` that auto-populates as they complete bridge modules.

```
apps/app/app/u/[username]/
└── page.tsx     ← public portfolio page
```

**Portfolio page sections:**
- **Delta Score Card** — before/after delta visualization (was 81% gap, now 34%)
- **Skills Proven** — tag cloud of every skill earned through completed challenges (not just watched)
- **Code Gallery** — actual code challenges the student passed, displayed as syntax-highlighted snippets with timestamps
- **Verified by Dalan badge** — a cryptographically signed skills claim (stored in Supabase, verifiable by employers)
- **Job Match** — "You now match 73% of React Developer roles in Manila"
- **GitHub Integration** — every passed challenge auto-creates a GitHub Gist; portfolio links to all of them

#### Feature 3.2 — Agentic Portfolio Generation
When a student passes a code challenge, an agentic flow runs automatically:

```typescript
// apps/app/lib/portfolio/auto-generate.ts
export async function onChallengePass(userId: string, challenge: Challenge, code: string) {
  // 1. Gemini formats the code into a clean portfolio entry with comments
  const formatted = await formatForPortfolio(code, challenge)

  // 2. Push to GitHub Gist via GitHub API
  const gistUrl = await createGist({
    description: `Dalan: ${challenge.skill} — Bridge Module`,
    filename: `${challenge.skill.toLowerCase().replace(/\s+/g, '-')}.ts`,
    content: formatted.annotatedCode
  })

  // 3. Store in Supabase portfolio_entries
  await supabase.from('portfolio_entries').insert({
    user_id: userId,
    skill: challenge.skill,
    challenge_code: formatted.annotatedCode,
    github_gist_url: gistUrl,
    module_id: challenge.moduleId
  })

  // 4. Recalculate job match percentages
  await recalculateJobMatches(userId)
}
```

#### Feature 3.3 — PDF Resume Export
One-click export of the Dalan portfolio as a formatted PDF resume:

```bash
npm install @react-pdf/renderer
```

```typescript
// apps/app/components/portfolio/ResumePDF.tsx
import { Document, Page, Text, View } from '@react-pdf/renderer'

export function DalanResume({ user, portfolioEntries, deltaScore }) {
  return (
    <Document>
      <Page>
        <View>
          <Text>{user.name} — Dalan Verified Portfolio</Text>
          <Text>Delta Score: {deltaScore}% gap bridged</Text>
          {portfolioEntries.map(entry => (
            <View key={entry.id}>
              <Text>{entry.skill}</Text>
              <Text>{entry.github_gist_url}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
```

#### Feature 3.4 — Employer-Verified Skills Badge
Employers on the platform can click "Verify" on a student's portfolio skill, adding a checkmark that increases the student's trust score. This creates a two-sided marketplace loop.

---

### PILLAR 4 — Competitions (Dalan-unique)

No EdTech competitor in the Philippines has live, timed coding competitions. This is the viral growth engine.

#### Feature 4.1 — Weekly Delta Sprints
Time-boxed 48-hour challenges where students race to bridge as many gap skills as possible. Leaderboard updates live. Top 3 win badges + employer spotlight.

```
apps/app/app/(edu)/competitions/
├── page.tsx              ← competitions hub (active, upcoming, past)
├── [competitionId]/
│   ├── page.tsx          ← competition detail + live leaderboard
│   └── challenge/
│       └── page.tsx      ← locked challenge (unlocks at start time)
```

```typescript
// Supabase schema for competitions
CREATE TABLE competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  skill_focus text[],           -- e.g. ['Kubernetes', 'React', 'LLM']
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  prize_description text,
  status text DEFAULT 'upcoming' -- upcoming | active | ended
);

CREATE TABLE competition_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions,
  user_id uuid REFERENCES auth.users,
  code text NOT NULL,
  score int DEFAULT 0,
  submitted_at timestamptz DEFAULT now()
);
```

#### Feature 4.2 — Live Leaderboard with Real-Time Updates
Competition leaderboard updates in real-time using Supabase Realtime subscriptions:

```typescript
// apps/app/hooks/useCompetitionLeaderboard.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useCompetitionLeaderboard(competitionId: string) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const supabase = createClient()
    // Initial load
    supabase
      .from('competition_submissions')
      .select('*, profiles(username, avatar_url)')
      .eq('competition_id', competitionId)
      .order('score', { ascending: false })
      .then(({ data }) => setEntries(data ?? []))

    // Real-time subscription — leaderboard updates live as submissions come in
    const channel = supabase
      .channel(`competition-${competitionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'competition_submissions',
        filter: `competition_id=eq.${competitionId}`
      }, (payload) => {
        setEntries(prev => [...prev, payload.new].sort((a, b) => b.score - a.score))
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [competitionId])

  return entries
}
```

#### Feature 4.3 — Cosmos 2025 Integration (March 24 special event)
A dedicated competition page for the live demo at Cosmos 2025. Students scan a QR code, upload their syllabus live, and see their delta calculated in real-time on a public display screen.

```typescript
// apps/app/app/(edu)/competitions/cosmos-2025/page.tsx
// Special event page:
// - QR code entry (no login required for demo)
// - Anonymous delta calculation
// - Live public feed of "students who just calculated their delta"
// - CTA to voting page at the end
```

#### Feature 4.4 — University vs University Challenges
Institutions can sponsor challenges. PUP vs DLSU vs UMAK — aggregate delta scores compared across universities. Creates institutional FOMO and drives B2G adoption.

```typescript
CREATE TABLE university_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_a text NOT NULL,
  university_b text NOT NULL,
  metric text DEFAULT 'delta_bridged', -- delta_bridged | modules_completed | streak_days
  starts_at timestamptz,
  ends_at timestamptz
);
```

#### Feature 4.5 — Achievement Badges & Trophies
Gamification layer on top of competitions:

| Badge | Trigger | Visual |
|---|---|---|
| Delta Pioneer | First syllabus uploaded | Blue star |
| Gap Slayer | Delta reduced by 10% | Red sword |
| Speed Coder | Code challenge passed in <5 min | Gold lightning |
| Streak Lord | 30-day streak | Fire crown |
| Competition Champion | Top 3 in weekly sprint | Trophy |
| Cosmos 2025 Survivor | Attended live demo | Special event badge |
| Portfolio Builder | 10 gists pushed to GitHub | Green folder |
| Employer Ready | Job match >70% | Briefcase |

---

### PILLAR 5 — Gamification System (DataCamp-Inspired, Extended)

#### Feature 5.1 — XP & Leveling System

```typescript
// apps/app/stores/userProgress.ts (Zustand)
interface UserProgress {
  xp: number
  level: number           // computed from XP thresholds
  streak: number          // days in a row
  lastActivity: Date
  deltaScore: number      // 0-100, % gap remaining
  completedModules: string[]
  badges: Badge[]
  portfolioItems: number
  competitionWins: number
}

// XP thresholds → levels
const LEVELS = [
  { level: 1, label: 'Freshman',           minXP: 0     },
  { level: 2, label: 'Sophomore',          minXP: 100   },
  { level: 3, label: 'Junior Developer',   minXP: 500   },
  { level: 4, label: 'Senior Candidate',   minXP: 1500  },
  { level: 5, label: 'Delta Cleared',      minXP: 4000  },
  { level: 6, label: 'Employer Ready',     minXP: 8000  },
  { level: 7, label: 'Axon Elite',         minXP: 15000 },
]

// XP sources
// Bridge module completed:     +50 XP
// Challenge first-attempt win: +25 XP bonus
// Streak day maintained:       +10 XP
// Competition top 10:          +200 XP
// Portfolio item pushed:       +30 XP
// Employer verification:       +100 XP
```

#### Feature 5.2 — Daily Streak System (Duolingo pattern)
- Maintained by completing at least one module per day
- Streak counter in sidebar with fire animation
- "Streak Freeze" consumable (earned by reaching level 3, allows one missed day)
- Push notification via Supabase Edge Functions if streak at risk after 20 hours

#### Feature 5.3 — Skill Tree Visual (DataCamp's learning path map)
Interactive SVG skill tree showing unlocked vs locked skills, with prerequisite chains visualized as node connections.

```bash
npm install reactflow
```

```typescript
// apps/app/components/edu/SkillTree.tsx
import ReactFlow, { Node, Edge } from 'reactflow'

// Each node = a skill area
// Edge = prerequisite relationship
// Color = locked (gray) / available (blue) / completed (green)
// Clicking a node opens the bridge module
```

---

### PILLAR 6 — Leaderboard & Community

#### Feature 6.1 — Multi-Dimension Leaderboard
Tabs: This Week / All Time / By University / Philippines / ASEAN  
Ranked by: Delta Bridged % (not just XP — DataCamp ranks by completion, Dalan ranks by gap closure)

#### Feature 6.2 — Public Profile + Follow System
Students can follow each other's portfolios. Public profiles show delta score, skills proven, competition history.

#### Feature 6.3 — Employer Talent Discovery Feed
Employers subscribe to see a ranked feed of students who have proven specific skills. Students opt-in. This is the B2B revenue stream.

---

### PILLAR 7 — Institutions Dashboard (B2B/B2G)

#### Feature 7.1 — OBE Compliance Dashboard
Universities see aggregate delta scores across their student body, per subject, per semester. Proves CHED compliance with real data.

#### Feature 7.2 — Curriculum Audit Report
Auto-generated PDF report showing which subjects are most misaligned with the job market. Updated quarterly as job data refreshes.

#### Feature 7.3 — Student Progress Tracking
Faculty can see individual student delta scores (with student consent). Identifies at-risk students before they graduate with unemployable skills.

---

## 🗂️ Full File Structure — `apps/app/`

```
apps/app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                          ← redirect to /learn if logged in, else /delta
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (edu)/
│   │   ├── layout.tsx                    ← sidebar + nav shell
│   │   ├── learn/
│   │   │   ├── page.tsx                  ← dashboard (today's modules, streak, delta)
│   │   │   └── [moduleId]/page.tsx       ← module detail + code challenge
│   │   ├── delta/
│   │   │   └── page.tsx                  ← delta calculator
│   │   ├── tracks/
│   │   │   ├── page.tsx                  ← career track catalog
│   │   │   └── [trackSlug]/
│   │   │       ├── page.tsx              ← track overview
│   │   │       └── [moduleId]/page.tsx   ← lesson within track
│   │   ├── competitions/
│   │   │   ├── page.tsx                  ← competitions hub
│   │   │   ├── cosmos-2025/page.tsx      ← special event page
│   │   │   └── [competitionId]/
│   │   │       ├── page.tsx              ← competition + live leaderboard
│   │   │       └── challenge/page.tsx    ← timed challenge
│   │   ├── portfolio/
│   │   │   └── page.tsx                  ← own portfolio (private view)
│   │   ├── leaderboard/
│   │   │   └── page.tsx
│   │   └── jobs/
│   │       └── page.tsx                  ← ASEAN jobs matched to proven skills
│   ├── u/
│   │   └── [username]/page.tsx           ← PUBLIC portfolio (employers see this)
│   ├── institutions/
│   │   └── page.tsx                      ← B2B landing
│   └── api/
│       ├── delta/route.ts
│       ├── modules/route.ts
│       ├── hint/route.ts
│       ├── evaluate-code/route.ts
│       ├── portfolio/auto-generate/route.ts
│       ├── competitions/route.ts
│       └── jobs/scrape/route.ts
│
├── components/
│   ├── ui/                               ← imported from packages/ui
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── edu/
│   │   ├── DeltaVisualizer.tsx           ← radar chart
│   │   ├── CurriculumTimeMachine.tsx     ← 3-column diff
│   │   ├── CodeChallenge.tsx             ← Monaco editor + Gemini eval
│   │   ├── SkillTree.tsx                 ← ReactFlow skill map
│   │   ├── BridgeModuleCard.tsx
│   │   ├── StreakTracker.tsx
│   │   ├── XPBar.tsx
│   │   ├── SyllabusUploader.tsx
│   │   ├── MarketPulse.tsx
│   │   ├── HintPanel.tsx
│   │   └── AchievementToast.tsx
│   ├── portfolio/
│   │   ├── PortfolioPage.tsx             ← public-facing portfolio
│   │   ├── CodeGallery.tsx
│   │   ├── SkillTagCloud.tsx
│   │   ├── DeltaBeforeAfter.tsx
│   │   └── ResumePDF.tsx
│   ├── competitions/
│   │   ├── CompetitionCard.tsx
│   │   ├── LiveLeaderboard.tsx           ← Supabase Realtime
│   │   ├── CountdownTimer.tsx
│   │   ├── CosmosLiveFeed.tsx            ← special event
│   │   └── BadgeShelf.tsx
│   └── institutions/
│       └── OBEDashboard.tsx
│
├── lib/
│   ├── gemini/
│   │   ├── embeddings.ts
│   │   ├── rag.ts
│   │   ├── generate-module.ts
│   │   ├── evaluate-code.ts              ← AI code grader
│   │   └── generate-hint.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── vector/
│   │   └── delta-search.ts
│   ├── portfolio/
│   │   ├── auto-generate.ts
│   │   └── github-gist.ts
│   └── jobs/
│       └── scraper.ts
│
├── hooks/
│   ├── useStreak.ts
│   ├── useDelta.ts
│   ├── usePortfolio.ts
│   ├── useCompetitionLeaderboard.ts     ← Supabase Realtime
│   └── useAchievements.ts
│
├── stores/
│   ├── userProgress.ts                  ← Zustand (XP, streak, level)
│   └── competitionState.ts
│
└── types/
    ├── delta.ts
    ├── module.ts
    ├── portfolio.ts
    ├── competition.ts
    └── achievement.ts
```

---

## 🗄️ Supabase Database Schema

```sql
-- USERS & PROFILES
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE NOT NULL,
  full_name text,
  university text,
  degree text,
  avatar_url text,
  github_username text,
  xp int DEFAULT 0,
  streak int DEFAULT 0,
  last_activity date,
  delta_score float DEFAULT 100,  -- starts at 100% gap, goes to 0%
  is_public bool DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- SYLLABI
CREATE TABLE syllabi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  degree text NOT NULL,
  subject text,
  content_text text NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- JOB POSTINGS
CREATE TABLE job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text,
  location text,
  country text DEFAULT 'PH',
  skills_required text[],
  embedding vector(1536),
  scraped_at timestamptz DEFAULT now()
);

-- CAREER TRACKS
CREATE TABLE tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  target_job_title text,
  skill_areas text[],
  total_modules int,
  total_xp int,
  difficulty text CHECK (difficulty IN ('beginner','intermediate','advanced'))
);

-- BRIDGE MODULES
CREATE TABLE bridge_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid REFERENCES tracks,
  skill_gap text NOT NULL,
  title text NOT NULL,
  explanation_md text,
  code_challenge jsonb,    -- { prompt, starterCode, solution, hints[], testCases[] }
  xp_reward int DEFAULT 50,
  order_index int,
  created_at timestamptz DEFAULT now()
);

-- USER PROGRESS
CREATE TABLE user_module_progress (
  user_id uuid REFERENCES auth.users,
  module_id uuid REFERENCES bridge_modules,
  status text CHECK (status IN ('locked','available','in_progress','completed')),
  attempts int DEFAULT 0,
  best_code text,
  completed_at timestamptz,
  PRIMARY KEY (user_id, module_id)
);

-- PORTFOLIO ENTRIES
CREATE TABLE portfolio_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  module_id uuid REFERENCES bridge_modules,
  skill text NOT NULL,
  annotated_code text NOT NULL,
  github_gist_url text,
  employer_verified_by uuid,  -- employer user_id if verified
  created_at timestamptz DEFAULT now()
);

-- ACHIEVEMENTS / BADGES
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  badge_key text NOT NULL,      -- 'delta_pioneer', 'gap_slayer', etc.
  earned_at timestamptz DEFAULT now(),
  UNIQUE (user_id, badge_key)
);

-- COMPETITIONS
CREATE TABLE competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  skill_focus text[],
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  prize_description text,
  is_university_vs_university bool DEFAULT false,
  status text DEFAULT 'upcoming'
);

CREATE TABLE competition_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions,
  user_id uuid REFERENCES auth.users,
  code text NOT NULL,
  score int DEFAULT 0,
  rank int,
  submitted_at timestamptz DEFAULT now()
);

-- EMPLOYERS (B2B)
CREATE TABLE employers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_email text,
  subscription_tier text DEFAULT 'free',
  verified bool DEFAULT false
);

CREATE TABLE employer_talent_views (
  employer_id uuid REFERENCES employers,
  user_id uuid REFERENCES auth.users,
  viewed_at timestamptz DEFAULT now()
);

-- VECTOR DELTA FUNCTION
CREATE OR REPLACE FUNCTION calculate_delta(
  syllabus_id uuid,
  match_threshold float DEFAULT 0.4,
  match_count int DEFAULT 20
) RETURNS TABLE(skill_gap text, job_count bigint, similarity float)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    j.title AS skill_gap,
    COUNT(*) AS job_count,
    AVG(1 - (s.embedding <=> j.embedding)) AS similarity
  FROM syllabi s
  CROSS JOIN job_postings j
  WHERE s.id = syllabus_id
  AND (1 - (s.embedding <=> j.embedding)) < match_threshold
  GROUP BY j.title
  ORDER BY similarity ASC, job_count DESC
  LIMIT match_count;
END;
$$;
```

---

## 📦 Full Dependency List

```bash
# Core framework
npm install next@15 react@19 react-dom@19 typescript

# Styling
npm install tailwindcss@4 framer-motion@11 clsx tailwind-merge

# State management
npm install zustand@5

# Database + auth
npm install @supabase/supabase-js@2 @supabase/ssr

# AI
npm install @google/generative-ai

# Code editor (Monaco — same as VS Code)
npm install @monaco-editor/react

# Skill tree visualization
npm install reactflow

# Charts
npm install recharts

# Portfolio PDF export
npm install @react-pdf/renderer

# File upload
npm install react-dropzone

# UI primitives
npm install @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-tooltip @radix-ui/react-tabs lucide-react

# Markdown rendering for module explanations
npm install next-mdx-remote gray-matter

# Code syntax highlighting
npm install shiki

# HTTP
npm install sharp

# Dev
npm install -D @types/node @types/react prettier eslint-config-prettier
```

---

## 🗓️ Updated Development Timeline

| Phase | Days | Focus | Key Deliverable |
|-------|------|-------|-----------------|
| 0 | 1 | Monorepo bootstrap | `turbo run dev` runs both apps, shared packages wired |
| 1 | 1–2 | Design system | Tailwind tokens, fonts, global CSS, shared UI components in `packages/ui` |
| 2 | 3 | Auth + layout shell | Supabase Auth, sidebar nav, route groups |
| 3 | 4 | Delta Calculator | Upload → embed → pgvector search → radar viz |
| 4 | 5–6 | Learn dashboard + bridge modules | XP bar, streak, module cards, CodeChallenge with Monaco |
| 5 | 7 | Career tracks | Track catalog, track detail page, ordered module sequence |
| 6 | 8 | Portfolio engine | Auto-gist push on pass, public `/u/[username]` page, PDF export |
| 7 | 9 | Competitions | Hub page, live leaderboard (Supabase Realtime), Cosmos 2025 special page |
| 8 | 10 | Skill tree + gamification | ReactFlow tree, badges, achievement toasts |
| 9 | 11 | Jobs feed + institutions | ASEAN jobs matched to portfolio, OBE dashboard |
| 10 | 12 | Animations + polish | Framer Motion, confetti on pass, streak animations |
| 11 | 13 | Monorepo deploy | `vercel.json`, both apps live, env vars, domain setup |
| 12 | 14 | QA + Cosmos prep | Load test, QR code landing for live demo |

---

## 📊 Feature Comparison vs Competitors (Updated)

| Feature | Dalan | DataCamp | Coursera | Eskwelabs | ChatGPT |
|---|---|---|---|---|---|
| Syllabus gap analysis | ✅ Core | ❌ | ❌ | ❌ | ❌ |
| Live ASEAN job matching | ✅ Real-time | ❌ | ❌ | ❌ | ❌ |
| Interactive code editor (Monaco) | ✅ | ✅ | Partial | ❌ | ❌ |
| Career tracks | ✅ ASEAN-localized | ✅ Generic | ✅ Generic | ❌ | ❌ |
| Own portfolio page | ✅ Auto-generated | ❌ Certificate only | ❌ Certificate only | ❌ | ❌ |
| GitHub Gist auto-push | ✅ Agentic | ❌ | ❌ | ❌ | ❌ |
| PDF resume export | ✅ | ❌ | ❌ | ❌ | ❌ |
| Employer verification | ✅ | ❌ | ❌ | ❌ | ❌ |
| Live competitions | ✅ | ❌ | ❌ | ❌ | ❌ |
| Real-time leaderboard | ✅ Supabase Realtime | ❌ | ❌ | ❌ | ❌ |
| University vs university | ✅ | ❌ | ❌ | ❌ | ❌ |
| CHED OBE compliance proof | ✅ | ❌ | ❌ | ❌ | ❌ |
| AI hint system (RAG-grounded) | ✅ | Static hints | ❌ | ❌ | ❌ |
| Free for students | ✅ Freemium | Partial | Partial | ❌ | Partial |
| PH-localized content | ✅ Native | ❌ | ❌ | Partial | ❌ |

---

## 🔑 Environment Variables

```bash
# apps/app/.env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
GITHUB_TOKEN=                    # for portfolio auto-gist
NEXT_PUBLIC_APP_URL=https://app.dalan.ph
NEXT_PUBLIC_LANDING_URL=https://dalan.ph

# vercel.json (root) — both projects share same env vars
```

---

## 🔑 Success Metrics

- **250 live delta calculations** at Cosmos 2025 (March 24)
- **1,000 DAU** by May 2026 (Regional Finals)
- **500 public portfolio pages** created by May 2026
- **1 live competition** run before April 2026
- **1 HEI pilot** signed by August 2026
- **3 employer subscribers** by December 2026

---

*Implementation Plan v2.0 — Axon Enjin × Dalan | March 2026*  
*Nyzel Cayat · Kian Angelo Florendo · Carlos Jerico Dela Torre*  
*Monorepo architecture: one GitHub repo, two Vercel deployments, one push ships everything*
