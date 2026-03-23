// SVG path data for the Bakunawa serpent
// EPD §3.3 — BakunawaCanvas specification

export function generateSerpentPath(height: number): string {
    const amplitude = 120;
    const segments = 12;
    const segmentHeight = height / segments;

    let path = `M ${500 + amplitude} 0`;

    for (let i = 0; i < segments; i++) {
        const y1 = i * segmentHeight + segmentHeight * 0.33;
        const y2 = i * segmentHeight + segmentHeight * 0.66;
        const y3 = (i + 1) * segmentHeight;
        const direction = i % 2 === 0 ? -1 : 1;

        const cx1 = 500 + amplitude * direction;
        const cx2 = 500 - amplitude * direction;

        path += ` C ${cx1} ${y1}, ${cx2} ${y2}, ${500 + amplitude * (i % 2 === 0 ? -1 : 1)} ${y3}`;
    }

    return path;
}

// Scale decoration positions along the path
export function getScalePositions(numScales: number, pathLength: number): number[] {
    const positions: number[] = [];
    for (let i = 0; i < numScales; i++) {
        positions.push((i / (numScales - 1)) * pathLength);
    }
    return positions;
}
