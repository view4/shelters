
// Color palette for labels - 12 distinct colors
const LABEL_COLORS = [
    'purple',
    'bordered-ocean-blue',
    'grey',
    'purple',
    'bordered-ocean-blue',
    'grey',
    'purple',
    'bordered-ocean-blue',
    'grey',
    'purple',
    'bordered-ocean-blue',
    'grey'
];

// Function to get consistent color based on label name
export const getLabelColor = (labelName) => {
    if (!labelName) return 'purple';

    // Create a simple hash from the label name to get consistent color
    let hash = 0;
    for (let i = 0; i < labelName.length; i++) {
        const char = labelName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Use absolute value and modulo to get index
    const index = Math.abs(hash) % LABEL_COLORS.length;
    return LABEL_COLORS[index];
};
