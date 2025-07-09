import { SignupForm } from "@/components/forms/signup";

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 bg-[#171717]">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="relative bg-[#262626] h-full w-full flex items-center justify-center rounded-l-2xl">
                <img
                    src="/signup-image.svg"
                    alt="Image"
                    className="max-w-3xl h-auto dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}