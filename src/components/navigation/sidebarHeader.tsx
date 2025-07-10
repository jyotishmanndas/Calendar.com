"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SidebarHeader() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-44 mt-4 mb-3 hover:bg-[#404040] rounded-md transition py-2 px-3 text-white text-sm flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src="https://github.com/shadcn.png" className="" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>jyoti</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-neutral-400 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#0F0F0F] text-neutral-400 border-zinc-800">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className="cursor-pointer">My Profile</span>
                        <User className="mr-2 h-5 w-5 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings/profile">
                            <span>Setting</span>
                            <Settings className="mr-2 h-5 w-5 ml-auto" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { }}>
                        <span>Sign Out</span>
                        <LogOut className="mr-2 h-5 w-5 ml-auto" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}