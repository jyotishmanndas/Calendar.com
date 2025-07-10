import { Sidebar } from "@/components/navigation/sidebar";
import { CurrentProfile } from "@/lib/currentProfile"
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {

    const profile = await CurrentProfile();
    if (!profile) {
        return redirect("/signup")
    };

    const user = await prisma.user.findUnique({
        where: {
            id: profile.id
        },
        select: {
            name: true
        }
    });
    if (!user?.name) {
        return redirect("/getting-started")
    }
    return (
        <div className="min-h-screen w-full flex">
            <Sidebar />
            <main className="flex-1 flex flex-col p-5 ml-[215px]">{children}</main>
        </div>
    )
}