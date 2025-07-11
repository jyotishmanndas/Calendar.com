"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoCall } from "@/generated/prisma";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at leat 2 characters"
    }),
    description: z.string(),
    url: z.string(),
    duration: z.number().int().positive(),
    videoCallProvider: z.nativeEnum(videoCall)
});

export function EventUpdate() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            url: "",
            duration: 15,
            videoCallProvider: videoCall.GoogleMeet
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

    }

    return (
        <div className="flex items-start justify-center pt-10 text-white">
            <Card className="w-[900px] bg-transparent border-neutral-800 flex-1">
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="border-neutral-600 text-neutral-300 rounded-xl focus:border-white focus:ring-white" />
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
                                            <FormLabel className="text-white">Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} className="border-neutral-600 text-neutral-300 rounded-xl h-20 focus:border-white focus:ring-white" />
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
                                                <div className="flex rounded-md">
                                                    <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-neutral-500 bg-[#171717] text-xs text-muted-foreground">cal.com/</span>
                                                    <Input {...field} className="border-neutral-600 focus:border-white focus:ring-white rounded-l-none text-neutral-300 rounded-r-xl" />
                                                </div>
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
                                                    placeholder="shadcn"
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
                                            <Select onValueChange={field.onChange} value={field.value}>
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
                            <Button type="submit" className="flex ml-auto" variant="outline">
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <p>Update</p>
                                )}

                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}