"use client";

import { User } from "@/generated/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Ellipsis, ExternalLink, Link, LinkIcon, Pencil, Trash2 } from "lucide-react";
import { TooltipAction } from "../TooltipAction";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

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
    const router = useRouter();
    const handleClick = () => {
        router.push(`/event-types/${id}?tabName=setup`);
    };
    const copyLink = () => {
        const url = `${process.env.NEXT_PUBLIC_URL}/${data.username}/${title}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied!", {
            style: { width: "150px" }
        });
    };

    return (
        <Card onClick={handleClick} className="mt-2 bg-transparent hover:bg-[#171717] border-neutral-800 text-white transition cursor-pointer">
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
                    <Switch defaultChecked={active} onClick={(event) => event.stopPropagation()} className="scale-90" />

                    <TooltipAction label="Preview">
                        <a href={`${data.username}/${title}`} target="_blank">
                            <Button size="icon" variant="custom" onClick={(event) => event.stopPropagation()}>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </a>
                    </TooltipAction>

                    <TooltipAction label="Copy link event">
                        <Button size="icon" variant="custom" onClick={(event) => {
                            event.stopPropagation();
                            copyLink();
                        }}>
                            <LinkIcon className="w-4 h-4" />
                        </Button>
                    </TooltipAction>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none" asChild>
                            <Button size="icon" variant="custom" onClick={(event) => event.stopPropagation()}>
                                <Ellipsis className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-black text-neutral-400 border-zinc-800">
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={(event) => {
                                    event.stopPropagation()
                                    router.push(`/dashboard/${id}?tabName=setup`);
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