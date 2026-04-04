"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

import BarLoader from "../BarLoader";
import CountdownItem from "./CountdownItem";
import FinalAnimation from "./FinalAnimation";

import styles from "./ShiftingCountdown.module.scss";

// NOTE: Change this date to whatever date you want to countdown to :)
const HACKING_STARTS = Date.UTC(2025, 0, 25, 5, 0, 0); // 1/24 at 9pm PST
const HACKING_ENDS = Date.UTC(2025, 0, 26, 17, 0, 0); // 1/26 at 9am PST
const STOP_PLAYING = Date.UTC(2025, 1, 0, 0, 0, 0);

// Testing:
// const HACKING_STARTS = "2024-01-25T01:18:00.000";
// const HACKING_ENDS = "2024-01-25T01:19:00.000";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

let shownAnim = false;

const ShiftingCountdown = () => {
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		showTimer: false,
		showFireworks: false,
		label: "Hackathon Unlocked in:",
		showStartingPopup: false,
	});

	useEffect(() => {
		const intervalRef = setInterval(handleCountdown, 1000);
		return () => clearInterval(intervalRef || undefined);
	}, []);

	const hasEnded = new Date() > new Date(HACKING_ENDS);

	const handleCountdown = () => {
		const now = new Date();

		let end = new Date(HACKING_STARTS);

		if (now >= end) {
			setCountdown((prev) => {
				return { ...prev, label: "Hackathon Ends in:" };
			});
			end = new Date(HACKING_ENDS);
		}

		const distance = Math.max(+end - +now, 0);

		const days = Math.floor(distance / DAY);
		const hours = Math.floor((distance % DAY) / HOUR);
		const minutes = Math.floor((distance % HOUR) / MINUTE);
		const seconds = Math.floor((distance % MINUTE) / SECOND);

		setCountdown((prev) => {
			return {
				...prev,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			};
		});
		setCountdown((prev) => {
			return { ...prev, showTimer: true };
		});

		if (
			days === 0 &&
			hours === 0 &&
			minutes === 0 &&
			seconds === 0 &&
			now >= new Date(HACKING_ENDS) &&
			!shownAnim
		) {
			shownAnim = true;
			setCountdown((prev) => {
				return { ...prev, showStartingPopup: true };
			});
			setTimeout(() => {
				setCountdown((prev) => {
					return { ...prev, showStartingPopup: false };
				});
			}, 8000);
		}
	};

	return (
		<>
			<AnimatePresence>
				{Date.now() < STOP_PLAYING && countdown.showStartingPopup && (
					<motion.div
						key="exit"
						exit={{
							opacity: 0,
							transition: { ease: "easeIn", duration: 1 },
						}}
					>
						<FinalAnimation />
					</motion.div>
				)}
			</AnimatePresence>

			<div className="p-4">
				<div className="w-full mx-auto flex items-center justify-center max-sm:w-full max-sm:h-[200px]">
					<div className="relative max-sm:w-full max-sm:h-full">
						<div className="w-full h-full bg-white absolute mt-5 left-5 max-sm:hidden" />
						<div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
							{!countdown.showTimer ? (
								<div className="w-full flex justify-center">
									<BarLoader />
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0, filter: "blur(20px)" }}
									animate={{
										opacity: 1,
										filter: "blur(0px)",
										transition: { duration: 1 },
									}}
									className="w-full h-full flex justify-top"
								>
									{!hasEnded && (
										<div
											className={clsx(
												"font-display absolute top-0 left-0 w-full flex justify-center text-lg p-4 flex-wrap md:text-xl lg:text-2xl xl:text-3xl",
												styles.text,
											)}
										>
											<span className="max-w-[25%] min-w-[130px] text-center">
												{countdown.label}
											</span>
										</div>
									)}
									<motion.div
										transition={{
											staggerChildren: 0.1,
										}}
										initial="initial"
										animate="animate"
										className="w-[80%] mx-auto flex items-center justify-center"
									>
										{!hasEnded ? (
											<>
												<CountdownItem
													num={countdown.hours + countdown.days * 24}
													isColon={false}
												/>
												<CountdownItem num=":" isColon={true} />
												<CountdownItem
													num={countdown.minutes}
													isColon={false}
												/>
												<CountdownItem num=":" isColon={true} />
												<CountdownItem
													num={countdown.seconds}
													isColon={false}
												/>
											</>
										) : (
											<CountdownItem num="Hacking has Ended!" isColon={true} />
										)}
									</motion.div>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShiftingCountdown;
