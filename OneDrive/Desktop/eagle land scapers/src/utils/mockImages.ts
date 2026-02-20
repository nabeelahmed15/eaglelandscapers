/**
 * Generates an array of mock image URLs for the frame sequence.
 * In a real scenario, these would be paths to optimized images (e.g., /frames/frame_001.jpg).
 * For now, we use a placeholder service or a repeating pattern.
 */
export const generateMockFrames = (count: number = 100): string[] => {
    const frames: string[] = [];
    // Using a placeholder image service that supports sizing
    // We'll append a query param to trick the browser into treating them as distinct if needed,
    // but ideally we want a real sequence. To simulate a "sequence", we might just return the same
    // image for now, as loading 100 unique placeholder images might be slow/rate-limited.
    // BETTER APPROACH for "logic testing": specific numbered placeholders.

    for (let i = 0; i < count; i++) {
        // We can use a service like via.placeholder.com with text indicating the frame number
        // This allows us to visually verify the "scrubbing" effect.
        frames.push(`https://placehold.co/1920x1080/062C1B/FFFFFF/png?text=Frame+${i + 1}`);
    }
    return frames;
};
