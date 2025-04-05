"use client";
import { useOutsideClick } from "@/utils/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
	HiBars3CenterLeft,
	HiMiniFolder,
	HiOutlineBriefcase,
	HiPhone,
	HiXMark,
} from "react-icons/hi2";
import { Button } from "./ui/button";
import { logUserOut } from "@/lib/actions/auth.action";

const Header = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const close = () => setToggleMenu(false);
	const ref = useOutsideClick(close);

	function handleToggle() {
		setToggleMenu((toggle) => !toggle);
	}
	const navLinks = [
		{
			path: "interview",
			icon: <HiOutlineBriefcase size={25} />,
		},
		{ path: "about", icon: <HiMiniFolder size={25} /> },
		{ path: "contact", icon: <HiPhone size={25} /> },
	];
	const styles = {
		link: "  hover:text-slate-800 hover:underline px-2 py-1  transition-color duration-700 ease-in-out list-none capitalize",
		linkMobile:
			"hover:bg-primary-200 hover:animate-pulse  active:bg-primary-200 hover:text-slate-800 px-2 py-4 rounded-md transition-color duration-700 ease-in-out list-none capitalize focus:outline-1 focus:outline-offset-2 focus:outline-violet-500",
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const viewportHeight = window.innerHeight;

			// Show the navbar if the user has scrolled past the viewport height
			if (scrollPosition > viewportHeight) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			ref={ref}
			className={`flex shrink-0 max-lg:contents-  top-0 left-0 right-0 shadow-sm shadow-accent-foreground transform transition-transform duration-700 ease-in-out w-full z-30 fixed dark-gradient md:opacity-90 items-center justify-center h-20  ${
				isVisible && "fixed"
			} ${isVisible ? "animate-bounceIn" : "translate-y-0"}`}
		>
			<nav className="w-full  px-8">
				<div className="flex justify-between z-40">
					<Link href={"/"} className="flex items-center gap-2">
						<Image src="/logo.svg" alt="Logo" width={38} height={32} />
						<h2 className="text-primary-100">PrePpy</h2>
					</Link>

					<div className="flex gap-5 items-center">
						<div className="relative h-10 w-10 rounded-full place-self-center- max-md:hidden mr-7">
							<Image
								src={"/profile.svg"}
								alt="Upload profile"
								className="object-fill rounded-full"
								fill
							/>
						</div>
						<Link href={"/interview"} className="cursor-pointer">
							<Button className="max-md:hidden px-5 py-3 text-md hover:blue-gradient-dark hover:text-white  shadow-md drop-shadow-lg  shadow-yellow-700 hover:shadow-gray-100 cursor-pointer ">
								Get started
							</Button>
						</Link>

						<button onClick={handleToggle} className="cursor-pointer">
							{toggleMenu ? (
								<HiXMark size={32} />
							) : (
								<HiBars3CenterLeft size={32} />
							)}
						</button>
					</div>
				</div>
			</nav>
			{toggleMenu && (
				<motion.div
					drag
					dragTransition={{ min: 0, max: 100 }}
					initial={{ transform: "translateX(-500px)" }}
					animate={{ transform: "translateX(0px)" }}
					transition={{ type: "spring", stiffness: 100 }}
					className="absolute card-border flex flex-col md:hidden- items-center justify-center top-24 right-0   bg-gradient-to-t from-[#171532] via-[#4a42bf] to-[#171532] rounded-lg w-[100%] md:w-[50%] py-8 z-50 "
				>
					<ul className="flex flex-col space-y-6 text-center w-full ">
						{navLinks.map((link, i) => (
							<li key={i}>
								<Link
									href={`/${link.path}`}
									className={`${styles.linkMobile} flex gap-2 items-center justify-center  `}
									onClick={() => {
										setTimeout(handleToggle, 2000);
									}}
								>
									{link.icon}
									{link.path}
								</Link>
							</li>
						))}

						<button
							className="btn-disconnect cursor-pointer mx-auto"
							onClick={() => logUserOut()}
						>
							Logout
						</button>
					</ul>
				</motion.div>
			)}
		</header>
	);
};

export default Header;
