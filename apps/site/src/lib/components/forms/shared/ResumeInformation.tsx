"use client";

import { ChangeEvent, useState } from "react";

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
	const [hasUploaded, setHasUploaded] = useState<boolean>(false);
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
		setHasUploaded(true);
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
		<div className="flex flex-col gap-1 w-full">
			<label className="font-figtree font-medium text-lg mb-2">
				Attach your Resume{" "}
				<span className="font-normal text-[#8E8E8E]">(optional)</span>
			</label>
			<label
				htmlFor="resume_upload"
				className="cursor-pointer flex items-center w-full appearance-none text-[#8E8E8E] text-lg h-10 pl-3 pr-12 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC]"
				style={{ boxShadow: "0px 0px 5px 0px #00000033" }}
			>
				{errorMessage ? (
					<span className="font-figtree appearance-none text-[#8E8E8E] text-lg">{errorMessage}</span>
				) : resumePath ? (
					<span className="font-figtree appearance-none text-[#8E8E8E] text-lg">
						{"Selected " + resumePath}
					</span>
				) : (
					<span className="font-figtree appearance-none text-[#8E8E8E] text-lg text-[#8E8E8E]">
						Upload from computer
					</span>
				)}
			</label>
			<input
				className="opacity-0 absolute"
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
