"use client";

import { Availability, dayAvailability } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { format } from "date-fns";

// Expects an array of Availability objects, each with associated dayavailabilities
interface AvailableCardProps {
    data: (Availability & { dayavailabilities: dayAvailability[] })[];
}

// Maps full weekday names to their short forms
const DAY_SHORT_NAMES: Record<string, string> = {
    "Monday": "Mon",
    "Tuesday": "Tue",
    "Wednesday": "Wed",
    "Thursday": "Thu",
    "Friday": "Fri",
    "Saturday": "Sat",
    "Sunday": "Sun",
};

// Defines the order of weekdays for sorting
const WEEKDAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Parses a time string (e.g., "14:30") into a Date object set to today
function parseTimeStringToDate(time: string): Date | null {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

// Groups and formats availabilities by time slot and days
function groupAndFormatAvailabilities(availabilities: dayAvailability[]): string[] {
    // Only include active availabilities
    const activeAvailabilities = availabilities.filter(avail => avail.isActive);

    // Group days by their time slot (e.g., "9:00 AM - 5:00 PM")
    const timeSlotToDays: Record<string, string[]> = {};

    activeAvailabilities.forEach(({ days, fromTime, tillTime }) => {
        const fromDate = parseTimeStringToDate(fromTime);
        const tillDate = parseTimeStringToDate(tillTime);
        if (!fromDate || !tillDate) return; // Skip if time is invalid

        const timeSlot = `${format(fromDate, "h:mm a")} - ${format(tillDate, "h:mm a")}`;
        const dayShort = DAY_SHORT_NAMES[days];
        if (!dayShort) return; // Skip if day is invalid

        if (!timeSlotToDays[timeSlot]) {
            timeSlotToDays[timeSlot] = [];
        }
        timeSlotToDays[timeSlot].push(dayShort);
    });

    // Format the grouped data for display
    const formatted: string[] = [];
    for (const [timeSlot, days] of Object.entries(timeSlotToDays)) {
        if (days.length === 7) {
            // All days covered: show as "Mon-Sun"
            formatted.push(`Mon-Sun ${timeSlot}`);
        } else {
            // Sort days and join with commas
            const sortedDays = days.sort((a, b) => WEEKDAY_ORDER.indexOf(a) - WEEKDAY_ORDER.indexOf(b));
            formatted.push(`${sortedDays.join(", ")} ${timeSlot}`);
        }
    }
    return formatted;
}

export function AvailableCard({ data }: AvailableCardProps) {
    const router = useRouter();

    const handleCardClick = (id: string) => {
        router.push(`/availability/${id}`);
    };

    return (
        <div className="space-y-2 mt-10">
            {data.map((availability) => (
                <Card
                    onClick={() => handleCardClick(availability.id)}
                    className="bg-[#0F0F0F] p-4 border-neutral-800 hover:bg-[#171717] cursor-pointer transition"
                    key={availability.id}
                >
                    <CardTitle className="text-white">
                        {availability.name}
                    </CardTitle>
                    <CardDescription className="text-white mt-2">
                        {groupAndFormatAvailabilities(availability.dayavailabilities).map((slot, idx) => (
                            <p key={idx} className="text-sm text-neutral-400">
                                {slot}
                            </p>
                        ))}
                    </CardDescription>
                </Card>
            ))}
        </div>
    );
}