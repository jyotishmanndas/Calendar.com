"use client";

import { cn } from "@/lib/utils";
import { Calendar, ChevronRight, Link } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"

export function EventSidebar() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const tabName = searchParams.get("tabName")

    return (
        <div className="flex flex-col pt-7">
            <div className="w-[280px] h-full p-3">
                <div onClick={() => router.push(`/dashboard/${1}/?tabName=setup`)}
                    className={cn(
                        "px-3 py-1 flex items-center gap-3 text-white cursor-pointer transition-all",
                        tabName === 'setup' ? "bg-[#262626] rounded-lg" : "hover:bg-[#262626] rounded-lg"
                    )}>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div className="font-medium text-sm">Event Setup</div>
                        </div>
                        <div className="text-sm text-start text-gray-400">{2} mins</div>
                    </div>

                    {tabName === 'setup' && <ChevronRight className="w-5 h-5 flex ml-auto" />}
                </div>

                <div onClick={() => router.push(`/dashboard/${1}/?tabName=availability`)}
                    className={cn(
                        "px-3 py-1 flex items-center gap-3 text-white cursor-pointer mt-1 transition-all",
                        tabName === 'availability' ? "bg-[#262626] rounded-lg" : "hover:bg-[#262626] rounded-lg"
                    )}>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div className="font-medium text-sm">Availability</div>
                        </div>
                        <div className="text-sm text-gray-400">working hours</div>
                    </div>

                    {tabName === 'availability' && <ChevronRight className="w-5 h-5 flex ml-auto" />}
                </div>
            </div>
        </div>
    )
}