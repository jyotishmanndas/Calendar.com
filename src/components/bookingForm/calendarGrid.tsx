import { useCalendarGrid, useLocale } from 'react-aria';
import { getWeeksInMonth, DateDuration, endOfMonth } from '@internationalized/date';
import { CalendarState } from 'react-stately';
import { DateValue } from '@react-types/calendar';
import { CalendarCell } from './calendarCell';

interface CalendarGridProps {
    state: CalendarState;
    offset?: DateDuration,
    isDateUnavailable?: (date: DateValue) => boolean
}

export function CalendarGrid({ state, offset = {}, isDateUnavailable }: CalendarGridProps) {
    const startDate = state.visibleRange.start.add(offset);
    const endDate = endOfMonth(startDate)
    let { locale } = useLocale();
    let { gridProps, headerProps, weekDays } =
        useCalendarGrid({
            startDate,
            endDate,
            weekdayStyle: "short"
        }, state);

    const weeksInMonth = getWeeksInMonth(startDate, locale)
    return (
        <table {...gridProps} cellPadding={0} className='flex-1'>
            <thead {...headerProps} className='text-sm font-medium'>
                <tr className='text-white'>
                    {weekDays.map((day, index) => <th key={index}>{day}</th>)}
                </tr>
            </thead>
            <tbody className='text-white'>
                {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
                    <tr key={weekIndex}>
                        {state.getDatesInWeek(weekIndex).map((date, i) => (
                            date
                                ? (
                                    <CalendarCell
                                        key={i}
                                        state={state}
                                        date={date}
                                        currentMonth={startDate}
                                        isUnavailable={isDateUnavailable?.(date)}
                                    />
                                )
                                : <td key={i} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}