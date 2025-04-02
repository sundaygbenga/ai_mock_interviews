import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
	getFeedbackByInterviewId,
	getInterviewById,
} from "@/lib/actions/general.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }: RouteParams) => {
	const { id } = await params;
	const user = await getCurrentUser();
	const userId = user?.id || "";

	const interview = await getInterviewById(id);
	if (!interview) redirect("/");

	const feedback = await getFeedbackByInterviewId({
		interviewId: id,
		userId: userId,
	});

	const formattedDate = dayjs(feedback?.createdAt || Date.now()).format(
		"MMM D, YYYY h:mm A"
	);

	return (
		<>
			<div className="section-feedback ">
				<div className="card-cta">
					<div className="flex flex-col gap-6  ">
						<h1 className="text-4xl font-semibold">
							Feedback on the Interview —{" "}
							<span className="capitalize">{feedback?.interviewRole}</span>{" "}
							Interview
						</h1>
						<div className="flex gap-5 mt-3">
							<div className="flex gap-2 items-center">
								<Image src="/star.svg" alt="star" width={22} height={22} />
								<p>Overall Impression: {feedback?.totalScore || "---"}/100 </p>
							</div>
							<div className="flex gap-2">
								<Image
									src="/calendar.svg"
									alt="calendar"
									width={22}
									height={22}
								/>
								<p>{feedback?.createdAt ? formattedDate : "N/A"}</p>
							</div>
						</div>
					</div>
				</div>
				<hr />

				<p>{feedback?.finalAssessment}</p>
				{/* Interview Breakdown */}
				<div className="flex flex-col gap-4">
					<h2>Breakdown of the Interview:</h2>
					{feedback?.categoryScores?.map((category, index) => (
						<div key={index}>
							<p className="font-bold">
								{index + 1}. {category.name} ({category.score}/100)
							</p>
							<p>{category.comment}</p>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-3">
					<h3>Strengths</h3>
					<ul>
						{feedback?.strengths?.map((strength, index) => (
							<li key={index}>{strength}</li>
						))}
					</ul>
				</div>

				<div className="flex flex-col gap-3">
					<h3>Areas for Improvement</h3>
					<ul>
						{feedback?.areasForImprovement?.map((area, index) => (
							<li key={index}>{area}</li>
						))}
					</ul>
				</div>

				<div className="buttons">
					<Button className="btn-secondary flex-1">
						<Link href="/" className="flex w-full justify-center">
							<p className="text-sm font-semibold text-primary-200 text-center">
								Go home
							</p>
						</Link>
					</Button>

					<Button className="btn-primary flex-1">
						<Link
							href={`/interview/${id}`}
							className="flex w-full justify-center"
						>
							<p className="text-sm font-semibold text-black text-center">
								Retake Interview
							</p>
						</Link>
					</Button>
				</div>
			</div>
		</>
	);
};

export default Page;
