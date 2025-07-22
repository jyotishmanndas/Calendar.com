"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema } from "@/lib/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/userAtom";

// interface ProfileUpdateFormProps {
//     username: string;
//     name: string;
//     email: string;
//     about: string;
// };
// { username, name, email, about }: ProfileUpdateFormProps

export function ProfileUpdateForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const profile = useRecoilValue(userState)

    const form = useForm<z.infer<typeof profileUpdateSchema>>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            username: profile?.username || "",
            name: profile?.name || "",
            email: profile?.email || "",
            about: profile?.about || ""
        },
    });
    // useEffect(() => {
    //     if (profile) {
    //         form.reset({
    //             username: profile.username || "",
    //             name: profile.name || "",
    //             email: profile.email || "",
    //             about: profile.about || ""
    //         });
    //     }
    // }, [profile, form]);
    const { isValid } = form.formState;

    async function onSubmit(values: z.infer<typeof profileUpdateSchema>) {
        try {
            setLoading(true)
            await axios.patch(`/api/profileUpdate`, values);
            form.reset();
            router.refresh();
            toast.success("Settings updated successfully")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                form.setError("username", {
                    type: "manual",
                    message: "Username already exists",
                });
            } else {
                toast.error("Internal error")
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <Card className="w-[750px] bg-transparent border-neutral-800">
            <CardHeader>
                <CardTitle className="text-white text-xl">Profile</CardTitle>
                <CardDescription>Manage settings for your Cal.com profile</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Quick chat" {...field} className="border-neutral-700 focus:border-white text-gray-300 rounded-xl " />
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
                                        <FormLabel className="text-white">Full name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Quick chat" {...field} className="border-neutral-700 focus:border-white text-gray-300 rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Quick chat" {...field} className="border-neutral-700 focus:border-white text-gray-300 rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="about"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">About</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="A quick video metting" {...field} className="h-28 border-neutral-700 focus:border-white text-gray-300 rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={!isValid} type="submit" className="flex ml-auto rounded-xl" variant="outline">
                            {loading && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            Update
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};