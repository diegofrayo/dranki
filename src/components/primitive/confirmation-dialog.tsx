import { AlertDialog } from "@base-ui/react/alert-dialog";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import Box from "./box";
import Button, { ButtonSize, ButtonVariant } from "./button";

// --- PROPS & TYPES ---

type ConfirmationDialogProps = {
	description: string;
	open: boolean;
	title: string;
	cancelLabel?: string;
	confirmLabel?: string;
	onCancel?: () => void;
	onConfirm: () => void;
	onOpenChange: (open: boolean) => void;
};

// --- COMPONENT DEFINITION ---

function ConfirmationDialog({
	description,
	open,
	title,
	cancelLabel = "Cancel",
	confirmLabel = "Confirm",
	onCancel,
	onConfirm,
	onOpenChange,
}: ConfirmationDialogProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		backdrop:
			"fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-open:opacity-100 data-closed:opacity-0 data-starting-style:opacity-0",
		popup: [
			"fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-4",
			"transition-all duration-200",
			"data-open:opacity-100 data-open:scale-100",
			"data-closed:opacity-0 data-closed:scale-95",
			"data-starting-style:opacity-0 data-starting-style:scale-95",
		].join(" "),
		popupInner: "rounded-2xl bg-card p-6 shadow-2xl",
		title: "text-foreground text-lg font-bold",
		description: "text-muted-foreground mt-2 text-sm leading-relaxed",
		actions: "mt-6 flex gap-3",
		cancelButton: "flex-1",
		confirmButton: "flex-1",
	};

	// --- HANDLERS ---
	function handleConfirmClick(): void {
		onConfirm();
	}

	function handleCancelClick(): void {
		onCancel?.();
	}

	return (
		<AlertDialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<AlertDialog.Portal>
				<AlertDialog.Backdrop className={classes.backdrop} />
				<AlertDialog.Popup className={classes.popup}>
					<Box className={classes.popupInner}>
						<AlertDialog.Title className={classes.title}>{title}</AlertDialog.Title>
						<AlertDialog.Description className={classes.description}>
							{description}
						</AlertDialog.Description>

						<Box className={classes.actions}>
							<AlertDialog.Close
								render={
									<Button
										variant={ButtonVariant.OUTLINE}
										size={ButtonSize.DEFAULT}
										className={classes.cancelButton}
									/>
								}
								onClick={handleCancelClick}
							>
								{cancelLabel}
							</AlertDialog.Close>

							<AlertDialog.Close
								render={
									<Button
										variant={ButtonVariant.DESTRUCTIVE}
										size={ButtonSize.DEFAULT}
										className={classes.confirmButton}
									/>
								}
								onClick={handleConfirmClick}
							>
								{confirmLabel}
							</AlertDialog.Close>
						</Box>
					</Box>
				</AlertDialog.Popup>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

export default ConfirmationDialog;
