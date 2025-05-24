import {NextResponse} from "next/server";
import connectToDB from "../../dataBase/connectToDB";
import HabitsCollection from "../../models/HabitSchema";

export async function POST(req){
    try{
        const{
            name,
            icon,
            isTask,
            hasReminder,
            reminderTime,
            dueDate,
            frequency,
            areas,
            completedDays,
            clerkUserId
        } = await req.json();

        if (!name || !clerkUserId) {
            return NextResponse.json(
                { error: "Name and clerkUserId are required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const habit = new HabitsCollection({
            name,
            icon: icon || "faIcons",
            isTask: isTask || false,
            hasReminder: hasReminder || false,
            reminderTime: reminderTime || "08:00 AM",
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
            clerkUserId
        });

        const saveHabit = await habit.save();

        return NextResponse.json({habit: saveHabit});

    }catch(err){
        console.log(err);
        return NextResponse.json(
            { error: "Failed to create habit" },
            { status: 500 }
        );
    }
}
