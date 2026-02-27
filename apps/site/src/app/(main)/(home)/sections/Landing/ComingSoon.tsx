"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

import SocialLinks from "./SocialLinks";
import ComingSoonBackground from "./ComingSoonBackground";

const ComingSoon = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [popupType, setPopupType] = useState<"success" | "error">("success");
	const [submittedEmail, setSubmittedEmail] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setPopupType("error");
			setShowPopup(true);
			setTimeout(() => setShowPopup(false), 5000);
			return;
		}

		try {
			setLoading(true);
			await axios.post('/api/mailing-list', {
				email,
				timeSubmitted: new Date(),
			});

			setSubmittedEmail(email);
			setPopupType("success");
			setShowPopup(true);
			setEmail("");
			setLoading(false);
			setTimeout(() => setShowPopup(false), 5000);
		} catch (error) {
			setPopupType("error");
			setShowPopup(true);
			setTimeout(() => setShowPopup(false), 5000);
		}
	};

	useEffect(() => {
		// Disable scroll while this component is mounted
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);

	return (
		<div className="relative">
			<ComingSoonBackground />
			<SocialLinks />
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 min-h-screen flex flex-col items-center justify-center px-4 py-8  -mt-8 md:-mt-12">
				{/* Coming Soon Text */}
				<p className="font-sniglet font-normal text-coming-soon text-dark-text mb-1 md:mb-2 text-center">
					Coming Soon in Spring 2026...
				</p>

				{/* VenusHacks Title */}
				<h1 className="font-torus font-bold text-venushacks-title text-dark-text mb-4 md:mb-6 text-center">
					VENUSHACKS
				</h1>

				{/* Email Form */}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center"
				>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email Address"
						className="px-4 py-2 md:px-5 md:py-3 rounded-[35px] text-sm md:text-base font-sniglet bg-white/90 text-dark-text placeholder:text-dark-text/50 focus:outline-none focus:ring-2 focus:ring-button-bg w-auto min-w-[200px] md:min-w-[450px]"
						required
					/>
					<button
						type="submit"
						className="px-4 py-2 md:px-5 md:py-3 rounded-[70px] text-sm md:text-base font-sniglet font-normal bg-button-bg text-button-text hover:bg-button-bg/90 transition-colors focus:outline-none focus:ring-2 focus:ring-button-text whitespace-nowrap"
					>
						Notify Me
					</button>
				</form>

				{/* Popup Messages */}
				{showPopup && (
					<div
						className={`fixed top-12 md:top-16 left-1/2 -translate-x-1/2 max-w-md px-6 pt-3 md:pt-4 rounded-[35px] shadow-lg animate-slideIn z-50 flex items-center justify-center ${popupType === "success"
								? "bg-green-500 text-white"
								: "bg-red-500 text-white"
							}`}
					>
						<p className="font-sniglet text-sm md:text-base text-center">
							{popupType === "success"
								? `Thanks for joining our mailing list! A confirmation was sent to ${submittedEmail}.`
								: "Uh-oh, something went wrong! Please contact venushacks.uci@gmail.com for support."}
						</p>
					</div>
				)}
			</div>
			<style jsx>{`
				@keyframes slideIn {
					from {
						transform: translateY(-100%);
						opacity: 0;
					}
					to {
						transform: translateY(0);
						opacity: 1;
					}
				}

				.animate-slideIn {
					animation: slideIn 0.3s ease-out;
				}
			`}</style>
		</div>
	);
};

export default ComingSoon;
