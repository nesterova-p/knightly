const mongoose = require("mongoose");
const { Schema } = mongoose;

const FrequencyDaySchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    isSelected: { type: Boolean, required: true }
});

const FrequencySchema = new Schema({
    type: { type: String, required: true },
    days: { type: [FrequencyDaySchema], required: true },
    number: { type: Number, required: true }
});

const AreaSchema = new Schema({
    _id: { type: String, required: false },
    icon: { type: String, required: true },
    name: { type: String, required: true }
});

const CompletedDaySchema = new Schema({
    _id: { type: String, required: false },
    date: { type: String, required: true }
});

const HabitSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    clerkUserId: { type: String, required: true },
    frequency: { type: [FrequencySchema], required: true },
    reminderTime: { type: String },
    hasReminder: { type: Boolean, required: true },
    isTask: { type: Boolean, required: true },
    dueDate: { type: Date, required: true },
    areas: { type: [AreaSchema], required: true, default: [] },
    completedDays: { type: [CompletedDaySchema], required: true, default: [] }
}, { timestamps: true });

const HabitsCollection = mongoose.models.HabitsCollection || mongoose.model("HabitsCollection", HabitSchema);

export default HabitsCollection;