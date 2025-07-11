import { DeleteAccountModal } from "./modals/delete-account-modal";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function DeleteAccount() {
    return (
        <Card className="w-[750px] bg-[#0F0F0F] border-neutral-800 mt-5">
            <CardHeader>
                <CardTitle className="text-red-500 text-base">Danger zone</CardTitle>
                <CardDescription className="text-neutral-400 text-sm">Be careful. Account deletion cannot be undone.</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-end py-3 bg-[#171717] rounded-b-xl">
                <DeleteAccountModal />
            </CardFooter>
        </Card>
    )
}