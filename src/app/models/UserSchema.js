import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkUserId: {
            type: String,
            unique: true,
            required: true,
            index: true  // Index for faster lookups
        },
        emailAddress: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
            trim: true,
        },


        totalXP: {
            type: Number,
            default: 0,
            min: 0,  // Prevent negative XP
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) && value >= 0;
                },
                message: 'Total XP must be a non-negative integer'
            }
        },

        level: {
            type: Number,
            default: 1,
            min: 1,
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) && value >= 1;
                },
                message: 'Level must be a positive integer starting from 1'
            }
        },

        lastXPUpdate: {
            type: Date,
            default: Date.now,
            index: true
        },

        xpHistory: [{
            amount: {
                type: Number,
                required: true
            },
            source: {
                type: String,
                enum: ['habit_completion', 'task_completion', 'habit_unchecked', 'task_unchecked', 'bonus', 'adjustment'],
                required: true
            },
            habitId: {
                type: String,
                required: false
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],

        achievements: [{
            achievementId: String,
            unlockedAt: {
                type: Date,
                default: Date.now
            },
            progress: {
                type: Number,
                default: 0
            }
        }],

        xpSettings: {
            showLevelUpNotifications: {
                type: Boolean,
                default: true
            },
            showXPGainedNotifications: {
                type: Boolean,
                default: true
            },
            preferredLevelDisplayStyle: {
                type: String,
                enum: ['full', 'compact', 'minimal'],
                default: 'full'
            }
        }
    },
    {
        timestamps: true,

        indexes: [
            { clerkUserId: 1 },
            { totalXP: -1 },  // For leaderboards
            { level: -1 },
            { lastXPUpdate: -1 }
        ]
    }
);

userSchema.pre('save', async function(next) {
    if (this.isModified('totalXP') || this.isModified('level')) {
        try {
            const { calculateLevelFromXP } = await import('../utils/xpLevelUtils.js');

            const calculatedLevel = calculateLevelFromXP(this.totalXP);

            if (this.level !== calculatedLevel) {
                console.log(`Correcting user ${this.clerkUserId} level from ${this.level} to ${calculatedLevel} based on ${this.totalXP} XP`);
                this.level = calculatedLevel;
            }

            if (this.isModified('totalXP')) {
                this.lastXPUpdate = new Date();
            }

        } catch (error) {
            console.error('Error validating user level:', error);
        }
    }

    next();
});

userSchema.methods.addXP = async function(xpAmount, source = 'manual', habitId = null) {
    const previousXP = this.totalXP;
    const previousLevel = this.level;

    this.totalXP = Math.max(0, this.totalXP + xpAmount);

    const { calculateLevelFromXP } = await import('../utils/xpLevelUtils');
    this.level = calculateLevelFromXP(this.totalXP);

    if (this.xpHistory) {
        this.xpHistory.push({
            amount: xpAmount,
            source: source,
            habitId: habitId,
            date: new Date()
        });

        if (this.xpHistory.length > 100) {
            this.xpHistory = this.xpHistory.slice(-100);
        }
    }

    await this.save();

    return {
        previousXP,
        newXP: this.totalXP,
        xpChange: xpAmount,
        previousLevel,
        newLevel: this.level,
        leveledUp: this.level > previousLevel
    };
};

/**
 * Static method to get top users by XP
 */
userSchema.statics.getTopUsers = function(limit = 10) {
    return this.find({})
        .sort({ totalXP: -1, level: -1 })
        .limit(limit)
        .select('nickname totalXP level clerkUserId');
};

/**
 * Virtual property to get user's rank
 */
userSchema.virtual('rank').get(function() {
    // TODO
    return null;
});

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;