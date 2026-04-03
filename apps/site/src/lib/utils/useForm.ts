"use client";

import { FormEvent, useState } from "react";
import axios from "axios";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

const FIELDS_WITH_OTHER = [
	"pronouns",
	"ethnicity",
	"school",
	"experienced_technologies",
];

export default function useForm(applyPath: string) {
	const [submitting, setSubmitting] = useState(false);
	const [sessionExpired, setSessionExpired] = useState(false);

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		if (hasDeadlinePassed()) {
			window.location.reload();
			return;
		}

		const formElement = event.currentTarget;
		const formData = new FormData(formElement);

		setSubmitting(true);
		setSessionExpired(false);

		// Use other values when selected
		for (const field of FIELDS_WITH_OTHER) {
			const otherField = `_other_${field}`;
			const otherFieldValue = formData.get(otherField);

			formData.delete(otherField);

			const valuesWithoutOther = formData
				.getAll(field)
				.filter((value) => value !== "other");

			formData.delete(field);

			for (const value of valuesWithoutOther) formData.append(field, value);

			if (otherFieldValue) formData.append(field, otherFieldValue);
		}

		try {
			const res = await axios.post(applyPath, formData);
			if (res.status === 201) {
				console.log("Application submitted");

				// Use window.location instead of router.push in order
				// to force reload the page to allow user identity to
				// update with the new status
				window.location.href = "/submission-confirmation";
				return;
			}
		} catch (err) {
			console.error(err);
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401) {
					setSessionExpired(true);
				}
			}
		}

		setSubmitting(false);
	};

	return {
		submitting,
		sessionExpired,
		handleSubmit,
	};
}
