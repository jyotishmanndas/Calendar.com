import { CalendarConnect } from "@/components/steps/connect-calendar";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function ConnectCalendar() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/signup")
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center text-white">
            <CalendarConnect />
        </div>
    )
}