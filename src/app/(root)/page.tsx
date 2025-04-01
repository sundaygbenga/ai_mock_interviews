import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import {
	getCurrentUser,
	getInterviewsByUserId,
} from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
	const user = await getCurrentUser();
	const userInterviews = await getInterviewsByUserId(user?.id!);

	const hasPastInterviews = userInterviews ? userInterviews?.length > 0 : null;
	return (
		<>
			<section className="card-cta ">
				<div className="flex flex-col gap-6 max-w-lg ">
					<h2>Get Interview-Ready with Ai-Powered Practice & Feedback</h2>
					<p className="text-lg">
						Practice on real interview questions, get instant feedback, and
						track your progress. PrePpy is the ultimate tool for interview
						preparation.
					</p>
					<Button asChild className="btn-primary max-sm:w-full">
						<Link href="/interview">Start an Interview</Link>
					</Button>
				</div>
				<Image
					src="/robot.png"
					alt="robot-dude"
					width={400}
					height={400}
					className="max-sm:hidden"
				/>
			</section>
			<section className="flex flex-col gap-6 mt-8">
				<h2>Your Interviews</h2>
				<div className="interviews-section">
					{hasPastInterviews ? (
						userInterviews?.map((interview) => (
							<InterviewCard key={interview.id} {...interview} />
						))
					) : (
						<p>You haven&apos;t taken any interviews yet</p>
					)}
				</div>
			</section>
			<section className="flex flex-col gap-6 mt-8">
				<h2>Take an interview</h2>
				<div className="interviews-section">
					{dummyInterviews.map((interview) => (
						<InterviewCard key={interview.id} {...interview} />
					))}
					{/* <p>There are no interviews available</p> */}
				</div>
			</section>
		</>
	);
};

export default Page;
