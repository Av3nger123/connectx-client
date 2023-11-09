"use client";

import { useEffect, useRef, useState } from "react";
import { firamono } from "./fonts";
import { cn } from "@/lib/utils";
import { OutputItem } from "@/types";
import { comma } from "postcss/lib/list";
import createWebSocket from "@/lib/websocket";

export function Terminal() {
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<OutputItem[]>([]);
	const [socket, setSocket] = useState<WebSocket>();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const outputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [output]);

	useEffect(() => {
		if (!socket) {
			const newSocket = createWebSocket((data: any) => {
				let lines: OutputItem[] = [];
				data.split("\n").forEach((line: string) => {
					lines.push({ text: line, type: "output" });
				});
				setOutput((prev) => [...prev, ...lines]);
			});
			setSocket(newSocket);

			// Cleanup on component unmount
			return () => {
				newSocket.close();
			};
		}
	}, []);

	const handleInputSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newOutput = [...output, { text: input, type: "input" }];
		setOutput(newOutput);
		executeCommand(input);
		setInput("");
	};

	const executeCommand = (command: string): void => {
		if (socket) {
			socket.send(command);
		}
	};

	return (
		<div
			className={cn(
				"w-full rounded-lg border flex flex-col overflow-hidden p-4 h-96",
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
