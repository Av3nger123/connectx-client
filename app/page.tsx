import { MainNav } from "@/components/main-nav";
import { TerminalComponent } from "@/components/terminal";
import { Terminal } from "@/components/terminal-demo";

export default function Home() {
	return (
		<main className="flex h-full flex-col items-center justify-between p-24">
			<Terminal />
		</main>
	);
}
