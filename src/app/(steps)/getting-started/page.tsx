import { ProfileSetupForm } from "@/components/steps/profileSetup";
import { CurrentProfile } from "@/lib/currentProfile"
import { redirect } from "next/navigation";

export default async function ProfileSetup() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/signup")
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full text-white">
            <ProfileSetupForm profile={profile} />
        </div>
    )
}