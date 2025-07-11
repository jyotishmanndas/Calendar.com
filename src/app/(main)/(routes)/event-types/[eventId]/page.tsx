import { EventUpdate } from "@/components/events-card/Event-Update";
import { prisma } from "@/lib/db"
import { useSearchParams } from "next/navigation";

export default async function EventId({ params, searchParams }: { params: { eventId: string }, searchParams: { tabName?: string } }) {

    const tabName = searchParams.tabName

    const event = await prisma.event.findUnique({
        where: {
            id: params.eventId
        }
    });

    return (
        <div>
            {tabName === "setup" && <EventUpdate />}
        </div>
    )
}