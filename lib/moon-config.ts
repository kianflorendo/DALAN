// 7-Moon Section Configuration
// EPD §3.4 — Each moon maps to a section/page

export interface MoonConfig {
    id: number;
    color: string;
    section: string;
    meaning: string;
    route: string;
}

export const MOON_CONFIGS: MoonConfig[] = [
    { id: 1, color: '#C8B8FF', section: 'Landing', meaning: 'Awakening', route: '/#landing' },
    { id: 2, color: '#5B5BFF', section: 'Home', meaning: 'Discovery', route: '/#home' },
    { id: 3, color: '#00D4A0', section: 'Blog', meaning: 'Knowledge', route: '/#blog' },
    { id: 4, color: '#FFD166', section: 'FAQs', meaning: 'Clarity', route: '/#faqs' },
    { id: 5, color: '#FF8C6B', section: 'About', meaning: 'Origins', route: '/#about' },
    { id: 6, color: '#7FDBFF', section: 'Partnership', meaning: 'Alliance', route: '/#partnership' },
    { id: 7, color: '#FF6B9D', section: 'Vote', meaning: 'Ascension', route: '/#vote' },
];

export const NAV_LINKS = MOON_CONFIGS.map((moon) => ({
    label: moon.section,
    href: moon.route,
    moonColor: moon.color,
    moonId: moon.id,
}));

export function getMoonBySection(section: string): MoonConfig | undefined {
    return MOON_CONFIGS.find((m) => m.section.toLowerCase() === section.toLowerCase());
}

export function getMoonById(id: number): MoonConfig | undefined {
    return MOON_CONFIGS.find((m) => m.id === id);
}
