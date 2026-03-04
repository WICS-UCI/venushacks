"use client";

import { ReactNode, useState } from "react";

import useForm from "@/lib/utils/useForm";

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
			<div className="my-8 w-full max-w-6xl px-4 sm:px-6 md:px-10">
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
					<div className="w-full flex justify-end items-center gap-3 px-4 sm:px-8">
						{isFirstPage() ? (
							<button
								type="button"
								onClick={onNextPage}
								className="bg-black text-white font-display text-lg px-8 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors"
							>
								START
							</button>
						) : (
							<>
								<button
									type="button"
									onClick={onPrevPage}
									className="bg-white text-black font-display text-base sm:text-lg px-5 sm:px-8 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
								>
									PREV
								</button>
								{isLastPage() ? (
									<Button
										text="Submit"
										className="text-2xl !px-11 !py-2"
										disabled={submitting}
									/>
								) : (
									<button
										type="button"
										onClick={onNextPage}
										className="bg-black text-white font-display text-base sm:text-lg px-5 sm:px-8 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors"
									>
										NEXT
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
