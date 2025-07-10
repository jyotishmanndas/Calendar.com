"use client";

import { cn } from "@/lib/utils";
import { Calendar, Clock, LucideLink, LucideProps, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface sidebarLinksProps {
    id: number;
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const sidebarLinks: sidebarLinksProps[] = [
    {
        id: 0,
        name: "Event Types",
        href: "/event-types",
        icon: LucideLink
    },
    {
        id: 1,
        name: "Bookings",
        href: "/bookings",
        icon: Calendar
    },
    {
        id: 2,
        name: "Availability",
        href: "/availability",
        icon: Clock
    },
    {
        id: 3,
        name: "Settings",
        href: "/settings/profile",
        icon: Settings
    },
]


export function SidebarItems() {
    const pathname = usePathname();
    return (
        <>
            {sidebarLinks.map((link) => (
                <Link key={link.id} href={link.href} className={cn(
                    "flex items-center gap-2 text-neutral-400 py-1 px-3 mt-1 rounded-lg transition-all",
                    pathname === link.href ? "text-white bg-[#404040]" : "text-white hover:bg-[#262626]"
                )}>
                   <link.icon className="size-4" />
                    {link.name}
                </Link>
            ))}
        </>
    )
}