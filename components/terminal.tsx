"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn, runCommand } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "./ui/input";
import { comma } from "postcss/lib/list";
import { firamono } from "./fonts";

export const TerminalComponent = (props = {}) => {
	const [terminalLines, setTerminalLines] = useState<any[]>([]);
	const [command, setCommand] = useState<string>();
	const [socket, setSocket] = useState<WebSocket>();

	useEffect(() => {
		if (!socket) {
			const ws = new WebSocket("ws://localhost:8080/ssh");

			ws.onopen = () => {
				setSocket(ws);
			};

			ws.onmessage = (message) => {
				console.log(message.data);
				const output = message.data.split(":")[1].trim();
				setTerminalLines((prev) => [
					...prev,
					<TerminalOutput key={prev.length}>{output}</TerminalOutput>,
				]);
			};

			return () => {
				ws.close();
			};
		}
	}, []);

	return (
		<div
			className={cn("container flex flex-col p-4 rounded", firamono.className)}
		>
			<ScrollArea className="h-[200px] min-w-screen rounded-md border p-2">
				{terminalLines?.map((line: any) => line)}
			</ScrollArea>
			<Input
				type="text"
				autoFocus={true}
				onKeyDown={(e) => {
					if (e.key == "Enter") {
						setTerminalLines([
							...terminalLines,
							<TerminalInput key={terminalLines.length}>
								{command}
							</TerminalInput>,
						]);
						if (socket && command) {
							socket.send(command);
						}
						setCommand("");
					}
				}}
				value={command}
				onChange={(e) => setCommand(e.target.value)}
			/>
		</div>
	);
};

function TerminalInput({ children }: any) {
	return <div>$ {children}</div>;
}
function TerminalOutput({ children }: any) {
	return <div>{children}</div>;
}
