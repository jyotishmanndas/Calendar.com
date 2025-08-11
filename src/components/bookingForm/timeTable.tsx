import { prisma } from "@/lib/db";
import { format, addMinutes, parse } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface TimeTableProps {
    selectedDate: Date;
    username: string;
}

export async function TimeTable({ selectedDate, username }: TimeTableProps) {
    const weekday = format(selectedDate, "EEEE");

    const data = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            events: {
                select: {
                    title: true,
                    duration: true,
                    availability: {
                        select: {
                            dayavailabilities: {
                                select: {
                                    fromTime: true,
                                    tillTime: true,
                                    id: true,
                                    days: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!data) {
        return <p>No data found for {username}</p>;
    };

    const event = data.events[0];
    const eventDuration = event.duration;

    const dayAvailability = event.availability?.dayavailabilities.find(
        availability => availability.days === weekday
    );

    if (!dayAvailability) {
        return <p>No availability for this day</p>;
    };

    function generateTimeSlots(from: string, till: string, duration: number) {
        const slots: string[] = [];
        const start = parse(from, "HH:mm", selectedDate);
        const end = parse(till, "HH:mm", selectedDate);

        let current = start;
        while (current < end) {
            slots.push(format(current, "hh:mm a"));
            current = addMinutes(current, duration);
        }
        return slots;
    };

    const slots = generateTimeSlots(dayAvailability.fromTime, dayAvailability.tillTime, eventDuration)

    return (
        <div className="flex flex-col gap-2">
            <p className=" text-base text-muted font-semibold flex items-center gap-2">
                {format(selectedDate, "EEE")}
                <span className="text-sm text-muted-foreground">{format(selectedDate, "d")}</span>
            </p>

            <ScrollArea className="px-4">
                <div className="mt-3 max-h-[350px]">
                    {slots.length > 0 && (
                        slots.map((slot, idx) => (
                            <Link href="/" key={idx}>
                                <Button variant="custom" className="w-full text-white mb-2 border-neutral-700">{slot}</Button>
                            </Link>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}