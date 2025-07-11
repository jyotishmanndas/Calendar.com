import { Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export function DeleteAccountModal() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="py-1 px-3 border border-neutral-700 flex items-center rounded-xl text-red-100 gap-2"><Trash2Icon className="w-4 h-4" />Delete Account</button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0F0F0F] border-none">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white font-semibold">Delete event type?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p> Are you sure you want to delete your Cal.com account?</p>
                        <p> Anyone who you've shared this link with will no longer be able to book using it.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl">Delete my account</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}