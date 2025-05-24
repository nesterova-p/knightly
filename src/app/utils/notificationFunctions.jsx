import toast from "react-hot-toast";

export async function requestNotificationPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission === 'denied') {
        toast.error('Notifications are blocked. Please enable them in your browser settings.');
        return false;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            toast.success('Notifications enabled!');
            return true;
        } else {
            toast.error('Notifications permission denied');
            return false;
        }
    } catch (error) {
        toast.error('Error requesting notification permission');
        return false;
    }
}

export function sendNotification(habitName) {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return;
    }

    if (Notification.permission !== 'granted') {
        return;
    }

    const messages = [
        `Your quest awaits: ${habitName}! ⚔️`,
        `Every great adventure begins with a single step: ${habitName}! ⚡`,
        `Adventure calls, hero: ${habitName}! 🏰`,
        `Complete your heroic deed: ${habitName}! 🗡️`
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    try {
        const notification = new Notification("Knightly", {
            body: randomMessage,
            icon: "/favicon.ico",
            tag: habitName,
            requireInteraction: false,
            silent: false
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        setTimeout(() => {
            notification.close();
        }, 5000);
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

function saveScheduledNotification(habitName, scheduledTime, isTask = false) {
    try {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return false;
        }

        const scheduled = JSON.parse(localStorage.getItem('scheduledNotifications') || '[]');
        const newNotification = {
            habitName,
            scheduledTime: scheduledTime.getTime(),
            isTask,
            createdAt: new Date().getTime(),
            id: `${habitName}_${scheduledTime.getTime()}`
        };

        scheduled.push(newNotification);
        localStorage.setItem('scheduledNotifications', JSON.stringify(scheduled));
        return true;
    } catch (error) {
        return false;
    }
}

export function checkScheduledNotifications() {
    try {
        const now = new Date().getTime();
        const scheduled = JSON.parse(localStorage.getItem('scheduledNotifications') || '[]');
        const remaining = [];

        scheduled.forEach(notification => {
            if (notification.scheduledTime <= now + 60000) {
                sendNotification(notification.habitName);
            } else {
                remaining.push(notification);
            }
        });

        if (remaining.length !== scheduled.length) {
            localStorage.setItem('scheduledNotifications', JSON.stringify(remaining));
        }
    } catch (error) {
        console.error('Error checking scheduled notifications:', error);
    }
}

export function scheduleNotifications(notificationTime, days, habitName) {
    if (!notificationTime || !days || days.length === 0 || !habitName) {
        return;
    }

    const daysMap = {
        Su: 0, Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6,
        S: 0, M: 1, T: 2, W: 3, H: 4, F: 5, A: 6
    };

    const normalizedDays = days.map(day => {
        if (day === 'S') {
            const sCount = days.filter(d => d === 'S').length;
            const currentSIndex = days.filter((d, i) => d === 'S' && i <= days.indexOf(day)).length;
            if (sCount > 1) {
                return currentSIndex === 1 ? 'Su' : 'Sa';
            } else {
                return 'Sa';
            }
        }

        const singleLetterMap = {
            'M': 'Mo',
            'T': 'Tu',
            'W': 'We',
            'H': 'Th',
            'F': 'Fr',
            'A': 'Sa'
        };

        return singleLetterMap[day] || day;
    });

    try {
        const [time, modifier] = notificationTime.split(" ");
        const [hours, minutes] = time.split(":").map(Number);

        let adjustedHours = hours;
        if (modifier === "PM" && hours < 12) adjustedHours += 12;
        if (modifier === "AM" && hours === 12) adjustedHours = 0;

        const now = new Date();
        const nowDay = now.getDay();

        normalizedDays.forEach((day) => {
            const targetDay = daysMap[day];
            if (targetDay === undefined) return;

            let diff = targetDay - nowDay;

            if (diff < 0 || (diff === 0 && (now.getHours() > adjustedHours ||
                (now.getHours() === adjustedHours && now.getMinutes() >= minutes)))) {
                diff += 7;
            }

            const targetDate = new Date(now);
            targetDate.setDate(now.getDate() + diff);
            targetDate.setHours(adjustedHours);
            targetDate.setMinutes(minutes);
            targetDate.setSeconds(0);
            targetDate.setMilliseconds(0);

            saveScheduledNotification(habitName, targetDate, false);

            const timeout = targetDate.getTime() - now.getTime();
            if (timeout > 0 && timeout < 24 * 60 * 60 * 1000) {
                setTimeout(() => {
                    sendNotification(habitName);
                }, timeout);
            }
        });
    } catch (error) {
        console.error('Error scheduling notifications:', error);
    }
}

export function scheduleTaskNotification(notificationTime, dueDate, taskName) {
    if (!notificationTime || !dueDate || !taskName) {
        return;
    }

    try {
        const [time, modifier] = notificationTime.split(" ");
        const [hours, minutes] = time.split(":").map(Number);

        let adjustedHours = hours;
        if (modifier === "PM" && hours < 12) adjustedHours += 12;
        if (modifier === "AM" && hours === 12) adjustedHours = 0;

        const taskDueDate = new Date(dueDate);
        taskDueDate.setHours(adjustedHours);
        taskDueDate.setMinutes(minutes);
        taskDueDate.setSeconds(0);
        taskDueDate.setMilliseconds(0);

        const now = new Date();
        const timeout = taskDueDate.getTime() - now.getTime();

        if (timeout > 0) {
            saveScheduledNotification(taskName, taskDueDate, true);

            if (timeout < 24 * 60 * 60 * 1000) {
                setTimeout(() => {
                    sendNotification(taskName);
                }, timeout);
            }
        }
    } catch (error) {
        console.error('Error scheduling task notification:', error);
    }
}