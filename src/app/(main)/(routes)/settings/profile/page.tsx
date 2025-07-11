import { DeleteAccount } from "@/components/Delete-account";
import { ProfileUpdateForm } from "@/components/forms/profile-update-form";

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <ProfileUpdateForm />
            <DeleteAccount />
        </div>
    )
}