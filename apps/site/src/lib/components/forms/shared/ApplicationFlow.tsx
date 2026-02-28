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
				<div className="my-32">
					<Title applicationType={applicationType} />
					<form
						method="post"
						className="bg-black border-[5px] border-white text-[var(--color-white)] w-8/12 flex flex-col items-center py-12 gap-14 z-1 max-[800px]:w-9/12 max-[400px]:w-11/12 drop-shadow-[25px_33px_0px_rgba(255,255,255,1)]"
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
						{isLastPage() ? (
							<Button
								text="Submit"
								className="text-2xl !px-11 !py-2"
								isLightVersion={true}
								disabled={submitting}
							/>
						) : (
							// TODO: Implement next button to navigate to next page
							<button type="button">NEXT</button>
						)}
						{isFirstPage() ? (
							// TODO: Implement start application button (basically just a next button with different text)
							<button type="button">START APPLICATION</button>
						) : (
							// TODO: Implement prev button to navigate to prev page
							<button type="button">PREV</button>
						)}
					{sessionExpired && sessionExpiredMessage}
					</form>
				</div>
			)}
		</div >
	);
}
