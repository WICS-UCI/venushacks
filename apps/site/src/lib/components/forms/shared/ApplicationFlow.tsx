"use client";

import React, { ReactNode, useMemo, useState, Children } from "react";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";
import haveApplicationsOpened from "@/lib/utils/haveApplicationsOpened";
import useForm from "@/lib/utils/useForm";

import ApplicationsClosed from "./ApplicationsClosed/ApplicationsClosed";
import { Identity } from "@/lib/utils/getUserIdentity";

import ApplicationProgressBar from "@/lib/components/forms/shared/ApplicationProgressBar/ApplicationProgressBar";

export const revalidate = 60;

interface ApplicationFlowProps {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
	applyPath: string;
	identity: Identity;
	children: ReactNode; // changed
}

export default function ApplicationFlow({
	applicationType,
	applyPath,
	identity,
	children,
}: ApplicationFlowProps) {
	const buttonClass = "py-[12px] px-[50px] rounded-full hover:opacity-90 active:opacity-100 active:shadow-md border font-figtree font-semibold text-[16px] leading-none text-center duration-200 shadow-sm";
	
	const { submitting, sessionExpired, handleSubmit } = useForm(applyPath);

	const pages = useMemo(() => Children.toArray(children), [children]);
	const [pageIndex, setPageIndex] = useState<number>(0);

	const PAGE_COUNT = pages.length;
	const isLastPage = pageIndex === PAGE_COUNT - 1;
	const isFirstPage = pageIndex === 0;

	const goNext = () => setPageIndex((i) => Math.min(i + 1, PAGE_COUNT - 1));
	const goPrev = () => setPageIndex((i) => Math.max(i - 1, 0));

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
		<div className="flex flex-col items-center gap-6 md:gap-10 min-h-screen px-4 md:px-12">
			{!applicationsOpened || deadlinePassed ? (
				<ApplicationsClosed identity={identity} />
			) : (
				<div className="mt-16 mb-32 w-full max-w-5xl flex flex-col items-center gap-8">
					<div className="flex items-center bg-[rgba(255,255,255,0.6)] rounded-full p-3 shadow-md text-sm md:text-base font-figtree">
						<span className="px-4 md:px-6 py-2 bg-white rounded-full text-black pointer-events-none">
							Application
						</span>

						<form method="post" action="api/user/logout">
							<button type="submit" className="px-4 md:px-6 py-2 text-black">
								Logout
							</button>
						</form>
					</div>

					<ApplicationProgressBar
						pageIndex={pageIndex}
						pageCount={PAGE_COUNT}
					/>

					<form
						method="post"
						action={applyPath}
						encType="multipart/form-data"
						onSubmit={handleSubmit}
						className="
              w-auto min-w-full bg-white text-slate-900
              rounded-[25px] md:rounded-[38px]
              shadow-[0_18px_35px_rgba(0,0,0,0.12)]
              px-5 py-8
              md:px-12 md:py-10
            "
					>
						<input
							type="text"
							name="application_type"
							value={applicationType}
							readOnly
							hidden
						/>

						{/* Page content */}
						{pages[pageIndex]}

						{/* Navigation */}
						<div className="mt-10 flex items-center justify-between">
							{!isFirstPage ? (
								<button
									type="button"
									onClick={goPrev}
									className={`${buttonClass} text-indian-red border-indian-red bg-linen`}
								>
									← Prev
								</button>
							) : (
								<span />
							)}

							{isLastPage ? (
								<button
									type="submit"
									disabled={submitting}
									className={`${buttonClass} text-indian-red border-indian-red bg-pale-rose`}
								>
									Submit Application →
								</button>
							) : (
								<button
									type="button"
									onClick={goNext}
									className={`${buttonClass} text-indian-red border-indian-red bg-pale-rose`}
								>
									{isFirstPage ? "Start Application →" : "Next →"}
								</button>
							)}
						</div>

						{sessionExpired && (
							<div className="mt-6">{sessionExpiredMessage}</div>
						)}
					</form>
				</div>
			)}
		</div>
	);
}
