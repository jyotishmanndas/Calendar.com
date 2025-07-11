import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {

    const profile = await CurrentProfile();

    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    };

    try {
        const { name, username } = await req.json();
        if (username) {
            const existingUsername = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            if (existingUsername) {
                return new NextResponse("Username already taken", { status: 409 });
            }
        };

        const profileUpdate = await prisma.user.update({
            where: {
                id: profile.id
            },
            data: {
                name,
                username,
                availabilities: {
                    create: {
                        name: "Working Hours",
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
                }
            }
        });
        return NextResponse.json(profileUpdate, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}