"use client";

import { ArrowLeft, ExternalLink, LinkIcon, Trash } from "lucide-react";
import Link from "next/link";
import { TooltipAction } from "../TooltipAction";
import { Button } from "../ui/button";

export function EventNavbar() {
    return (
        <nav className="h-14 flex items-center justify-between bg-green-400 px-3">
            <div className="flex items-center gap-x-3">
                <Link href={"/event-types"}>
                    <div className="text-white cursor-pointer">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                </Link>
                <div className="text-white text-lg font-semibold">
                    jyotishman
                </div>
            </div>

            <div className="flex items-center gap-x-2">
                <TooltipAction label="Preview">
                    <Link href="/" target="_blank">
                        <Button size="icon">
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </Link>
                </TooltipAction>

                <TooltipAction label="Copy link">
                    <Button size="icon">
                        <LinkIcon className="w-4 h-4" />
                    </Button>
                </TooltipAction>

                <TooltipAction label="Delete">
                    <Button size="icon">
                        <Trash className="w-4 h-4" />
                    </Button>
                </TooltipAction>

                <div>
                    <Button variant="secondary" className="rounded-xl">Save</Button>
                </div>
            </div>
        </nav>
    )
}