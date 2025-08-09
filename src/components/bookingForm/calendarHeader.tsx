import { type CalendarState } from 'react-stately';
import { FocusableElement, DOMAttributes } from '@react-types/shared';
import { type AriaButtonProps } from '@react-aria/button';
import { useDateFormatter } from '@react-aria/i18n';
import { VisuallyHidden } from "@react-aria/visually-hidden"
import { CalendarButton } from './calendarButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
    state: CalendarState;
    calendarProps: DOMAttributes<FocusableElement>;
    prevButtonProps: AriaButtonProps<"button">;
    nextButtonProps: AriaButtonProps<"button">;
}

export function CalendarHeader({ state, calendarProps, prevButtonProps, nextButtonProps }: CalendarHeaderProps) {

    const monthDateFormatter = useDateFormatter({
        month: "short",
        year: "numeric",
        timeZone: state.timeZone
    });
    const [monthName, _, year] = monthDateFormatter.formatToParts(state.visibleRange.start.toDate(state.timeZone)).map((part) => part.value);
    return (
        <div className='flex items-center pb-4'>
            <VisuallyHidden>
                <h2>{calendarProps["aria-label"]}</h2>
            </VisuallyHidden>

            <h2 className='font-semibold flex-1 text-white text-lg'>
                {monthName} <span className='text-neutral-400 text-base'>{year}</span>
            </h2>

            <div className='flex items-center gap-2'>
                <CalendarButton {...prevButtonProps}>
                    <ChevronLeft className='w-4 h-4' />
                </CalendarButton>
                <CalendarButton {...nextButtonProps}>
                    <ChevronRight className='w-4 h-4' />
                </CalendarButton>
            </div>
        </div>
    )
}