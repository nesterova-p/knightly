import { NextResponse } from "next/server";
import connectToDB from "../../dataBase/connectToDB";
import AreasCollection from "../../models/AreasSchema";

export async function POST(req) {
    try {
        const { name, icon, clerkUserId } = await req.json();

        if (!name || !clerkUserId) {
            return NextResponse.json(
                { error: "Name and clerkUserId are required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const existingArea = await AreasCollection.findOne({
            name: name.trim(),
            clerkUserId
        });

        if (existingArea) {
            return NextResponse.json(
                { error: "An area with this name already exists" },
                { status: 400 }
            );
        }

        const area = new AreasCollection({
            name: name.trim(),
            icon: icon || "faIcons",
            clerkUserId
        });

        const savedArea = await area.save();
        return NextResponse.json({ area: savedArea }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Failed to create area" },
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

        let areas = await AreasCollection.find({ clerkUserId }).sort({ createdAt: 1 });

        // If user has no areas
        if (areas.length === 0) {
            const defaultArea = new AreasCollection({
                name: "Adventures",
                icon: "faPlaneDeparture",
                clerkUserId
            });

            const savedArea = await defaultArea.save();
            areas = [savedArea];
        }

        return NextResponse.json({ areas }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch areas" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const areaId = searchParams.get("areaId");

        if (!areaId) {
            return NextResponse.json(
                { message: "Area ID is required" },
                { status: 400 }
            );
        }

        const { name, icon, clerkUserId } = await request.json();

        if (!name || !clerkUserId) {
            return NextResponse.json(
                { message: "Name and clerkUserId are required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const existingArea = await AreasCollection.findOne({
            name: name.trim(),
            clerkUserId,
            _id: { $ne: areaId }
        });

        if (existingArea) {
            return NextResponse.json(
                { message: "An area with this name already exists" },
                { status: 400 }
            );
        }

        const updatedArea = await AreasCollection.findOneAndUpdate(
            { _id: areaId, clerkUserId },
            {
                $set: {
                    name: name.trim(),
                    icon
                }
            },
            { returnDocument: "after" }
        );

        if (!updatedArea) {
            return NextResponse.json(
                { message: "Area not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Area has been updated successfully",
            area: updatedArea.value || updatedArea
        });

    } catch (error) {
        console.error("Error updating area:", error);
        return NextResponse.json(
            { message: "An error occurred while updating the area" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const { areaId } = await req.json();

        if (!areaId) {
            return NextResponse.json(
                { message: "Area ID is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const areaToDelete = await AreasCollection.findOneAndDelete({
            _id: areaId,
        });

        if (!areaToDelete) {
            return NextResponse.json(
                { message: "Area not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Area deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting area:", error);
        return NextResponse.json(
            { message: "Failed to delete area" },
            { status: 500 }
        );
    }
}