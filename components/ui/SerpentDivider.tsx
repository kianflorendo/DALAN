'use client';

export default function SerpentDivider({ className = '' }: { className?: string }) {
    return (
        <div className={`relative py-6 ${className}`} role="separator" aria-hidden="true">
            <div
                className="h-px"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(91,91,255,0.2) 25%, rgba(0,212,160,0.2) 50%, rgba(255,209,102,0.15) 75%, transparent 100%)' }}
            />
            {/* Center diamond */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                    className="w-2 h-2 rotate-45"
                    style={{
                        background: 'linear-gradient(135deg, #5B5BFF, #00D4A0)',
                        opacity: 0.4,
                        boxShadow: '0 0 12px rgba(0,212,160,0.2)',
                    }}
                />
            </div>
        </div>
    );
}
