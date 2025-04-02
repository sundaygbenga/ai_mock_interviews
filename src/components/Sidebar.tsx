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

const Sidebar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const close = () => setToggleMenu(false);
	const ref = useOutsideClick(close);

	const navLinks = [
		{
			path: "interview",
			icon: <HiOutlineBriefcase size={25} />,
		},
		{ path: "about", icon: <HiMiniFolder size={25} /> },
		{ path: "contact", icon: <HiPhone size={25} /> },
	];

	function handleToggle() {
		setToggleMenu((toggle) => !toggle);
	}

	const styles = {
		link: "hover:bg-primary-200 hover:text-slate-800 px-2 py-1 rounded-md transition-color duration-700 ease-in-out list-none capitalize",
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
			className={` w-64 fixed dark-gradient md:opacity-90 h-full px-4 py-3 place-items-center- `}
			ref={ref}
		>
			<button onClick={handleToggle} className="cursor-pointer">
				{toggleMenu ? <HiXMark size={32} /> : <HiBars3CenterLeft size={32} />}
			</button>
			<hr />
			<ul className="flex flex-col justify-center items-center- gap-5">
				{navLinks.map((link, i) => (
					<li key={i} className={`${styles.link} `}>
						<Link href={`/${link.path}`} className="flex gap-2">
							{link.icon} {link.path}
						</Link>
					</li>
				))}
				<Button className="btn-secondary">Logout</Button>
			</ul>
		</header>
	);
};

export default Sidebar;
