"use client";

import { ReactNode, useState } from "react";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";
import haveApplicationsOpened from "@/lib/utils/haveApplicationsOpened";
import useForm from "@/lib/utils/useForm";

import ApplicationsClosed from "./ApplicationsClosed/ApplicationsClosed";
import Title from "./Title/Title";
import Button from "../../Button/Button";
import { Identity } from "@/lib/utils/getUserIdentity";


export const revalidate = 60;

interface ApplicationFlowProps {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
	applyPath: string;
	identity: Identity;
	children: ReactNode[];
}

export default function ApplicationFlow({
	applicationType,
	applyPath,
	identity,
	children,
}: ApplicationFlowProps) {
	const { submitting, sessionExpired, handleSubmit } = useForm(applyPath);
	const [pageIndex, setPageIndex] = useState<number>(0); // Used to change pages
	console.log(setPageIndex); // REMOVE THIS LINE ONCE BUTTONS HAVE BEEN CONFIGURED

	const PAGE_COUNT = children.length;
	const isLastPage = () => pageIndex === PAGE_COUNT - 1;
	const isFirstPage = () => pageIndex === 0;

	const deadlinePassed = hasDeadlinePassed();
	const applicationsOpened = haveApplicationsOpened();

	const sessionExpiredMessage = (
		<p className="text-red-500 w-11/12">
			Your session has expired. Please{" "}
			<a href="/login" target="_blank" className="text-blue-600 underline">
				log in from a new tab
			</a>{" "}
			to restore your session and then try submitting again.
		</p>
	);

	return (
		<div className="flex flex-col items-center justify-center gap-10 min-h-screen">
			{!applicationsOpened || deadlinePassed ? (
				<ApplicationsClosed identity={identity} />
			) : (
				<div className="w-11/12 lg:w-8/12 md:w-8/12 sm:w-10/12">
					<form
						method="post"
						className="bg-white shadow-lg rounded-2xl font-figtree p-10"
						action={applyPath}
						encType="multipart/form-data"
						onSubmit={handleSubmit}
					>
						<input
							type="text"
							name="application_type"
							value={applicationType}
							readOnly
							hidden
						/>
						{children[pageIndex]}
						<div className="mt-8 flex justify-between">
							{!isFirstPage() && (
								<button className="px-3 py-2 bg-[#F8C4C4] border border-[#CF6868] rounded-full w-40 text-button-text font-bold"
								type="button"
								onClick={() => setPageIndex(pageIndex-1)}>PREV</button>
							)}
							{isLastPage() ? (
								<Button
									text="Submit"
									className="text-2xl !px-11 !py-2"
									isLightVersion={true}
									disabled={submitting}
								/>
							) : isFirstPage() ? (
								<button className="px-3 py-2 bg-[#F8C4C4] border border-[#CF6868] rounded-full w-56 text-button-text font-bold ml-auto" 
									type="button"
									onClick={() => setPageIndex(1)}>
									Start Application →
								</button>
							) : (
								<button className="px-3 py-2 bg-[#F8C4C4] border border-[#CF6868] rounded-full w-40 text-button-text font-bold"
								type="button"
								onClick={() => setPageIndex(pageIndex+1)}>NEXT</button>
							)}
						</div>
						{sessionExpired && sessionExpiredMessage}
					</form>
				</div>
			)}
		</div>
	);
}
