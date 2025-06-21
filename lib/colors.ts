export const colorClasses = {
    pink: {
        border: 'border-pink-500/30',
        text: 'text-pink-400',
        glow: 'text-glow-pink',
        bg: 'bg-pink-500/20',
        bgHover: 'hover:bg-pink-500',
        borderNormal: 'border-pink-500',
        textBtn: 'text-pink-300',
    },
    blue: {
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        glow: 'text-glow-blue',
        bg: 'bg-blue-500/20',
        bgHover: 'hover:bg-blue-500',
        borderNormal: 'border-blue-500',
        textBtn: 'text-blue-300',
    },
    purple: {
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        glow: 'text-glow-purple',
        bg: 'bg-purple-500/20',
        bgHover: 'hover:bg-purple-500',
        borderNormal: 'border-purple-500',
        textBtn: 'text-purple-300',
    },
    cyan: {
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        glow: 'text-glow-cyan',
        bg: 'bg-cyan-500/20',
        bgHover: 'hover:bg-cyan-500',
        borderNormal: 'border-cyan-500',
        textBtn: 'text-cyan-300',
    },
};

export const colorsKeys = Object.keys(colorClasses) as (keyof typeof colorClasses)[];
