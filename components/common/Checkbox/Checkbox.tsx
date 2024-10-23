import React from "react";
import {Checkbox} from "@nextui-org/react";

interface Props {
    day: string;
    refreshKey: number;
    handleChange: (e:any, value:string) => void
}

export default function App({day, handleChange, refreshKey}: Props) {

    return (
        <Checkbox
            key={refreshKey}
            onChange={(isChecked) => handleChange(isChecked, day)}
        >
            {day}
        </Checkbox>
    );
}

