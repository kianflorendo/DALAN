interface MoonTagProps {
    label: string;
    color: string;
    className?: string;
}

export default function MoonTag({ label, color, className = '' }: MoonTagProps) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${className}`}
            style={{
                fontFamily: 'var(--font-ui)',
                color: color,
                backgroundColor: `${color}15`,
                border: `1px solid ${color}30`,
            }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                    backgroundColor: color,
                    boxShadow: `0 0 4px ${color}60`,
                }}
                aria-hidden="true"
            />
            {label}
        </span>
    );
}
