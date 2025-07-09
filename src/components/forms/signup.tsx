"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/lib/zod";

export function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        mode: "onChange",
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        try {
            setLoading(true)
            const res = await axios.post("/api/signup", values)
            if (!res.data) {
                throw new Error("Signup response is invalid")
            };
            const signInResponse = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            });
            if (signInResponse?.ok) {
                toast.success("Sign up completed successfully")

                form.reset();
                router.push("/getting-started")
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                toast("Email already Registered", {
                    style: {
                        background: 'black',
                    },
                    description: "This email is already in use. Please try signing in or using a different email."
                })
            } else {
                toast("Uh oh! Something went wrong.", {
                    style: {
                        background: 'black',
                    },
                    description: "There was a problem with your request.",
                })
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="gap-6 flex flex-col mt-10">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-semibold text-white text-start leading-7">Create your Cal.com account</h1>
                <p className=" text-md text-start text-muted-foreground font-medium leading-5">
                    Enter your email below to login to your account
                </p>
            </div>
            <div>
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
                                            <Input placeholder="username" {...field} className="border-neutral-700 text-white font-medium rounded-xl" />
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
                                            <Input placeholder="Email" {...field} className="border-neutral-700 text-white font-medium rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Password</FormLabel>/
                                        <div className="relative">
                                            <FormControl>
                                                <Input placeholder="Password" type={showPassword ? "text" : "password"} {...field} className="border-neutral-700 text-white font-medium rounded-xl" />
                                            </FormControl>
                                            <button type="button" className="absolute right-2 top-2 text-gray-500" onClick={() => setShowPassword((prev) => !prev)}>
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full rounded-xl" variant="outline">
                            {loading && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            Create Account
                        </Button>
                    </form>
                </Form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full bg-zinc-700 " />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-[#171717] px-2 text-sm text-muted-foreground">or</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            fill="currentColor"
                        />
                    </svg>
                    Login with GitHub
                </Button>
            </div>
            <div className="text-start text-sm font-medium text-gray-200">
                Already have an account?{" "}
                <Link href={"/signin"} className="underline underline-offset-4" >
                    Sign in
                </Link>
            </div>
        </div>
    )
}