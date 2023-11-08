"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { MainNav } from "./main-nav";

export function ThemeProvider({
	children,
	...props
}: Readonly<ThemeProviderProps>) {
	return (
		<NextThemesProvider {...props}>
			<div className="flex px-10 py-2">
				<MainNav />
			</div>
			{children}
		</NextThemesProvider>
	);
}
