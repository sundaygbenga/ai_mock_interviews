import { ReactNode } from "react";

import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const isUserAuthenticated = await isAuthenticated();

	if (!isUserAuthenticated) redirect("/sign-in");
	return (
		<div className="root-layout">
			<Header />
			{/* <Nav /> */}
			{/* <nav className="flex justify-between items-center">
				<Link href={"/"} className="flex items-center gap-2">
					<Image src="/logo.svg" alt="Logo" width={38} height={32} />
					<h2 className="text-primary-100">PrePpy</h2>
				</Link>
				<div className="relative">
					<Nav />
				</div>
			</nav> */}

			<main className="mt-[5rem]  selection:bg-slate-300 selection:text-slate-900">
				{children}
			</main>
		</div>
	);
};

export default RootLayout;
