import { type AriaButtonProps, useButton } from '@react-aria/button'
import { type CalendarState } from 'react-stately';
import { Button } from '../ui/button';
import { mergeProps } from "@react-aria/utils";
import { useRef } from 'react';
import { useFocusRing } from "@react-aria/focus"

export function CalendarButton(props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right"
}) {
    const ref = useRef(null)
    const { buttonProps } = useButton(props, ref);
    const { focusProps } = useFocusRing();

    return (
        <Button variant="outline" size='icon' ref={ref} disabled={props.isDisabled} {...mergeProps(buttonProps, focusProps)}>
            {props.children}
        </Button>
    )
}