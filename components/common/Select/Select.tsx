import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

type Items = {
	key: string;
	label: string;
}

interface Props {
	selectId : number;
	firstValue?: string;
	label: string;
	handleChange: (e:any) => void;
	items: Items[];
	refreshKey: number;
}

export default function App({handleChange, items, selectId, firstValue, label, refreshKey}: Props) {	

	const [ disabledItems, setDisabledItems ] = useState<string[]>([])

	const itemsKey = items.map( item => item.key)
	const selectedIndex = items.findIndex( item => item.key === firstValue)

	useEffect(() => {
		
		if (selectedIndex) {
			const subArray = items.slice(0, selectedIndex + 1)
			const keys = subArray.map( item => item.key)
			setDisabledItems(keys)
		}

	}, [firstValue, items])
	
	return (
		<Select
			required
			items={items}
			key={refreshKey}
			value={firstValue}
			disabledKeys={selectId === 2 && firstValue === '' ? itemsKey : selectId === 2 ? disabledItems : []}
			onChange={(e) => handleChange({e, selectId})}
			placeholder={label}
			className="max-w-xs"
		>
			{(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
		</Select>
	);
}
