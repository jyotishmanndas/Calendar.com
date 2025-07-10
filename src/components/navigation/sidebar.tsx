import { SidebarHeader } from "./sidebarHeader";
import { SidebarItems } from "./sidebarItems";

export function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-[215px] bg-[#171717] overflow-y-auto">
            <div className="flex flex-col h-full gap-2">
                <div className="flex-1 px-3">
                    <SidebarHeader />
                    <SidebarItems />
                </div>
            </div>
        </div>
    )
}