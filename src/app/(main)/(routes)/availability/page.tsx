import { AvailableCard } from "@/components/availability-card/available-card";
import { EmptyState } from "@/components/empty-state";
import { CreateAvailabilityModal } from "@/components/modals/create-availability";
import { CurrentProfile } from "@/lib/currentProfile"
import { prisma } from "@/lib/db";
import { Calendar } from "lucide-react";
import { redirect } from "next/navigation";

export default async function () {

    const profile = await CurrentProfile();
    if (!profile) {
        return redirect("/signup")
    }

    const event = await prisma.availability.findMany({
        where: {
            userId: profile.id
        },
        include: {
            dayavailabilities: true
        }
    });

    return (
        <div className="h-full w-full">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <h1 className="text-white text-xl font-bold">Availability</h1>
                    <p className="text-neutral-400 text-sm">Configure times when you are available for bookings.</p>
                </div>
                <CreateAvailabilityModal />
            </div>
            {event.length === 0 ? (
                <EmptyState
                    title="ldjfdofj"
                    description="ndkkddcnkdc"
                    icon={Calendar}
                />
            ) : (
                <AvailableCard data={event} />
            )}
        </div>
    )
}