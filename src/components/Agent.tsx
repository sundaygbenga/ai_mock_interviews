"use client";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuPhoneCall, LuPhoneOff } from "react-icons/lu";
import { BsRepeat } from "react-icons/bs";
import Spinner3 from "./Spinner3";

enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTING = "CONNECTING",
	ACTIVE = "ACTIVE",
	RESTARTING = "RESTARTING",
	FINISHED = "FINISHED",
}

interface SavedMessage {
	role: "user" | "system" | "assistant";
	content: string;
}

const Agent = ({
	userName,
	userId,
	type,
	interviewId,
	interviewRole,
	questions,
}: AgentProps) => {
	const router = useRouter();
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
	const [messages, setMessages] = useState<SavedMessage[]>([]);
	const [lastMessage, setLastMessage] = useState<string>("");

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
		const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

		const onMessage = (message: Message) => {
			if (message.type === "transcript" && message.transcriptType === "final") {
				const newMessage = { role: message.role, content: message.transcript };

				setMessages((prev) => [...prev, newMessage]);
			}
		};

		const onSpeechStart = () => setIsSpeaking(true);
		const onSpeechEnd = () => setIsSpeaking(false);

		const onError = (error: Error) => console.error("Error:", error);

		vapi.on("call-start", onCallStart);
		vapi.on("call-end", onCallEnd);
		vapi.on("message", onMessage);
		vapi.on("speech-start", onSpeechStart);
		vapi.on("speech-end", onSpeechEnd);
		vapi.on("error", onError);

		return () => {
			vapi.off("call-start", onCallStart);
			vapi.off("call-end", onCallEnd);
			vapi.off("message", onMessage);
			vapi.off("speech-start", onSpeechStart);
			vapi.off("speech-end", onSpeechEnd);
			vapi.off("error", onError);
		};
	}, []);

	useEffect(() => {
		if (messages.length > 0) {
			setLastMessage(messages[messages.length - 1].content);
		}
		const handleGenerateFeedback = async (messages: SavedMessage[]) => {
			console.log("Generate feedback here.");

			// TODO: Create a server action that generates feedback
			const { success, feedbackId: id } = await createFeedback({
				interviewId: interviewId!,
				interviewRole: interviewRole!,
				userId: userId!,
				transcript: messages,
			});

			if (success && id) {
				router.push(`/interview/${interviewId}/feedback`);
			} else {
				console.log("Error saving feedback");
				router.push("/");
			}
		};

		if (callStatus === CallStatus.FINISHED) {
			if (type === "generate") {
				router.push("/");
			} else {
				handleGenerateFeedback(messages);
			}
		}
		// if (callStatus === CallStatus.FINISHED) router.push("/");
	}, [messages, callStatus, type, userId, router, interviewId, interviewRole]);

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);

		if (type === "generate") {
			await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
				variableValues: {
					username: userName,
					userid: userId,
				},
			});
		} else {
			let formattedQuestions = "";
			if (questions) {
				formattedQuestions = questions
					.map((question) => `- ${question}`)
					.join("\n");
			}
			await vapi.start(interviewer, {
				variableValues: {
					questions: formattedQuestions,
				},
			});
		}
	};
	const handleDisconnect = async () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();
	};

	const handleRestartCall = async () => {
		if (callStatus === CallStatus.ACTIVE) {
			setCallStatus(CallStatus.CONNECTING);
			vapi.stop();

			if (type === "generate") {
				await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
					variableValues: {
						username: userName,
						userid: userId,
					},
				});
			} else {
				let formattedQuestions = "";
				if (questions) {
					formattedQuestions = questions
						.map((question) => `- ${question}`)
						.join("\n");
				}
				await vapi.start(interviewer, {
					variableValues: {
						questions: formattedQuestions,
					},
				});
			}
		}

		// setCallStatus(CallStatus.FINISHED);
		// vapi.stop();
		// vapi.
	};

	// const latestMessage = messages[messages.length - 1]?.content;

	const isCallInactiveOrFinished =
		callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

	return (
		<div className="flex flex-col gap-10 items-center justify-center w-full h-full mt-5">
			<div className="call-view">
				<div className="card-interviewer">
					<div className="avatar">
						<Image
							src="/ai-avatar.png"
							alt="vapi"
							width={65}
							height={54}
							className="object-cover"
						/>
						{isSpeaking && <span className="animate-speak" />}
					</div>
					<h3>AI Interviewer</h3>
				</div>
				<div className="card-border">
					<div className="card-content">
						<Image
							src="/user-avatar.png"
							alt="user avatar"
							width={540}
							height={540}
							className="object-cover rounded-full size-[7.5rem] "
						/>
						<h3>{userName}(You)</h3>
					</div>
				</div>
			</div>

			{messages.length > 0 && (
				<div className="transcript-border">
					<div className="transcript">
						<p
							key={lastMessage}
							className={cn(
								"transition-opacity duration-500 opacity-0",
								"animate-fadeIn opacity-100"
							)}
						>
							{lastMessage}
						</p>
					</div>
				</div>
			)}

			<div className="w-full flex gap-4 items-center justify-center">
				{callStatus === "ACTIVE" && (
					<button
						className="btn-restart disabled:cursor-not-allowed"
						disabled
						onClick={handleRestartCall}
					>
						<BsRepeat
							size={28}
							className=" animate-pulse disabled:animate-none  place-self-center"
						/>
					</button>
				)}
				{callStatus !== "ACTIVE" ? (
					<button className="relative btn-call " onClick={handleCall}>
						<span
							className={cn(
								"absolute animate-ping rounded-full opacity-75 ",
								callStatus === "CONNECTING" && "hidden"
							)}
						/>
						<span className="flex items-center gap-1 text-lg w-full">
							{isCallInactiveOrFinished ? (
								"Call"
							) : (
								<span className="">
									<Spinner3 />
								</span>
							)}
							{isCallInactiveOrFinished && (
								<LuPhoneCall
									size={22}
									className=" animate-pulse rotate-[255deg]"
								/>
							)}
						</span>
					</button>
				) : (
					<button className="btn-disconnect" onClick={handleDisconnect}>
						<span className="flex items-center gap-1 text-lg">
							{"End"}
							<LuPhoneOff
								size={22}
								className=" animate-pulse rotate-[255deg]"
							/>
						</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default Agent;
