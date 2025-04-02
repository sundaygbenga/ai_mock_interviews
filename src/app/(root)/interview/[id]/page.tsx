import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: RouteParams) => {
	const { id } = await params;
	const user = await getCurrentUser();
	const interview = await getInterviewById(id);

	if (!interview) redirect("/");

	return (
		<>
			<div className="flex gap-4 justify-between">
				<div className="flex flex-col sm:flex-row  gap-4 items-center">
					<div className="flex gap-4 items-center">
						<Image
							src={getRandomInterviewCover()}
							alt="cover-image"
							width={40}
							height={40}
							className="rounded-full object-cover size-[2.5rem] "
						/>
						<h3 className="capitalize">{interview.role} Interview</h3>
					</div>
					<DisplayTechIcons techStack={interview.techstack} />
				</div>
				<p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
					{interview.type}
				</p>
			</div>
			<Agent
				userName={user?.name || ""}
				userId={user?.id}
				interviewId={id}
				interviewRole={interview.role}
				type="interview"
				questions={interview.questions}
			/>
		</>
	);
};

export default Page;
