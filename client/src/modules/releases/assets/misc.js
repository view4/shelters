// Minimal, muted inline glyphs (use currentColor for easy theming)
const SvgBase = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1em" height="1em" aria-hidden role="presentation">
        {children}
    </svg>
);

const LemonGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="6">
            <ellipse cx="50" cy="50" rx="34" ry="24" transform="rotate(-20 50 50)" />
            <path d="M72 28c4 4 8 10 8 22s-4 18-8 22" />
        </g>
    </SvgBase>
);

const WheatGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path d="M50 20v60" />
            <path d="M50 30l-14-8M50 40l14-8M50 50l-14-8M50 60l14-8M50 70l-14-8" />
        </g>
    </SvgBase>
);

const HutGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
            <path d="M14 50L50 22l36 28" />
            <rect x="24" y="48" width="52" height="30" rx="2" />
        </g>
    </SvgBase>
);

const PalmGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path d="M50 32v46" />
            <path d="M50 32c-12-8-22-8-30-2M50 32c12-8 22-8 30-2M50 36c-10-2-18 0-24 6M50 36c10-2 18 0 24 6" />
        </g>
    </SvgBase>
);

const LeafGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 62c26-36 48-36 64-22-12 24-34 34-56 30" />
            <path d="M34 60c10-10 22-16 34-18" />
        </g>
    </SvgBase>
);

const TentGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
            <path d="M10 70L50 24l40 46" />
            <path d="M30 70l20-28 20 28z" />
        </g>
    </SvgBase>
);

const LeafTwoGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 70c22-30 42-34 60-28-8 22-30 34-56 28" />
            <path d="M32 66c10-6 20-12 30-16" />
        </g>
    </SvgBase>
);

const SwirlGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path d="M20 60c0-18 18-30 34-28 16 2 22 20 10 28-8 6-20 2-20-6 0-8 10-10 14-6" />
        </g>
    </SvgBase>
);

const WineGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M34 20h32c2 18-8 28-16 30v16M42 66h16" />
            <path d="M34 20h32" />
        </g>
    </SvgBase>
);

const BambooGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
            <path d="M44 16v68M60 16v68" />
            <path d="M38 28h28M38 44h28M38 60h28" />
        </g>
    </SvgBase>
);

const DesertGlyph = () => (
    <SvgBase>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path d="M10 62c12-6 22-6 32 0 10 6 20 6 48 0" />
            <path d="M16 72c10-4 22-4 30 0 8 4 22 4 38 0" />
        </g>
    </SvgBase>
);