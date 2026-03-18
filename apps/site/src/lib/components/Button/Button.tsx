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
	const wrapWithButtonBox = !isLightVersion && !isNavButton;

	if (href) {
		return (
			<div className={clsx(wrapWithButtonBox && styles.buttonBox)}>
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
		<div className={clsx(wrapWithButtonBox && styles.buttonBox)}>
			<button
				type="submit"
				className={clsx(
					styles.button,
					isLightVersion && styles.lightButton,
					isLightVersion ? "font-body" : "font-display",
					"text-2xl",
					className,
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
