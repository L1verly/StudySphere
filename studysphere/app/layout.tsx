import "@/styles/globals.css";
import type { Metadata } from 'next';
import Provider from '@/redux/provider';
import { Navbar } from "@/components/common";
import { Setup } from '@/components/utils';

export const metadata: Metadata = {
	title: "StudySphere",
	description: "Connecting Minds in Learning Hubs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<Setup />
					<Navbar />
					<div>{children}</div>
				</Provider>
			</body>
		</html>
	);
}
