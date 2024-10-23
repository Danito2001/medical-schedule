import React, { Key } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Item {
	id: number;
	name: string;
	commune: string;
	value: string;
}

interface Props {
	items: Item[];
	label?: string;
	handleSelectionChange: (key: Key | null) => void;
	isLoading: boolean;
}

export default function App({items, handleSelectionChange, label, isLoading}:Props ) {

	const normalizedItems = items.map( item => {
		return {
			key: item.id,
			label: item.name || item.commune || item.value
		}
	})

	return (
		<Autocomplete
			disabled={isLoading}
			selectorIcon={null}
			isClearable
			label={label}
			labelPlacement="outside"
			defaultItems={normalizedItems}
			placeholder={(isLoading) ? "Cargando": "Escribe aqui o selecciona de la lista"}
			className="w-full"
			endContent={<MagnifyingGlassIcon width={20} />}
			onSelectionChange={handleSelectionChange}
		>
			{(item) => (
				<AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
			)}
		</Autocomplete>
	);
}