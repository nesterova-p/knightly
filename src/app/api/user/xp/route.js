import { NextResponse } from "next/server";
import connectToDB from "../../../dataBase/connectToDB";
import User from "../../../models/UserSchema";
import { calculateLevelFromXP } from "../../../utils/xpLevelUtils";


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

        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Calculate current level based on total XP
        const currentLevel = calculateLevelFromXP(user.totalXP || 0);

        return NextResponse.json({
            user: {
                clerkUserId: user.clerkUserId,
                totalXP: user.totalXP || 0,
                level: currentLevel,
                emailAddress: user.emailAddress,
                nickname: user.nickname
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user XP data:", error);
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const { clerkUserId, xpToAdd } = await req.json();

        if (!clerkUserId) {
            return NextResponse.json(
                { error: "clerkUserId is required" },
                { status: 400 }
            );
        }

        if (typeof xpToAdd !== 'number') {
            return NextResponse.json(
                { error: "xpToAdd must be a number" },
                { status: 400 }
            );
        }

        await connectToDB();

        // Find the user
        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Calculate new total XP
        const currentXP = user.totalXP || 0;
        const newTotalXP = Math.max(0, currentXP + xpToAdd); // Prevent negative XP

        // Calculate levels for comparison
        const previousLevel = calculateLevelFromXP(currentXP);
        const newLevel = calculateLevelFromXP(newTotalXP);
        const leveledUp = newLevel > previousLevel;

        // Update user in database
        const updatedUser = await User.findOneAndUpdate(
            { clerkUserId },
            {
                $set: {
                    totalXP: newTotalXP,
                    level: newLevel,
                    lastXPUpdate: new Date()
                }
            },
            {
                new: true,
                upsert: false
            }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "Failed to update user" },
                { status: 500 }
            );
        }

        const responseData = {
            user: {
                clerkUserId: updatedUser.clerkUserId,
                totalXP: updatedUser.totalXP,
                level: newLevel,
                emailAddress: updatedUser.emailAddress,
                nickname: updatedUser.nickname
            },
            xpChange: xpToAdd,
            leveledUp,
            previousLevel,
            newLevel,
            message: `Successfully ${xpToAdd >= 0 ? 'added' : 'removed'} ${Math.abs(xpToAdd)} XP`
        };

        console.log(`XP Update: User ${clerkUserId} ${xpToAdd >= 0 ? 'gained' : 'lost'} ${Math.abs(xpToAdd)} XP. Total: ${newTotalXP} XP, Level: ${newLevel}${leveledUp ? ' (LEVEL UP!)' : ''}`);

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error("Error updating user XP:", error);
        return NextResponse.json(
            { error: "Failed to update user XP" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const { clerkUserId } = await req.json();

        if (!clerkUserId) {
            return NextResponse.json(
                { error: "clerkUserId is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        // Check if user already has XP data
        const existingUser = await User.findOne({ clerkUserId });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Initialize XP data if not already present
        const updatedUser = await User.findOneAndUpdate(
            { clerkUserId },
            {
                $setOnInsert: {
                    totalXP: 0,
                    level: 1,
                    lastXPUpdate: new Date()
                }
            },
            {
                new: true,
                upsert: false
            }
        );

        return NextResponse.json({
            user: {
                clerkUserId: updatedUser.clerkUserId,
                totalXP: updatedUser.totalXP || 0,
                level: updatedUser.level || 1,
                emailAddress: updatedUser.emailAddress,
                nickname: updatedUser.nickname
            },
            message: "XP data initialized successfully"
        }, { status: 201 });

    } catch (error) {
        console.error("Error initializing user XP:", error);
        return NextResponse.json(
            { error: "Failed to initialize XP data" },
            { status: 500 }
        );
    }
}