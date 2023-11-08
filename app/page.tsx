import { MainNav } from "@/components/main-nav";
import { Terminal } from "@/components/terminal";

export default function Home() {
	return (
		<main className="flex h-full flex-col items-center justify-between p-24">
			<Terminal />
		</main>
	);
}
