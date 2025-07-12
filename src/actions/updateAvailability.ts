"use server";

import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAvailability(formData: FormData) {
    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/signup")
    }

    const rawData = Object.fromEntries(formData.entries())

    const availabilityData = Object.keys(rawData).filter((key) => key.startsWith("id-")).map((key) => {
        const id = key.replace("id-", "")

        return {
            id,
            isActive: rawData[`isActive-${id}`] === "on",
            fromTime: rawData[`fromTime-${id}`] as string,
            tillTime: rawData[`tillTime-${id}`] as string,
        }
    })

    try {
        await prisma.$transaction(
            availabilityData.map((item) => prisma.dayAvailability.update({
                where: {
                    id: item.id
                },
                data: {
                    isActive: item.isActive,
                    fromTime: item.fromTime,
                    tillTime: item.tillTime
                }
            }))
        );
    } catch (error) {
        console.log(error);
    }
}