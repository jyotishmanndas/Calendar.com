"use client";

import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { availabilitySchema } from "@/lib/zod";
import axios from "axios";
import { toast } from "sonner";

export function CreateAvailabilityForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof availabilitySchema>>({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {
            name: ""
        },
    });

    async function onSubmit(values: z.infer<typeof availabilitySchema>) {
        try {
            setLoading(true)
            const res = await axios.post(`/api/createAvailability`, values);
            form.reset();
            router.refresh();
            router.push(`/availability/${res.data.id}`);
            toast.success("create successfully")
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        } finally {
            setLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Working Hours" {...field} className="border-neutral-700 focus:border-white text-white font-medium rounded-xl " />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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