import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface TooltipActionProps {
    children: React.ReactNode
    label: string
}

export function TooltipAction({ children, label }: TooltipActionProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={30}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black font-semibold" side="top">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}