import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface EmptyStateProps {
    title: string
    description: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <div className="flex flex-col items-center justify-center rounded-md h-[400px] w-full border border-dashed border-neutral-700 p-8 text-center animate-in fade-in-50">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#404040]">
                    <Icon className="w-10 h-10 text-neutral-200" />
                </div>

                <h2 className="text-white mt-5 text-xl font-semibold">
                    {title}
                </h2>
                <p className="text-neutral-300 text-sm max-w-md mt-2">{description}</p>
            </div>
        </div>
    )
}