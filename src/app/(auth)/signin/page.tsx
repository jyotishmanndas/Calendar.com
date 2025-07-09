import { SignInForm } from "@/components/forms/signin";

export default function SignInPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center bg-[#0F0F0F]">
            <div className="w-full max-w-sm">
                <SignInForm />
            </div>
        </div>
    )
}
