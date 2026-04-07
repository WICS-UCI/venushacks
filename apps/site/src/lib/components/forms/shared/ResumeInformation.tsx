"use client";
import { ChangeEvent, useState } from "react";
import RequiredAsterisk from "../RequiredAsterisk";

class InvalidFile extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidFile";
	}
}

interface ResumeInformationProps {
	isRequired?: boolean;
}

export default function ResumeInformation({
	isRequired,
}: ResumeInformationProps) {
	const [resumePath, setResumePath] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		setErrorMessage("");
		setResumePath("");

		const file = event.target.files ? event.target.files[0] : null;
		try {
			handleFile(file);
		} catch (error) {
			event.target.value = "";
		}
	};

	const handleFile = (file: File | null) => {
		if (!file) throw TypeError;

		const path = file.name;

		const extension = path.split(".").pop();
		if (extension !== "pdf") {
			setErrorMessage("Invalid file format");
			throw new InvalidFile("Invalid file format");
		}

		if (file.size > 500000) {
			setErrorMessage("Invalid file size (file size exceeds 0.5 MB)");
			throw new InvalidFile("Invalid file size");
		}
		setResumePath(path);
	};

	return (
		<div className="flex flex-col w-full">
			<label className="block font-figtree text-sm md:text-base mb-2">
				Attach your Resume <RequiredAsterisk/>
			</label>
			<label
				htmlFor="resume_upload"
				className={`cursor-pointer flex items-center w-full appearance-none text-sm md:text-base py-2 pl-4 pr-12 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)] file:text-black ${
					resumePath ? "text-black" : "text-[#8E8E8E]"
				}`}
			>
				{errorMessage ? (
					<span>{errorMessage}</span>
				) : resumePath ? (
					<span>{"Selected " + resumePath}</span>
				) : (
					<span>Upload from computer</span>
				)}
			</label>
			<input
				className="opacity-0 absolute file:text-black"
				name="resume"
				id="resume_upload"
				type="file"
				accept="application/pdf"
				onChange={handleFileUpload}
				required={isRequired}
			/>
		</div>
	);
}
