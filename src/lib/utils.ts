import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
	const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
	return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
	try {
		const response = await fetch(url, { method: "HEAD" });
		return response.ok; // Returns true if the icon exists
	} catch {
		return false;
	}
};

export const getTechLogos = async (techArray: string[]) => {
	const logoURLs = techArray.map((tech) => {
		const normalized = normalizeTechName(tech);
		return {
			tech,
			url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
		};
	});

	const results = await Promise.all(
		logoURLs.map(async ({ tech, url }) => ({
			tech,
			url: (await checkIconExists(url)) ? url : "/tech.svg",
		}))
	);

	return results;
};

export const getRandomInterviewCover = () => {
	const randomIndex = Math.floor(Math.random() * interviewCovers.length);
	return `/covers${interviewCovers[randomIndex]}`;
};

export const removeLocalError = (
	path: string,
	state: ZodIssue[],
	setState: React.Dispatch<React.SetStateAction<ZodIssue[]>>
) => {
	const filteredErrors = state?.filter((err) => err?.path[0] !== path);
	if (filteredErrors) {
		setState(filteredErrors);
	}
};

export const assignLocalError = (path: string, state: ZodIssue[]) => {
	const targetError = state?.find((err) => err?.path[0] === path);
	if (targetError) {
		return targetError?.message;
	}
	return null;
};

// export const useScrollToTop = () => {
// 	useEffect(() => {
// 		// Scroll to the top of the component
// 		window.scrollTo({
// 			top: 0,
// 			behavior: "smooth",
// 		});
// 	}, []);
// };
