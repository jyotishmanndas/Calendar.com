import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria';
import { CalendarState } from 'react-stately';
import { CalendarDate, getLocalTimeZone, isToday, isSameMonth } from '@internationalized/date';
import { cn } from "@/lib/utils";

interface CalendarCellProps {
    state: CalendarState;
    date: CalendarDate;
    currentMonth: CalendarDate,
    isUnavailable?: boolean;
}

export function CalendarCell({ state, date, currentMonth, isUnavailable }: CalendarCellProps) {
    let ref = useRef(null);
    let {
        cellProps,
        buttonProps,
        isSelected,
        isDisabled,
        formattedDate
    } = useCalendarCell({ date }, state, ref);

    const { focusProps, isFocusVisible } = useFocusRing();
    const isDateToday = isToday(date, getLocalTimeZone());
    const isOutSideofMonth = !isSameMonth(currentMonth, date);

    const finallyIsDisabled = isDisabled || isUnavailable

    return (
        <td {...cellProps} className={`py-0.5 px-0.5 realtive ${isFocusVisible ? "z-10" : "z-0"}`}>
            <div {...mergeProps(buttonProps, focusProps)} ref={ref} hidden={isOutSideofMonth} className="size-10 sm:size-14 outline-none group rounded-md">
                <div className={cn(
                    "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
                    finallyIsDisabled ? "text-neutral-400 cursor-not-allowed" : "",
                    isSelected ? "bg-white text-black" : "",

                    !isSelected && !finallyIsDisabled ? "bg-[#404040] hover:border border-white" : ""
                )}>
                    {formattedDate}
                    {isDateToday && (
                        <div className={cn(
                            "absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 rounded-full bg-black ",
                            isSelected && "bg-white"
                        )} />
                    )}
                </div>
            </div>
        </td>
    );
}