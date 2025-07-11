import { CreateAvailabilityForm } from "../forms/create-availability-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export function CreateAvailabilityModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-xl" variant="secondary">
                    New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[520px] bg-[#0F0F0F] border-none">
                <DialogHeader>
                    <DialogTitle className="text-white font-bold">Add a new schedule</DialogTitle>
                </DialogHeader>

                <CreateAvailabilityForm />
            </DialogContent>
        </Dialog>
    )
}