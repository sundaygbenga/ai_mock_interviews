"use client";

import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = ["interview", "about", "contact"];
export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { height } = useDimensions(containerRef);

	return (
		<div className="absolute top-[-40px] right-0">
			<div style={container}>
				{/* <motion.div className="pl-3 pt-3">
					<Link href={"/"} className="flex items-center gap-2">
						<Image src="/logo.svg" alt="Logo" width={38} height={32} />
						<h2 className="text-primary-100">PrePpy</h2>
					</Link>
				</motion.div> */}
				<motion.nav
					initial={false}
					animate={isOpen ? "open" : "closed"}
					custom={height}
					ref={containerRef}
					style={nav}
				>
					<motion.div style={background} variants={sidebarVariants} />
					<Navigation />
					<MenuToggle toggle={() => setIsOpen(!isOpen)} />
				</motion.nav>
			</div>
		</div>
	);
}

const navVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

const Navigation = () => (
	<motion.ul style={list} variants={navVariants}>
		{/* {[0, 1, 2, 3, 4].map((i) => (
			<MenuItem i={i} key={i} />
      ))} */}

		{navLinks.map((link, i) => (
			<MenuItem i={link} key={i} />
		))}
	</motion.ul>
);

const itemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const colors = ["#D309E1", "#9C1AFF", "#7700FF", "#FF008C", "#4400FF"];

const MenuItem = ({ i }: { i: string }) => {
	const border = `2px solid ${colors[+i]}`;
	return (
		<motion.li
			style={listItem}
			variants={itemVariants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			<div style={{ ...iconPlaceholder, border }} />
			<div style={{ ...textPlaceholder, border }}>
				<Link href={`/${i}`}>{i}</Link>
			</div>
		</motion.li>
	);
};

const sidebarVariants = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(30px at 245px 40px)",
		transition: {
			delay: 0.2,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

interface PathProps {
	d?: string;
	variants: Variants;
	transition?: { duration: number };
}

const Path = (props: PathProps) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 0%, 18%)"
		strokeLinecap="round"
		{...props}
	/>
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
	<button style={toggleContainer} onClick={toggle}>
		<svg width="23" height="23" viewBox="0 0 23 23">
			<Path
				variants={{
					closed: { d: "M 2 2.5 L 20 2.5" },
					open: { d: "M 3 16.5 L 17 2.5" },
				}}
			/>
			<Path
				d="M 2 9.423 L 20 9.423"
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				transition={{ duration: 0.1 }}
			/>
			<Path
				variants={{
					closed: { d: "M 2 16.346 L 20 16.346" },
					open: { d: "M 3 2.5 L 17 16.346" },
				}}
			/>
		</svg>
	</button>
);

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
	position: "relative",
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "stretch",
	flex: 1,
	width: "100%",
	maxWidth: "100%",
	height: 400,
	// backgroundColor: "var(--accent)",
	borderRadius: 20,
	overflow: "hidden",
};

const nav: React.CSSProperties = {
	width: 300,
};

const background: React.CSSProperties = {
	backgroundColor: "#f5f5f5",
	position: "absolute",
	top: 0,
	right: 0,
	bottom: 0,
	width: 300,
};

const toggleContainer: React.CSSProperties = {
	outline: "none",
	border: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none",
	cursor: "pointer",
	position: "absolute",
	top: 18,
	right: 15,
	width: 50,
	height: 50,
	borderRadius: "50%",
	background: "transparent",
};

const list: React.CSSProperties = {
	listStyle: "none",
	padding: 25,
	margin: 0,
	position: "absolute",
	top: 80,
	right: 0,
	width: 230,
};

// LIST ITEM
const listItem: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	padding: 0,
	margin: 0,
	listStyle: "none",
	marginBottom: 20,
	cursor: "pointer",
};

const iconPlaceholder: React.CSSProperties = {
	width: 40,
	height: 40,
	borderRadius: "50%",
	flex: "40px 0",
	marginRight: 20,
};

const textPlaceholder: React.CSSProperties = {
	borderRadius: 5,
	width: 200,
	height: 30,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
	color: "#222",
	textTransform: "capitalize",
};

/**
 * ==============   Utils   ================
 */

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		if (!ref.current) return;

		const updateDimensions = () => {
			if (ref.current) {
				setDimensions({
					width: ref.current.offsetWidth,
					height: ref.current.offsetHeight,
				});
			}
		};

		// Initial measure
		updateDimensions();

		// Attach ResizeObserver
		const resizeObserver = new ResizeObserver(updateDimensions);
		resizeObserver.observe(ref.current);

		// Cleanup on unmount
		return () => resizeObserver.disconnect();
	}, [ref.current]); // Watches the actual DOM node, not just the ref object

	return dimensions ?? { width: 0, height: 0 };
};
