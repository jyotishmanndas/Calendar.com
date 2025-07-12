import { AvailabilityForm } from "@/components/forms/availability-Form";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AvailabilityIdPage({ params }: { params: { availabilityId: string } }) {
    const availability = await prisma.availability.findUnique({
        where: { id: params.availabilityId },
        include: { dayavailabilities: true }
    });

    if (!availability) return redirect("/availability");

    return <AvailabilityForm availability={availability} />;
}