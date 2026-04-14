"use client";

import { useRef, useState } from "react";

const SWIPE_THRESHOLD = 90;

type DragGestureOptions = {
	isEnabled: boolean;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
};

type DragGestureResult = {
	dragX: number;
	dragY: number;
	isDragging: boolean;
	isExiting: boolean;
	exitDirection: "left" | "right" | null;
	handlers: {
		onTouchStart: (e: React.TouchEvent) => void;
		onTouchMove: (e: React.TouchEvent) => void;
		onTouchEnd: () => void;
		onMouseDown: (e: React.MouseEvent) => void;
		onMouseMove: (e: React.MouseEvent) => void;
		onMouseUp: () => void;
		onMouseLeave: () => void;
	};
};

function useDragGesture({
	isEnabled,
	onSwipeLeft,
	onSwipeRight,
}: DragGestureOptions): DragGestureResult {
	// --- STATES & REFS ---
	const [dragX, setDragX] = useState(0);
	const [dragY, setDragY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [isExiting, setIsExiting] = useState(false);
	const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
	const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

	// --- UTILS ---
	function processDragEnd(): void {
		if (!isDragging) return;
		setIsDragging(false);

		if (dragX < -SWIPE_THRESHOLD) {
			setExitDirection("left");
			setIsExiting(true);
			setTimeout(onSwipeLeft, 280);
		} else if (dragX > SWIPE_THRESHOLD) {
			setExitDirection("right");
			setIsExiting(true);
			setTimeout(onSwipeRight, 280);
		} else {
			setDragX(0);
			setDragY(0);
		}
	}

	// --- HANDLERS ---
	function handleTouchStart(e: React.TouchEvent): void {
		if (!e.touches[0] || !isEnabled) return;
		setIsDragging(true);
		startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
	}

	function handleTouchMove(e: React.TouchEvent): void {
		if (!e.touches[0] || !isDragging || !isEnabled) return;
		setDragX(e.touches[0].clientX - startPos.current.x);
		setDragY((e.touches[0].clientY - startPos.current.y) * 0.3);
	}

	function handleTouchEnd(): void {
		processDragEnd();
	}

	function handleMouseDown(e: React.MouseEvent): void {
		if (!isEnabled) return;
		setIsDragging(true);
		startPos.current = { x: e.clientX, y: e.clientY };
	}

	function handleMouseMove(e: React.MouseEvent): void {
		if (!isDragging || !isEnabled) return;
		setDragX(e.clientX - startPos.current.x);
		setDragY((e.clientY - startPos.current.y) * 0.3);
	}

	function handleMouseUp(): void {
		processDragEnd();
	}

	function handleMouseLeave(): void {
		if (isDragging) processDragEnd();
	}

	return {
		dragX,
		dragY,
		isDragging,
		isExiting,
		exitDirection,
		handlers: {
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
			onMouseDown: handleMouseDown,
			onMouseMove: handleMouseMove,
			onMouseUp: handleMouseUp,
			onMouseLeave: handleMouseLeave,
		},
	};
}

export default useDragGesture;
