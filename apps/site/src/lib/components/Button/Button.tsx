import { CSSProperties, ComponentProps } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Button.module.scss";

interface ButtonProps {
	text: string;
	className?: string;
	href?: ComponentProps<typeof Link>["href"];
	isLightVersion?: boolean;
	isNavButton?: boolean;
	usePrefetch?: boolean;
	newWindow?: boolean;
	disabled?: boolean;
	style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
	text,
	href,
	className,
	style,
	isLightVersion,
	isNavButton,
	disabled,
	usePrefetch = true,
	newWindow = false,
}) => {
	if (href) {
		return (
			<div className={clsx(!isLightVersion && styles.buttonBox)}>
				<Link
					href={href}
					target={newWindow ? "_blank" : "_self"}
					rel={newWindow ? "noopener noreferrer" : ""}
					className={clsx(
						styles.button,
						isLightVersion && styles.lightButton,
						isNavButton && styles.navButton,
						isLightVersion ? "font-body" : "font-display",
						className,
					)}
					style={style}
					prefetch={usePrefetch}
				>
					{text}
				</Link>
			</div>
		);
	}
	return (
		<div className={clsx(!isLightVersion && styles.buttonBox)}>
			<button
				type="submit"
				className={clsx(
					"px-3 py-2 bg-[#F8C4C4] border border-[#CF6868] rounded-full w-56 text-button-text font-bold ml-auto",
				)}
				disabled={disabled}
				style={style}
			>
				{text}
			</button>
		</div>
	);
};

export default Button;
