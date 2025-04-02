import { Button } from "@/components/ui/button";
import { HowItWorks, WhatWeOffer } from "@/constants";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
	const formattedDate = dayjs(Date.now()).format("MMM D, YYYY h:mm A");

	return (
		<>
			<div className="section-feedback ">
				<div className="card-cta">
					<div className="flex flex-col gap-6  ">
						<h1 className="text-4xl font-semibold">About PrePpy 1.0.0</h1>
						<h2 className="text-4xl font-semibold">
							Welcome to PrePpy – Your Ultimate AI-Powered Interview Coach!
						</h2>
						<div className="flex gap-5 mt-3">
							<div className="flex gap-2 items-center">
								<Image src="/star.svg" alt="star" width={22} height={22} />
								<p>Rating: {100}/100 </p>
							</div>
							<div className="flex gap-2">
								<Image
									src="/calendar.svg"
									alt="calendar"
									width={22}
									height={22}
								/>
								<p>{formattedDate}</p>
							</div>
						</div>
					</div>
				</div>
				<hr />

				<p>
					In today&apos;s competitive job market, acing an interview is crucial.
					Whether you’re preparing for your first job or aiming to take the next
					big step in your career, practicing your interview skills can give you
					the edge you need. That’s where PrePpy comes in. PrePpy uses
					cutting-edge AI technology to offer you a unique, interactive, and
					personalized interview experience. By integrating advanced AI systems,
					including VAPI, Gemini, and the Vercel AI SDK, we provide a smart
					platform where you can simulate realistic job interviews and get
					valuable feedback to enhance your performance.
				</p>
				{/* Interview Breakdown */}
				<div className="flex flex-col gap-4">
					<h2>What We Offer:</h2>
					{WhatWeOffer.map((category, index) => (
						<div key={index}>
							<p className="font-bold">
								{index + 1}. {category.title}
							</p>
							<p>{category.text}</p>
						</div>
					))}
				</div>
				<div className="flex flex-col gap-4">
					<h2>How It Works:</h2>
					{HowItWorks.map((category, index) => (
						<div key={index}>
							<p className="font-bold">
								{index + 1}. {category.title}
							</p>
							<p>{category.text}</p>
						</div>
					))}
				</div>

				{/* <div className="flex flex-col gap-3">
					<h3>Strengths</h3>
					<ul>
						{HowItWorks.map((strength, index) => (
							<li key={index}>{strength}</li>
						))}
					</ul>
				</div> */}

				<div className="buttons">
					<Button className="btn-secondary flex-1">
						<Link href="/" className="flex w-full justify-center">
							<p className="text-sm font-semibold text-primary-200 text-center">
								Go home
							</p>
						</Link>
					</Button>

					<Button className="btn-primary flex-1">
						<Link href={`/interview`} className="flex w-full justify-center">
							<p className="text-sm font-semibold text-black text-center">
								Visit Interview Page
							</p>
						</Link>
					</Button>
				</div>
			</div>
		</>
	);
};

export default Page;
