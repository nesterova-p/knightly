import { NextResponse } from "next/server";
import connectToDB from "../../dataBase/connectToDB";
import HabitsCollection from "../../models/HabitSchema";

export async function POST(req) {
    try {
        const {
            name,
            icon,
            isTask,
            hasReminder,
            reminderTime,
            dueDate,
            frequency,
            areas,
            completedDays,
            clerkUserId,
            difficulty
        } = await req.json();

        const validDifficulties = ['Trivial', 'Easy', 'Medium', 'Hard'];
        const finalDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'Easy';

        if (!name || !clerkUserId) {
            return NextResponse.json(
                { error: "Name and clerkUserId are required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const existingHabit = await HabitsCollection.findOne({
            name: name.trim(),
            clerkUserId: clerkUserId
        });

        if (existingHabit) {
            return NextResponse.json(
                { error: "A habit with this name already exists" },
                { status: 400 }
            );
        }

        const habit = new HabitsCollection({
            name: name.trim(),
            icon: icon || "faIcons",
            isTask: isTask || false,
            hasReminder: hasReminder || false,
            reminderTime: reminderTime || "",
            dueDate: dueDate ? new Date(dueDate) : new Date(),
            frequency: frequency || [{
                type: "Daily",
                days: [
                    {id: 1, name: "Mo", isSelected: true},
                    {id: 2, name: "Tu", isSelected: false},
                    {id: 3, name: "We", isSelected: false},
                    {id: 4, name: "Th", isSelected: false},
                    {id: 5, name: "Fr", isSelected: false},
                    {id: 6, name: "Sa", isSelected: false},
                    {id: 7, name: "Su", isSelected: false},
                ],
                number: 1
            }],
            areas: areas || [],
            completedDays: completedDays || [],
            clerkUserId,
            difficulty: finalDifficulty
        });

        const savedHabit = await habit.save();

        return NextResponse.json({ habit: savedHabit }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { err: "Failed to create habit" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const clerkUserId = searchParams.get('clerkUserId');

        if (!clerkUserId) {
            return NextResponse.json(
                { error: "clerkUserId is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const habits = await HabitsCollection.find({ clerkUserId }).sort({ createdAt: -1 });

        return NextResponse.json({ habits }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch habits" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const { habitId } = await req.json();

        await connectToDB();

        const habitToDelete = await HabitsCollection.findOneAndDelete({
            _id: habitId,
        });

        if (!habitToDelete) {
            return NextResponse.json({ message: "Habit not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Habit deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const habitId = searchParams.get("habitId");

        if (!habitId) {
            return NextResponse.json(
                { message: "Habit ID is required" },
                { status: 400 }
            );
        }

        const {
            name,
            icon,
            frequency,
            notificationTime,
            isNotificationOn,
            areas,
            completedDays,
            isTask,
            dueDate,
            hasReminder,
            reminderTime,
            clerkUserId,
            difficulty
        } = await request.json();

        const validDifficulties = ['Trivial', 'Easy', 'Medium', 'Hard'];
        const finalDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'Easy';

        if (!name) {
            return NextResponse.json(
                { message: "Habit name is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const existingHabit = await HabitsCollection.findOne({
            name: name.trim(),
            clerkUserId,
            _id: { $ne: habitId }
        });

        if (existingHabit) {
            return NextResponse.json(
                { message: "A habit with this name already exists" },
                { status: 400 }
            );
        }

        const updatedHabit = await HabitsCollection.findOneAndUpdate(
            { _id: habitId, clerkUserId },
            {
                $set: {
                    name: name.trim(),
                    icon,
                    frequency,
                    notificationTime: notificationTime || reminderTime,
                    isNotificationOn: isNotificationOn || hasReminder,
                    areas: areas || [],
                    completedDays: completedDays || [],
                    isTask: isTask || false,
                    dueDate: dueDate ? new Date(dueDate) : new Date(),
                    hasReminder: hasReminder || false,
                    reminderTime: reminderTime || "",
                    difficulty: finalDifficulty
                }
            },
            { returnDocument: "after" }
        );

        if (!updatedHabit) {
            return NextResponse.json(
                { message: "Habit not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Habit has been updated successfully",
            habit: updatedHabit.value || updatedHabit
        });

    } catch (error) {
        console.error("Error updating habit:", error);
        return NextResponse.json(
            { message: "An error occurred while updating the habit" },
            { status: 500 }
        );
    }
}