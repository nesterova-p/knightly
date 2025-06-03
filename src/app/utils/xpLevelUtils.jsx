export const DIFFICULTY_XP_VALUES = {
    'Trivial': 1,   // Quick daily tasks
    'Easy': 2,      // Standard habits
    'Medium': 5,    // Challenging tasks
    'Hard': 10      // Major achievements
};

export function getXPForDifficulty(difficulty) {
    return DIFFICULTY_XP_VALUES[difficulty] || DIFFICULTY_XP_VALUES['Easy'];
}

/*
 Each level requires more XP than the previous
 level * 15 + (level - 1) * 10
 Level 2=25, Level 3=55, Level 4=100, Level 5=160 ~~~
 */
export function getXPRequiredForLevel(level) {
    if (level <= 1) return 0;
    let totalXP = 0;
    for (let i = 2; i <= level; i++) {
        totalXP += i * 15 + (i - 1) * 10;
    }
    return totalXP;
}

export function calculateLevelFromXP(totalXP) {
    let level = 1;

    while (getXPRequiredForLevel(level + 1) <= totalXP) {
        level++;
    }

    return level;
}

export function calculateLevelProgress(totalXP) {
    const currentLevel = calculateLevelFromXP(totalXP);
    const currentLevelXP = getXPRequiredForLevel(currentLevel);
    const nextLevelXP = getXPRequiredForLevel(currentLevel + 1);

    const progressXP = totalXP - currentLevelXP;
    const neededXP = nextLevelXP - currentLevelXP;
    const progressPercentage = neededXP > 0 ? Math.round((progressXP / neededXP) * 100) : 100;

    return {
        currentLevel,
        totalXP,
        progressXP,
        neededXP,
        nextLevelXP,
        progressPercentage: Math.min(progressPercentage, 100)
    };
}

export function getLevelTitle(level) {
    const titles = {
        1: "Page",
        2: "Keen Page",
        3: "Senior Page",
        4: "Squire",
        5: "Loyal Squire",
        6: "Knight Aspirant",
        7: "Knight",
        8: "Honored Knight",
        9: "Noble Knight",
        10: "Knight Captain",
        11: "Knight Commander",
        12: "Knight Champion",
        13: "Master Knight",
        14: "Knight Protector",
        15: "Grand Knight",
        16: "Knight of Valor",
        17: "Knight of Honor",
        18: "Dragon Knight",
        19: "Paladin",
        20: "Knight Eternal"
    };

    if (level <= 20) {
        return titles[level];
    }

    if (level <= 30) {
        return `Legendary ${titles[20]}`;     // Legendary Knight Eternal
    } else if (level <= 50) {
        return `Mythic ${titles[20]}`;        // Mythic Knight Eternal
    } else {
        return `Immortal ${titles[20]}`;      // Immortal Knight Eternal
    }
}


export function getDifficultyColor(difficulty) {
    const colors = {
        'Trivial': '#6b7280',
        'Easy': '#9ec779',
        'Medium': '#fb7185',
        'Hard': '#881337'
    };

    return colors[difficulty] || colors['Easy'];
}

export function getDifficultyStars(difficulty) {
    const stars = {
        'Trivial': 1,
        'Easy': 2,
        'Medium': 3,
        'Hard': 4
    };

    return stars[difficulty] || 2;
}

export function DifficultyDiamonds({ difficulty, size = 'sm' }) {
    const count = getDifficultyStars(difficulty);
    const color = getDifficultyColor(difficulty);

    const sizeClasses = {
        'sm': 'w-2 h-2',
        'md': 'w-2.5 h-2.5',
        'lg': 'w-3 h-3'
    };

    const diamondClass = sizeClasses[size] || sizeClasses['sm'];

    return (
        <div className="flex gap-0.5 items-center">
            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    className={`${diamondClass} transform rotate-45 ${
                        index < count ? '' : 'opacity-20'
                    }`}
                    style={{
                        backgroundColor: index < count ? color : '#E5E7EB'
                    }}
                />
            ))}
        </div>
    );
}