"use client";

import Image from "next/image";

import blueberry from "@/assets/icons/blueberry.svg";
import mango from "@/assets/icons/mango.svg";
import strawberry_tree_fruit from "@/assets/icons/strawberry_tree_fruit.svg";
import apple from "@/assets/icons/apple.svg";
import lychee from "@/assets/icons/lychee.svg";

import gray_apple from "@/assets/icons/gray_apple.svg";
import gray_blueberry from "@/assets/icons/gray_blueberry.svg";
import gray_mango from "@/assets/icons/gray_mango.svg";
import gray_strawberry from "@/assets/icons/gray_strawberry.svg";
import gray_lychee from "@/assets/icons/gray_lychee.svg";

import bar1 from "@/assets/icons/am_bar.svg";
import bar2 from "@/assets/icons/mb_bar.svg";
import bar3 from "@/assets/icons/bs_bar.svg";
import bar4 from "@/assets/icons/sl_bar.svg";
import barGray from "@/assets/icons/gray_bar.svg";

interface Props {
	pageIndex: number;
	pageCount: number;
}

const activeIcons = [apple, mango, blueberry, strawberry_tree_fruit, lychee];
const inactiveIcons = [gray_apple, gray_mango, gray_blueberry, gray_strawberry, gray_lychee];

const barsColored = [bar1, bar2, bar3, bar4];
const barsGray = [barGray, barGray, barGray, barGray];

export default function ApplicationProgressBar({ pageIndex, pageCount }: Props) {
	return (
		<div className="w-full flex justify-center mb-6">
			<div className="overflow-x-auto max-w-[260px] md:max-w-none">
				<div className="flex w-max items-center gap-2 md:gap-4">
					{Array.from({ length: pageCount }).map((_, index) => {
						const iconIndex = index % activeIcons.length;
						const Icon =
							index <= pageIndex
								? activeIcons[iconIndex]
								: inactiveIcons[iconIndex];

						return (
							<div key={index} className="flex items-center gap-2">
								<Image
									src={Icon}
									alt={`step icon ${index + 1}`}
									className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0"
								/>

								{index !== pageCount - 1 && (
									<Image
										src={
											index < pageIndex
												? barsColored[index % barsColored.length]
												: barsGray[index % barsGray.length]
										}
										alt={`progress bar ${index + 1}`}
										className="w-5 h-2 md:w-10 md:h-3 flex-shrink-0"
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}