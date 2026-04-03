"use client";

import { FormEvent, PropsWithChildren, useState } from "react";

import styles from "./ValidatingForm.module.scss";

interface FormProps {
	action?: string;
	method?: string;
}

function ValidatingForm(props: PropsWithChildren<FormProps>) {
	const buttonClass =
		"py-[12px] px-[50px] rounded-full hover:opacity-90 active:opacity-100 active:shadow-md border font-figtree font-semibold text-[16px] leading-none text-center duration-200 shadow-sm";

	const [validated, setValidated] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const { children, ...rest } = props;

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			// prevent submission to display validation feedback
			event.preventDefault();
		} else {
			setSubmitting(true);
		}
		setValidated(true);
	};

	return (
		<form
			onSubmit={handleSubmit}
			noValidate // use custom validation feedback
			className={`${
				validated ? styles.validated : styles.notYetValidated
			} flex flex-col items-center`}
			{...rest}
		>
			{children}
			<div className="w-1/3">
				<button
					type="submit"
					disabled={submitting}
					className={`${buttonClass} text-indian-red border-indian-red bg-pale-rose`}
				>
					Continue
				</button>
			</div>
		</form>
	);
}

export default ValidatingForm;
