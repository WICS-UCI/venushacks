import clsx from "clsx";
import Image from "next/image";

import ValidatingForm from "@/lib/components/ValidatingForm/ValidatingForm";
import RequiredAsterisk from "@/lib/components/forms/RequiredAsterisk";

import picnicBasketImg from "@/assets/images/picnic_basket.svg"

import styles from "@/lib/components/ValidatingForm/ValidatingForm.module.scss";

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
const LOGIN_PATH = "/api/user/login";

function LoginForm({ return_to }: { return_to?: string }) {
	const searchParams = new URLSearchParams();

	if (return_to !== undefined) {
		searchParams.append("return_to", return_to);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="relative z-10 max-w-sm p-8 bg-white shadow-2xl md:p-12 md:max-w-lg rounded-3xl">
				<div className="w-full flex items-center justify-center mt-4 mb-8">
					<Image src={picnicBasketImg} alt="Picnic basket" className="w-32"/>
				</div>
				<h2 className="mb-4 text-2xl text-center text-black font-sniglet tracking-wide">
					Log In
				</h2>
				<ValidatingForm method="post" action={LOGIN_PATH + `?${searchParams}`}>
					<div className="flex flex-col mb-12">
						<label htmlFor="email" className="mb-2 font-figtree">
							Email <RequiredAsterisk />
						</label>
						<input
							id="email"
							type="email"
							className="w-full
								rounded-xl
								px-4 py-2 mb-6
								border
								bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)]
								outline-none
								text-sm md:text-base
								placeholder:text-[#8E8E8E] text-black
								focus:bg-white
								focus:ring-2
								transition-colors duration-150
							"
							pattern={EMAIL_REGEX.source}
							name="email"
							placeholder="Enter email"
							aria-describedby="email-description"
							required
						/>
						<small id="email-description" className="font-figtree">
							Enter your email for a one-time login passphrase. This can be your UCI email or personal email.
						</small>
						<p className={clsx(styles.invalidFeedback, "text-red-500 font-figtree mt-4")}>
							Sorry, that email address is invalid.
						</p>
					</div>
				</ValidatingForm>
			</div>
		</div>
	);
}

export default LoginForm;
