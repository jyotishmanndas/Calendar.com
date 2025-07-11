import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/events-card/Event-Card";
import { CreateEventModal } from "@/components/modals/create-event-modal";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { LinkIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EventTypes() {

  const profile = await CurrentProfile();
  if (!profile) {
    return redirect("/signup")
  };

  const data = await prisma.user.findUnique({
    where: {
      id: profile.id
    },
    include: {
      events: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  return (
    <>
      <div className=" h-scrren w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-white text-xl font-bold">Event Types</h1>
          <p className="text-neutral-400 text-sm">Create events to share for people to book on your calendar. </p>
        </div>
        <CreateEventModal />
      </div>

      {data?.events.length === 0 ? (
        <EmptyState
          title="Create your first event type"
          description="Event types enable you to share links that show available times on your calendar and allow people to make bookings with you"
          icon={LinkIcon}
        />
      ) : (
        <div className="mt-9">
          {data?.events.map((event) => (
            <div key={event.id}>
              <EventCard
                id={event.id}
                title={event.title}
                description={event.description || ""}
                url={event.url}
                duration={event.duration}
                active={event.active}
                data={data}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}