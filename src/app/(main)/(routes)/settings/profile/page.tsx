import { DeleteAccount } from "@/components/Delete-account";
import { ProfileUpdateForm } from "@/components/forms/profile-update-form";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const profile = await CurrentProfile();
    if (!profile) {
        return redirect("/signup")
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <ProfileUpdateForm
                username={profile.username || ""}
                name={profile.name || ""}
                email={profile.email || ""}
                about={profile.about || ""}
            />
            <DeleteAccount />
        </div>
    )
};