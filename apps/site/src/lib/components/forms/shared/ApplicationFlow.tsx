"use client";

import React, { ReactNode, useMemo, useState, Children, useRef } from "react";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";
import haveApplicationsOpened from "@/lib/utils/haveApplicationsOpened";
import useForm from "@/lib/utils/useForm";

import ApplicationsClosed from "./ApplicationsClosed/ApplicationsClosed";
import { Identity } from "@/lib/utils/getUserIdentity";

import ApplicantPortalBackground from "../../ApplicantPortalBackground/ApplicantPortalBackground";
import ApplicationProgressBar from "@/lib/components/forms/shared/ApplicationProgressBar/ApplicationProgressBar";
import FloatingBubble from "../FloatingBubble";

export const revalidate = 60;

interface ApplicationFlowProps {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
	applyPath: string;
	identity: Identity;
	children: ReactNode;
}

export default function ApplicationFlow({
	applicationType,
	applyPath,
	identity,
	children,
}: ApplicationFlowProps) {
	const buttonClass =
		"py-[12px] px-[50px] rounded-full hover:opacity-90 active:opacity-100 active:shadow-md border font-figtree font-semibold text-[16px] leading-none text-center duration-200 shadow-sm";

	const { submitting, sessionExpired, handleSubmit } = useForm(applyPath);

	const pages = useMemo(() => Children.toArray(children), [children]);
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [validationError, setValidationError] = useState<string | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const PAGE_COUNT = pages.length;
	const isLastPage = pageIndex === PAGE_COUNT - 1;
	const isFirstPage = pageIndex === 0;

	/**
	 * Validate only the required fields that are currently visible on the page.
	 * Uses the native HTML5 constraint validation API so it respects all
	 * existing `required` attributes on <input>, <select>, and <textarea>.
	 */
	const validateCurrentPage = (): boolean => {
		if (!formRef.current) return true;

		// Query every form control that is required and currently visible
		// (i.e. not hidden via type="hidden" and not the hidden application_type input)
		const requiredFields = Array.from(
			formRef.current.querySelectorAll<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>("input[required], select[required], textarea[required]"),
		).filter((el) => el.type !== "hidden" && el.offsetParent !== null);

		for (const field of requiredFields) {
			if (!field.validity.valid || field.value.trim() === "") {
				// Focus the first invalid field and let the browser show its tooltip
				field.focus();
				field.reportValidity();
				setValidationError(
					"Please fill out all required fields before continuing.",
				);
				return false;
			}
		}

		setValidationError(null);
		return true;
	};

	const goNext = (e?: React.MouseEvent<HTMLButtonElement>) => {
		e?.preventDefault();
		e?.stopPropagation();

		if (!validateCurrentPage()) return;
		setPageIndex((i) => Math.min(i + 1, PAGE_COUNT - 1));
		// Scroll back to top of form on page change
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const goPrev = (e?: React.MouseEvent<HTMLButtonElement>) => {
		e?.preventDefault();
		e?.stopPropagation();
		setValidationError(null);
		setPageIndex((i) => Math.max(i - 1, 0));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const deadlinePassed = hasDeadlinePassed();
	const applicationsOpened = haveApplicationsOpened();

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
		<>
			<ApplicantPortalBackground />
			<div className="flex flex-col items-center min-h-screen gap-6 px-4 md:gap-10 md:px-12">
				{!applicationsOpened || deadlinePassed ? (
					<ApplicationsClosed identity={identity} />
				) : (
					<div className="flex flex-col items-center w-full max-w-5xl gap-8 mt-16 mb-32">
						<FloatingBubble navText="Application" />

						<ApplicationProgressBar
							pageIndex={pageIndex}
							pageCount={PAGE_COUNT}
						/>

						<form
							ref={formRef}
							method="post"
							action={applyPath}
							encType="multipart/form-data"
							onSubmit={handleSubmit}
							// Disable native browser validation so we can control when it fires
							noValidate
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

							{/* Page content — all pages stay mounted to preserve form data */}
							{pages.map((page, i) => (
								<div key={i} className={i === pageIndex ? undefined : "hidden"}>
									{page}
								</div>
							))}

							{/* Validation error message */}
							{validationError && (
								<p className="mt-6 text-sm text-red-500 font-figtree">
									{validationError}
								</p>
							)}

							{/* Navigation */}
							<div className="flex items-center justify-between mt-10">
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
		</>
	);
}
