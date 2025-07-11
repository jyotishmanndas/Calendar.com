import { EventNavbar } from "@/components/events-card/Event-Navbar";
import { EventSidebar } from "@/components/events-card/Event-Sidebar";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface EventLayoutProps {
    children: React.ReactNode;
    params: {
        eventId: string
    }
}

export default async function EventLayout({ children, params }: EventLayoutProps) {

    const event = await prisma.event.findUnique({
        where: {
            id: params.eventId
        }
    });

    if (!event) {
        return redirect("/event-types")
    }

    return (
        <div className="flex flex-col h-screen">
            <EventNavbar />
            <div className="flex flex-1">
                <EventSidebar />
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}