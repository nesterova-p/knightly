export function calculateStreak(habit) {
    if (!habit.completedDays || habit.completedDays.length === 0) {
        return 0;
    }

    if (habit.isTask) {
        return habit.completedDays.length > 0 ? 1 : 0;
    }

    // Get scheduled days for this habit
    if (!habit.frequency || !habit.frequency[0] || !habit.frequency[0].days) {
        return 0;
    }

    const scheduledDays = habit.frequency[0].days
        .filter(d => d.isSelected)
        .map(d => d.name);

    if (scheduledDays.length === 0) {
        return 0;
    }

    // Sort completed days by date (newest first)
    const sortedDates = habit.completedDays
        .map(day => day.date)
        .sort((a, b) => new Date(b) - new Date(a));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const dayOfWeekMap = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Find the most recent scheduled day (including today)
    let lastScheduledDate = new Date(today);
    for (let i = 0; i < 7; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dayOfWeek = dayOfWeekMap[checkDate.getDay()];

        if (scheduledDays.includes(dayOfWeek)) {
            lastScheduledDate = checkDate;
            break;
        }
    }

    const lastScheduledStr = lastScheduledDate.toISOString().split('T')[0];

    // If the last scheduled day wasn't completed, streak is 0
    if (!sortedDates.includes(lastScheduledStr)) {
        return 0;
    }

    // Count streak backwards from the last scheduled date
    let streak = 0;
    let currentDate = new Date(lastScheduledDate);

    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayOfWeek = dayOfWeekMap[currentDate.getDay()];

        if (scheduledDays.includes(dayOfWeek)) {
            if (sortedDates.includes(dateStr)) {
                streak++;
            } else {
                // Streak broken
                break;
            }
        }

        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);

        // Stop if we've gone too far back (e.g., 1 year)
        if (currentDate < new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)) {
            break;
        }
    }

    return streak;
}

export function calculateCurrentStreak(habit) {
    if (!habit || !habit.completedDays || habit.completedDays.length === 0) {
        return 0;
    }

    if (habit.isTask || (habit.frequency && habit.frequency[0]?.type === "Once")) {
        const streak = habit.completedDays.length > 0 ? 1 : 0;
        return streak;
    }

    if (!habit.frequency || !habit.frequency[0] || !habit.frequency[0].days) {
        return 0;
    }

    const scheduledDays = habit.frequency[0].days.filter(d => d.isSelected);
    if (scheduledDays.length === 0) {
        return 0;
    }

    const completedDates = habit.completedDays
        .map(day => day.date)
        .sort((a, b) => new Date(b) - new Date(a));

    if (completedDates.length === 0) {
        return 0;
    }

    const dayNameMap = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let streak = 0;

    let currentDate = new Date(completedDates[0]);
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayOfWeek = dayNameMap[currentDate.getDay()];

        const wasScheduled = scheduledDays.some(day => day.name === dayOfWeek);

        if (wasScheduled) {
            const wasCompleted = completedDates.includes(dateStr);

            if (wasCompleted) {
                streak++;
            } else {
                break; // Streak broken
            }
        } else {
            console.log(`Day ${dateStr} (${dayOfWeek}): not scheduled - continuing`);
        }

        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}

export function calculateTotalPerfectDays(allHabits) {
    if (!allHabits || allHabits.length === 0) {
        return 0;
    }

    const dateCounts = {};
    const dateExpectedCounts = {};

    // Get all unique dates from all habits
    const allDates = new Set();
    allHabits.forEach(habit => {
        if (habit.completedDays) {
            habit.completedDays.forEach(day => {
                allDates.add(day.date);
            });
        }
    });

    // For each date, calculate expected and actual completions
    allDates.forEach(dateStr => {
        const date = new Date(dateStr);
        const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()];

        let expectedCount = 0;
        let actualCount = 0;

        allHabits.forEach(habit => {
            if (habit.isTask) {
                // For tasks, check if due on this date
                if (habit.dueDate) {
                    const dueDate = new Date(habit.dueDate).toISOString().split('T')[0];
                    if (dueDate === dateStr) {
                        expectedCount++;
                        if (habit.completedDays && habit.completedDays.some(d => d.date === dateStr)) {
                            actualCount++;
                        }
                    }
                }
            } else {
                // For habits, check if scheduled for this day
                if (habit.frequency && habit.frequency[0] && habit.frequency[0].days) {
                    const isScheduled = habit.frequency[0].days.some(
                        d => d.name === dayOfWeek && d.isSelected
                    );

                    if (isScheduled) {
                        // Check if habit existed on this date
                        const habitCreatedDate = habit.createdAt ? new Date(habit.createdAt) : new Date(dateStr);
                        habitCreatedDate.setHours(0, 0, 0, 0);

                        if (habitCreatedDate <= date) {
                            expectedCount++;
                            if (habit.completedDays && habit.completedDays.some(d => d.date === dateStr)) {
                                actualCount++;
                            }
                        }
                    }
                }
            }
        });

        if (expectedCount > 0) {
            dateExpectedCounts[dateStr] = expectedCount;
            dateCounts[dateStr] = actualCount;
        }
    });

    // Count perfect days
    let perfectDays = 0;
    Object.keys(dateExpectedCounts).forEach(date => {
        if (dateCounts[date] === dateExpectedCounts[date]) {
            perfectDays++;
        }
    });

    return perfectDays;
}

export function calculateCompletionRate(habit) {
    if (!habit) {
        return 0;
    }

    // For tasks
    if (habit.isTask) {
        return (habit.completedDays && habit.completedDays.length > 0) ? 100 : 0;
    }

    // For habits
    if (!habit.frequency || !habit.frequency[0] || !habit.frequency[0].days) {
        return 0;
    }

    const scheduledDays = habit.frequency[0].days.filter(d => d.isSelected);
    if (scheduledDays.length === 0) {
        return 0;
    }

    // Calculate the start date (either creation date or first completion)
    let startDate;
    if (habit.createdAt) {
        startDate = new Date(habit.createdAt);
    } else if (habit.completedDays && habit.completedDays.length > 0) {
        // Use the earliest completion date
        const earliestCompletion = habit.completedDays
            .map(d => new Date(d.date))
            .sort((a, b) => a - b)[0];
        startDate = earliestCompletion;
    } else {
        // Default to today (new habit)
        startDate = new Date();
    }

    startDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't count future days
    if (startDate > today) {
        return 0;
    }

    // Count expected days
    let expectedDays = 0;
    const dayOfWeekMap = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = dayOfWeekMap[d.getDay()];
        if (scheduledDays.some(day => day.name === dayOfWeek)) {
            expectedDays++;
        }
    }

    if (expectedDays === 0) {
        return 0;
    }

    // Count completed days
    const completedCount = habit.completedDays ? habit.completedDays.length : 0;

    // Calculate percentage
    const rate = Math.round((completedCount / expectedDays) * 100);
    return Math.min(rate, 100);
}

