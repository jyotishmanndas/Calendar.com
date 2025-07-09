import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { CalendarCheck2Icon } from "lucide-react";
import Image from "next/image";

export function CalendarConnect() {
    return (
        <Card className="w-[450px] bg-[#171717] border-neutral-800">
            <CardHeader>
                <CardTitle className="text-white">You are almost done!</CardTitle>
                <CardDescription >We have to now connect your calendar to your account</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                <CalendarCheck2Icon className="w-7 h-7 text-white" />
                <span className="text-white font-semibold">Google Calendar</span>
                </div>
                <Button variant="custom" className="rounded-xl">
                    Connect
                </Button>
            </CardFooter>
        </Card>
    )
}