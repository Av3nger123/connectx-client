"use client";

import { useEffect, useRef, useState } from "react";
import { firamono } from "./fonts";
import { cn } from "@/lib/utils";
import { OutputItem } from "@/types";

export function Terminal() {
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<OutputItem[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const outputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [output]);

	const handleInputSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newOutput = [...output, { text: input, type: "input" }];
		setOutput(newOutput);

		// Simulate a response (you can replace this with actual logic)
		const response = executeCommand(input);
		newOutput.push({ text: response, type: "output" });
		setOutput(newOutput);

		setInput("");
	};

	const executeCommand = (command: string): string => {
		// Simulate a response based on the command
		return `You entered: ${command}`;
	};

	return (
		<div
			className={cn(
				"w-full rounded-lg border flex flex-col h-screen overflow-hidden p-4 h-100",
				firamono.className
			)}
		>
			<div className="flex-grow overflow-y-auto" ref={outputRef}>
				<div className="terminal-output">
					{output.map((item, index) => (
						<div
							key={`output-${index}`}
							className={`output-${item.type} ${
								item.type === "input" ? "" : "opacity-70"
							}`}
						>
							{item.type === "input" ? "$ " : ""}
							{item.text}
						</div>
					))}
				</div>
			</div>
			<form
				onSubmit={handleInputSubmit}
				className="flex items-center mt-2 border-t border-500 pt-2 "
			>
				<span className="mr-2">$</span>
				<input
					type="text"
					value={input}
					onChange={handleInputChange}
					autoFocus
					className="bg-transparent border-none outline-none cursor-blink w-full"
				/>
			</form>
		</div>
	);
}
