import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const profile = await CurrentProfile();
    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    };

    try {
        const { name } = await req.json();
        const availability = await prisma.availability.create({
            data: {
                name,
                userId: profile.id,
                dayavailabilities: {
                    createMany: {
                        data: [
                            { days: "Sunday", fromTime: "08:00", tillTime: "18:00" },
                            { days: "Monday", fromTime: "08:00", tillTime: "18:00" },
                            { days: "Tuesday", fromTime: "08:00", tillTime: "18:00" },
                            { days: "Wednesday", fromTime: "08:00", tillTime: "18:00" },
                            { days: "Thursday", fromTime: "08:00", tillTime: "18:00" },
                            { days: "Friday", fromTime: "08:00", tillTime: "18:00" },
                            { days: "Saturday", fromTime: "08:00", tillTime: "18:00" },
                        ]
                    }
                }
            }
        });
        return NextResponse.json(availability, { status: 200 })
    } catch (error) {
        console.error("Availability creation error:", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}