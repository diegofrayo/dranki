"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { createDeck } from "~/app/actions";
import { ColorPicker } from "~/components/color-picker";
import { EmojiPicker } from "~/components/emoji-picker";
import { PhraseInput } from "~/components/phrase-input";
import { Button } from "~/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import type { Phrase } from "~/legacy/lib/types";

const EMPTY_PHRASE: Phrase = { english: "", japanese: "" };

export function CreateDeckModal() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Form state
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [emoji, setEmoji] = useState("📚");
	const [color, setColor] = useState("#58CC02");
	const [phrases, setPhrases] = useState<Phrase[]>([{ ...EMPTY_PHRASE }]);

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setEmoji("📚");
		setColor("#58CC02");
		setPhrases([{ ...EMPTY_PHRASE }]);
	};

	const handlePhraseChange = (index: number, field: "english" | "japanese", value: string) => {
		const newPhrases = [...phrases];
		newPhrases[index] = { ...newPhrases[index], [field]: value };
		setPhrases(newPhrases);
	};

	const handleAddPhrase = () => {
		setPhrases([...phrases, { ...EMPTY_PHRASE }]);
	};

	const handleRemovePhrase = (index: number) => {
		if (phrases.length > 1) {
			setPhrases(phrases.filter((_, i) => i !== index));
		}
	};

	const handleSubmit = async () => {
		if (!title.trim()) {
			alert("Please enter a deck title");
			return;
		}

		const validPhrases = phrases.filter((p) => p.english.trim() && p.japanese.trim());

		if (validPhrases.length === 0) {
			alert("Please add at least one phrase with both English and Japanese");
			return;
		}

		setIsSubmitting(true);
		const result = await createDeck({
			title: title.trim(),
			description: description.trim() || undefined,
			emoji,
			color,
			phrases: validPhrases,
		});

		setIsSubmitting(false);

		if (result.success) {
			resetForm();
			setOpen(false);
			router.refresh();
		} else {
			alert(result.error || "Failed to create deck");
		}
	};

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<Button
					size="lg"
					className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg"
					aria-label="Create new deck"
				>
					<Plus className="h-6 w-6" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-[90vh]">
				<div className="mx-auto w-full max-w-md">
					<DrawerHeader>
						<DrawerTitle className="text-xl font-bold">Create New Deck</DrawerTitle>
						<DrawerDescription>Add a title and phrases to practice</DrawerDescription>
					</DrawerHeader>

					<div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
						<div className="space-y-6">
							{/* Emoji & Color */}
							<div className="space-y-4">
								<div>
									<Label className="mb-2 block text-sm font-semibold">Icon</Label>
									<EmojiPicker
										value={emoji}
										onChange={setEmoji}
									/>
								</div>
								<div>
									<Label className="mb-2 block text-sm font-semibold">Color</Label>
									<ColorPicker
										value={color}
										onChange={setColor}
									/>
								</div>
							</div>

							{/* Title */}
							<div>
								<Label
									htmlFor="title"
									className="mb-2 block text-sm font-semibold"
								>
									Title
								</Label>
								<Input
									id="title"
									placeholder="e.g., Travel Phrases"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="text-base"
								/>
							</div>

							{/* Description */}
							<div>
								<Label
									htmlFor="description"
									className="mb-2 block text-sm font-semibold"
								>
									Description (optional)
								</Label>
								<Textarea
									id="description"
									placeholder="What is this deck about?"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									rows={2}
									className="resize-none"
								/>
							</div>

							{/* Phrases */}
							<div>
								<Label className="mb-2 block text-sm font-semibold">
									Phrases ({phrases.length})
								</Label>
								<div className="space-y-3">
									{phrases.map((phrase, index) => (
										<PhraseInput
											key={index}
											phrase={phrase}
											index={index}
											onChange={handlePhraseChange}
											onRemove={handleRemovePhrase}
											canRemove={phrases.length > 1}
										/>
									))}
								</div>
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="mt-3 w-full"
									onClick={handleAddPhrase}
								>
									<Plus className="mr-2 h-4 w-4" />
									Add Phrase
								</Button>
							</div>
						</div>
					</div>

					<DrawerFooter>
						<Button
							onClick={handleSubmit}
							disabled={isSubmitting}
							className="h-12 w-full text-base font-bold"
						>
							{isSubmitting ? (
								<>
									<Spinner className="mr-2" />
									Creating...
								</>
							) : (
								"Create Deck"
							)}
						</Button>
						<DrawerClose asChild>
							<Button
								variant="outline"
								className="w-full"
							>
								Cancel
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
