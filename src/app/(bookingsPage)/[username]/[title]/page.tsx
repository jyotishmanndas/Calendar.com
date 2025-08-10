import { RenderCalendar } from "@/components/bookingForm/rendercalendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { CalendarX2, Clock, Video } from "lucide-react";
import { redirect } from "next/navigation";

export default async function BookingsPage({ params, searchParams }: { params: { username: string, title: string }; searchParams: { date?: string } }) {
    const profile = await CurrentProfile();
    if (!profile) {
        return redirect("/signup");
    };

    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();
    const event = await prisma.event.findFirst({
        where: {
            title: params.title,
            user: { username: params.username },
            active: true
        },
        select: {
            duration: true,
            title: true,
            description: true,
            videoCallProvider: true,
            availability: {
                select: {
                    dayavailabilities: {
                        select: {
                            days: true,
                            fromTime: true,
                            tillTime: true,
                            isActive: true
                        }
                    }
                }
            },
            user: {
                select: {
                    name: true
                }
            }
        }
    });
    if (!event) {
        return redirect("/event-types")
    }
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-[1000px] mx-auto w-full bg-[#171717] border-neutral-700">
                <CardContent className="p-4 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                    <div>
                        <span className="font-semibold text-sm text-neutral-400">{event.user.name}</span>
                        <h1 className="text-xl font-semibold mt-2 text-muted">{event.title}</h1>
                        <div className="flex flex-col mt-4 gap-y-3">
                            <span className="flex items-center gap-x-2 text-muted">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{event.duration}m</span>
                            </span>

                            <span className="flex items-center gap-x-2 text-muted">
                                <CalendarX2 className="w-4 h-4" />
                                <span className="text-sm font-medium">{selectedDate.toDateString()}</span>
                            </span>

                            <span className="flex items-center gap-x-2 text-muted">
                                <Video className="w-4 h-4" />
                                <span className="text-sm font-medium">{event.videoCallProvider}</span>
                            </span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-full w-[0.8px] bg-neutral-700" />

                    <RenderCalendar dayavailabilities={event.availability?.dayavailabilities as any} />
                    
                    <Separator orientation="vertical" className="h-full w-[0.8px] bg-neutral-700" />
                </CardContent>
            </Card>
        </div>
    )
}