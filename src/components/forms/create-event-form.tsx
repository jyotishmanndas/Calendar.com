"use client"

import z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/zod";
import { videoCall } from "@/generated/prisma";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function CreateEventForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            url: "",
            description: "",
            duration: 15,
            videoCallProvider: videoCall.GoogleMeet
        },
    });

    async function onSubmit(values: z.infer<typeof eventSchema>) {
        try {
            setLoading(true)
            const res = await axios.post("/api/createEvent", values);
            form.reset();
            router.refresh();
            router.push(`/event-types/${res.data.id}?tabName=setup`)
            toast.success("event create successfully")

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Quick chat" {...field} className="border-neutral-700 focus:border-white text-white font-medium rounded-xl " />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Quick chat" {...field} className="border-neutral-700 focus:border-white text-white font-medium rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="A quick video metting" {...field} className="border-neutral-700 focus:border-white text-white font-medium rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Duration</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="border-neutral-700 focus:border-white text-white font-medium rounded-xl"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="videoCallProvider"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormLabel className="text-white">Video Call Provider</FormLabel>
                                    <FormControl>
                                        <SelectTrigger className="w-full border-neutral-500 text-white">
                                            <SelectValue placeholder="video call" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(videoCall).map((video) => (
                                            <SelectItem key={video} value={video}>
                                                {video}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" variant="secondary" className="rounded-xl flex ml-auto">
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Continue
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}