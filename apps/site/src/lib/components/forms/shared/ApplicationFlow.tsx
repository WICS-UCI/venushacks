"use client";

import React, { ReactNode, useMemo, useState, Children } from "react";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";
import haveApplicationsOpened from "@/lib/utils/haveApplicationsOpened";
import useForm from "@/lib/utils/useForm";

import ApplicationsClosed from "./ApplicationsClosed/ApplicationsClosed";
import Title from "./Title/Title";
import { Identity } from "@/lib/utils/getUserIdentity";

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
		<div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
			{!applicationsOpened || deadlinePassed ? (
				<ApplicationsClosed identity={identity} />
			) : (
				<div className="w-full max-w-5xl">
					<Title applicationType={applicationType} />

					<form
						method="post"
						action={applyPath}
						encType="multipart/form-data"
						onSubmit={handleSubmit}
						className="
              w-full bg-white text-slate-900

              rounded-[38px]
              shadow-[0_18px_35px_rgba(0,0,0,0.12)]
              px-5 py-6
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
									className="text-sm font-medium text-slate-600 hover:text-slate-900"
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
									className="rounded-full bg-[#F4B6B6] text-[#8C3A3A] hover:opacity-90 border border-[#CF6868] font-figtree font-semibold text-[16px] leading-none text-center"
									style={{
										paddingTop: "12px",
										paddingRight: "50px",
										paddingBottom: "12px",
										paddingLeft: "50px",
									}}
								>
									Submit Application →
								</button>
							) : (
								<button
									type="button"
									onClick={goNext}
									className="rounded-full bg-[#F4B6B6] text-[#8C3A3A] hover:opacity-90 border border-[#CF6868] font-figtree font-semibold text-[16px] leading-none text-center"
									style={{
										paddingTop: "12px",
										paddingRight: "50px",
										paddingBottom: "12px",
										paddingLeft: "50px",
									}}
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
