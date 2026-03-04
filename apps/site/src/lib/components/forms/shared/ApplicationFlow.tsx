"use client";

import { ReactNode, useState } from "react";

import useForm from "@/lib/utils/useForm";

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

	const onNextPage = () => {
		if (!isLastPage()) {
			setPageIndex(pageIndex + 1);
		}
	};

	const onPrevPage = () => {
		if (!isFirstPage()) {
			setPageIndex(pageIndex - 1);
		}
	};

	const sessionExpiredMessage = (
		<p className="w-11/12 text-red-500">
			Your session has expired. Please{" "}
			<a href="/login" target="_blank" className="text-blue-600 underline">
				log in from a new tab
			</a>{" "}
			to restore your session and then try submitting again.
		</p>
	);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-10">
			<div className="w-full max-w-6xl px-4 my-8 sm:px-6 md:px-10">
				<form
					method="post"
					className="bg-white text-[var(--color-black)] w-full flex flex-col items-center py-12 gap-14 rounded-2xl shadow-xl"
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
					<div className="flex items-center justify-end w-full gap-3 px-4 sm:px-8">
						{isFirstPage() ? (
							<button
								type="button"
								onClick={onNextPage}
								className="px-8 py-2 text-lg font-semibold transition-all border rounded-full shadow-md bg-button-bg text-button-text hover:brightness-95 border-button-text/30"
							>
								Start
							</button>
						) : (
							<>
								<button
									type="button"
									onClick={onPrevPage}
									className="px-6 py-2 text-base font-semibold transition-all border rounded-full shadow-md bg-button-bg text-button-text sm:text-lg sm:px-8 hover:brightness-95 border-button-text/30"
								>
									← Prev
								</button>
								{isLastPage() ? (
									<button
										type="submit"
										disabled={submitting}
										className="px-6 py-2 text-base font-semibold transition-all border rounded-full shadow-md bg-button-bg text-button-text sm:text-lg sm:px-8 hover:brightness-95 disabled:opacity-50 border-button-text/30"
									>
										Submit
									</button>
								) : (
									<button
										type="button"
										onClick={onNextPage}
										className="px-6 py-2 text-base font-semibold transition-all border rounded-full shadow-md bg-button-bg text-button-text sm:text-lg sm:px-8 hover:brightness-95 border-button-text/30"
									>
										Next →
									</button>
								)}
							</>
						)}
					</div>
					{sessionExpired && sessionExpiredMessage}
				</form>
			</div>
		</div>
	);
}
