"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { profileSetupSchema } from "@/lib/zod";
import { Loader } from "lucide-react";
import { User } from "@/generated/prisma";
import axios from "axios";

interface ProfileSetupProps {
    profile: User
}

export function ProfileSetupForm({ profile }: ProfileSetupProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof profileSetupSchema>>({
        resolver: zodResolver(profileSetupSchema),
        defaultValues: {
            username: profile.username || "",
            name: "",
        },
    });

    const { isSubmitting } = form.formState

    async function onSubmit(values: z.infer<typeof profileSetupSchema>) {
        try {
            setLoading(true);
            await axios.patch(`/api/steps`, values);
            router.refresh();
            router.push("/getting-started/connect-calendar")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                form.setError("username", {
                    type: "manual",
                    message: "Username already exists",
                });
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <Card className="w-[450px] bg-[#171717] border-neutral-800">
            <CardHeader>
                <CardTitle className="text-white">Welcome to Cal.com!</CardTitle>
                <CardDescription >We just need some basic info to get your profile setup.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Username</FormLabel>
                                        <FormControl>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-2 rounded-l-xl border border-r-0 border-neutral-700 bg-[#171717] text-sm text-muted-foreground">cal.com/</span>
                                                <Input {...field} className="border-neutral-700 focus:border-white focus:ring-white rounded-l-none rounded-r-xl text-white" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border-neutral-700 text-white rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl" variant="outline">
                            {loading ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                                <p>Submit</p>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}