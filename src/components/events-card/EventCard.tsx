"use client";

import { User } from "@/generated/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Ellipsis, ExternalLink, Link, Pencil, Trash2 } from "lucide-react";
import { TooltipAction } from "../TooltipAction";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface EventCardProps {
    id: string;
    title: string;
    description: string;
    url: string;
    duration: number;
    active: boolean;
    data: User
}

export function EventCard({ id, title, description, url, duration, active, data }: EventCardProps) {
    return (
        <Card onClick={() => { }} className="mt-2 bg-transparent hover:bg-[#171717] border-neutral-800 text-white transition cursor-pointer">
            <CardHeader className="p-3">
                <CardTitle className="flex items-center gap-x-1 text-[#D4D4D4]">
                    {title} <span className="text-xs text-neutral-400">/{url}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 flex items-center justify-between">
                <Badge variant="outline" className="bg-[#404040] text-white text-xs flex items-center gap-x-1">
                    <Clock className="w-3 h-3" /> {duration}m
                </Badge>

                <div className="flex items-center gap-x-2">
                    {/* <Switch defaultChecked={active} onClick={(event) => event.stopPropagation()} className="scale-90" /> */}
                    {/* <EventActiveSwitch isActive={active} eventId={id} /> */}

                    <TooltipAction label="Preview">
                        <a href={`${data.username}/${title}`} target="_blank">
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    // router.push(url);
                                }}
                                className="p-[8px] rounded-md border border-neutral-700 text-white hover:bg-neutral-800 transition"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </a>
                    </TooltipAction>

                    <TooltipAction label="Copy link event">
                        <button onClick={(event) => {
                            event.stopPropagation()
                            // copyLink()
                        }} className="p-[8px] rounded-md border border-neutral-700 text-white hover:bg-neutral-800 transition">
                            <Link className="w-4 h-4" />
                        </button>
                    </TooltipAction>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none" asChild>
                            <button onClick={(event) => event.stopPropagation()} className="p-[8px] rounded-md border border-neutral-700 text-white hover:bg-neutral-800 transition">
                                <Ellipsis className="w-4 h-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-black text-neutral-400 border-zinc-800">
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={(event) => {
                                    event.stopPropagation()
                                    // router.push(`/dashboard/${id}?tabName=setup`);
                                }}>
                                    <Pencil className="mr-2 w-4 h-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(event) => event.stopPropagation()}>
                                    <Trash2 className="mr-2 w-4 h-4 text-red-400" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}