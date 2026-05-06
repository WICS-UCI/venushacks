"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const WAIVER_VERSION = "v-2026-a";

const MARKDOWN_COMPONENTS: React.ComponentProps<typeof ReactMarkdown>["components"] = {
	h1: ({ children }) => <h1 className="text-[16px] font-bold mb-3 mt-1">{children}</h1>,
	h2: ({ children }) => <h2 className="text-[14px] font-bold mb-2 mt-4">{children}</h2>,
	h3: ({ children }) => <h3 className="text-[13px] font-bold mb-1 mt-3">{children}</h3>,
	p: ({ children }) => <p className="mb-3">{children}</p>,
	a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">{children}</a>,
	hr: () => <hr className="my-4 border-gray-300" />,
	ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
	ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
	strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
};

type WaiverDocument = {
	version: string;
	text: string;
};

interface WaiverModalProps {
	onClose: () => void;
}

export default function WaiverModal({ onClose }: WaiverModalProps) {
	const [waiver, setWaiver] = useState<WaiverDocument | null>(null);
	const [fetchError, setFetchError] = useState(false);

	const [acknowledged, setAcknowledged] = useState(false);
	const [signature, setSignature] = useState("");
	const [signatureError, setSignatureError] = useState("");

	const scrollRef = useRef<HTMLDivElement>(null);
	const [hasScrolled, setHasScrolled] = useState(false);

	// Close on backdrop click
	function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target === e.currentTarget) onClose();
	}

	// Close on Escape
	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onClose]);

	function handleScroll() {
		const el = scrollRef.current;
		if (!el) return;
		if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
			setHasScrolled(true);
		}
	}

	function validateSignature(value: string): string {
		const trimmed = value.trim();
		if (!trimmed) return "Signature is required.";
		if (!/[a-zA-Z]/.test(trimmed)) return "Signature must contain at least one letter.";
		if (trimmed.length > 200) return "Signature is too long.";
		return "";
	}

	async function handleSubmit() {
		if (!waiver) return;

		const error = validateSignature(signature);
		if (error) {
			setSignatureError(error);
			return;
		}

		try {
			const res = await fetch("/api/waiver", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					full_signature: signature.trim(),
					acknowledged,
					waiver_version: WAIVER_VERSION,
					waiver_text: waiver.text,
				}),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.detail ?? "Submission failed. Please try again.");
			}

			window.location.href = `?status=success&message=${
				encodeURIComponent("Waiver signed! Check your inbox for a confirmation email.")
			}`;
		} catch (err) {
			window.location.href = `?status=error&message=${encodeURIComponent(
				err instanceof Error ? err.message : "An unexpected error occurred."
			)}`;
		}
	}

	const inlineSignatureError = signature !== "" ? validateSignature(signature) : "";
	const canSubmit =
		acknowledged &&
		hasScrolled &&
		validateSignature(signature) === "";

	useEffect(() => {
		async function fetchWaiver() {
			try {
				const res = await fetch(`/api/waiver?version=${WAIVER_VERSION}`);
				const raw = await res.text();
				if (!res.ok) throw new Error();
				const data: WaiverDocument = JSON.parse(raw);
				setWaiver(data);
			} catch (e) {
				setFetchError(true);
			}
		}
		fetchWaiver();
	}, []);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div className="w-full max-w-[659px] bg-white rounded-[30px] shadow-xl p-6 md:p-[40px] flex flex-col gap-6 font-figtree">

				{/* Header */}
				<div className="flex items-start justify-between">
					<div>
						<h2 className="font-sniglet text-[26px] leading-[100%] tracking-[0.05em] font-normal text-black">
							Waiver &amp; Agreement
						</h2>
						<p className="mt-1 text-[13px] text-gray-400 tracking-[0.03em]">
							Version {WAIVER_VERSION}
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none mt-1"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				{/* Waiver text scroll area */}
				<div>
					{fetchError ? (
						<div
							className="rounded-[16px] p-4 text-center text-[14px]"
							style={{
								background: "var(--color-linen)",
								color: "var(--color-indian-red)",
							}}
						>
							Unable to load the waiver document. Please refresh and try again.
						</div>
					) : !waiver ? (
						<div
							className="rounded-[16px] h-[200px] flex items-center justify-center text-[14px] text-gray-400 animate-pulse"
							style={{ background: "var(--color-linen)" }}
						>
							Loading waiver…
						</div>
					) : (
						<>
							<div
								ref={scrollRef}
								onScroll={handleScroll}
								className="h-[400px] overflow-y-auto p-4 text-[14px] leading-[160%] tracking-[0.03em] text-gray-700"
							>
								<ReactMarkdown components={MARKDOWN_COMPONENTS}>
									{waiver.text}
								</ReactMarkdown>
							</div>
							{!hasScrolled && (
								<p className="mt-1 text-[12px] text-center text-gray-400">
									Scroll to the bottom to continue ↓
								</p>
							)}
						</>
					)}
				</div>

				{/* Acknowledge checkbox */}
				<label className="flex items-start gap-3 cursor-pointer select-none">
					<input
						type="checkbox"
						checked={acknowledged}
						onChange={(e) => setAcknowledged(e.target.checked)}
						disabled={!hasScrolled || !waiver}
						className="mt-[3px] w-4 h-4 shrink-0 accent-[var(--color-indian-red)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
					/>
					<span className="text-[14px] leading-[140%] tracking-[0.03em] text-gray-700">
						I have read and agree to the terms and conditions of this waiver.
					</span>
				</label>

				{/* Signature input */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="waiver-signature"
						className="block text-sm md:text-base font-figtree mb-2 font-bold tracking-[0.03em] text-black"
					>
						Full Legal Signature
					</label>
					<input
						id="waiver-signature"
						type="text"
						name="waiver-signature"
						value={signature}
						onChange={(e) => {
							setSignature(e.target.value);
							setSignatureError("");
						}}
						onBlur={() => setSignatureError(validateSignature(signature))}
						disabled={!acknowledged || !waiver}
						placeholder="Type your full name exactly as it appears on your ID"
						className={`
            w-full rounded-xl px-4 py-2 border
            bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)]
            outline-none text-sm md:text-base
            placeholder:text-[#8E8E8E] text-black
            focus:bg-white focus:ring-2
            transition-colors duration-150
            disabled:opacity-40 disabled:cursor-not-allowed
            ${inlineSignatureError || signatureError
								? "border-red-400 focus:border-red-400 focus:ring-red-100"
								: "border-gray-200 focus:border-gray-300 focus:ring-gray-200"
							}
        `}
					/>
					{(inlineSignatureError || signatureError) && (
						<p
							role="alert"
							className="mt-1.5 flex items-center gap-1.5 text-xs md:text-sm text-red-500"
						>
							<svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
								<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4a.75.75 0 0 0-1.5 0v3.25a.75.75 0 0 0 1.5 0V5zm-.75 6a.875.875 0 1 0 0-1.75A.875.875 0 0 0 8 11z" />
							</svg>
							{inlineSignatureError || signatureError}
						</p>
					)}
				</div>

				{/* Action buttons */}
				<div className="flex flex-col md:flex-row gap-4 w-full">
					<button
						type="button"
						onClick={onClose}
						className="w-full md:flex-1 px-8 py-3 text-[16px] font-bold border rounded-full transition-opacity"
						style={{
							background: "var(--color-linen)",
							color: "var(--color-indian-red)",
							borderColor: "var(--color-indian-red)",
						}}
					>
						← Cancel
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!canSubmit}
						className="w-full md:flex-1 px-8 py-3 text-[16px] font-bold border rounded-full transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
						style={{
							background: "var(--color-pale-rose)",
							color: "var(--color-indian-red)",
							borderColor: "var(--color-indian-red)",
						}}
					>
						Sign & Submit →
					</button>
				</div>
			</div>
		</div>
	);
}
