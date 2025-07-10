import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CreateEventForm } from "../forms/create-event-form";

export function CreateEventModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-xl" variant="secondary">
                    New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[520px] bg-[#0F0F0F] border-none">
                <DialogHeader>
                    <DialogTitle className="text-white">Add a new event type</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Create a new event type for people to book times with.
                    </DialogDescription>
                </DialogHeader>

                <CreateEventForm />
            </DialogContent>
        </Dialog>
    )
}