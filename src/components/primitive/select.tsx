import { Select as BaseSelect } from "@base-ui/react/select";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import Icon, { IconCatalog } from "./icon";

// --- PROPS & TYPES ---

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	items: SelectOption[];
	value: string;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	onValueChange: (value: string | null) => void;
};

// --- COMPONENT DEFINITION ---

function Select({
	items,
	value,
	className,
	disabled = false,
	placeholder = "Select an option",
	onValueChange,
}: SelectProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		trigger: cn(
			"border-border bg-background text-foreground",
			"flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 text-sm",
			"focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"data-popup-open:ring-ring data-popup-open:ring-2",
			className,
		),
		value: "truncate text-left",
		icon: "text-muted-foreground size-4 shrink-0",
		positioner: "z-100 outline-none",
		popup: cn(
			"border-border bg-popover text-popover-foreground",
			"max-h-80 min-w-(--anchor-width) overflow-auto rounded-md border p-1 shadow-lg",
			"transition-all duration-150",
			"data-open:scale-100 data-open:opacity-100",
			"data-closed:scale-95 data-closed:opacity-0",
			"data-starting-style:scale-95 data-starting-style:opacity-0",
		),
		item: cn(
			"relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
			"data-highlighted:bg-accent data-highlighted:text-accent-foreground",
			"data-disabled:pointer-events-none data-disabled:opacity-50",
		),
		itemIndicator: "text-primary size-4",
		itemIndicatorWrap: "ml-auto flex size-4 items-center justify-center",
		itemText: "truncate",
	};

	return (
		<BaseSelect.Root
			items={items}
			value={value}
			disabled={disabled}
			onValueChange={onValueChange}
		>
			<BaseSelect.Trigger className={classes.trigger}>
				<BaseSelect.Value className={classes.value}>
					{(selected: string) => {
						const match = items.find((item) => item.value === selected);
						return match ? match.label : placeholder;
					}}
				</BaseSelect.Value>
				<BaseSelect.Icon className={classes.icon}>
					<Icon name={IconCatalog.CHEVRON_DOWN} />
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
			<BaseSelect.Portal>
				<BaseSelect.Positioner
					className={classes.positioner}
					sideOffset={6}
				>
					<BaseSelect.Popup className={classes.popup}>
						{items.map((item) => (
							<BaseSelect.Item
								key={item.value}
								value={item.value}
								className={classes.item}
							>
								<BaseSelect.ItemText className={classes.itemText}>{item.label}</BaseSelect.ItemText>
								<span className={classes.itemIndicatorWrap}>
									<BaseSelect.ItemIndicator className={classes.itemIndicator}>
										<Icon name={IconCatalog.CHECK} />
									</BaseSelect.ItemIndicator>
								</span>
							</BaseSelect.Item>
						))}
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
}

export default Select;

export type { SelectOption };
