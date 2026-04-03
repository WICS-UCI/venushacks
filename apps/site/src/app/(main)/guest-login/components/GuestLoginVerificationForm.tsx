import clsx from "clsx";
import Image from "next/image";

import ValidatingForm from "@/lib/components/ValidatingForm/ValidatingForm";
import RequiredAsterisk from "@/lib/components/forms/RequiredAsterisk";

import ApplicantPortalBackground from "@/lib/components/ApplicantPortalBackground/ApplicantPortalBackground";
import picnicBasketImg from "@/assets/images/picnic_basket.svg";

import styles from "@/lib/components/ValidatingForm/ValidatingForm.module.scss";

const VERIFICATION_PATH = "/api/guest/verify";
const PASSPHRASE_REGEX = /\w+-\w+-\w+-\w+/;

export default function GuestLoginVerificationForm({
	email,
	return_to,
}: {
	email?: string;
	return_to?: string;
}) {
	if (!email) {
		return <p>Error: email was not provided</p>;
	}

	const newSearchParams = new URLSearchParams();
	if (return_to) {
		newSearchParams.append("return_to", return_to);
	}

	return (
		<>
			<ApplicantPortalBackground />
			<div className="min-h-screen flex flex-col items-center justify-center">
				<div className="relative z-10 max-w-sm p-8 bg-white shadow-2xl md:p-12 md:max-w-lg rounded-3xl">
					<div className="w-full flex items-center justify-center mt-4 mb-8">
						<Image src={picnicBasketImg} alt="Picnic basket" className="w-32" />
					</div>
					<h2 className="mb-4 text-2xl text-center text-black font-sniglet tracking-wide">
						Enter Passphrase
					</h2>
					<ValidatingForm
						method="post"
						action={VERIFICATION_PATH + `?${newSearchParams}`}
					>
						<div className="flex flex-col mb-12 gap-2">
							<input type="email" name="email" value={email} readOnly hidden />
							<label htmlFor="passphrase" className="mb-2 font-figtree">
								Passphrase <RequiredAsterisk />
							</label>
							<input
								id="passphrase"
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
								type="text"
								pattern={PASSPHRASE_REGEX.source}
								required
								name="passphrase"
								placeholder="Enter passphrase"
								aria-describedby="passphrase-description"
							/>
							<small id="passphrase-description" className="font-figtree">
								A login passphrase was sent to your email. Please enter the
								passphrase. If you cannot find the passphrase, please check your
								spam. If the email is still missing, try again later, use a
								different email, or contact us at contact@venushacks.com for
								assistance.
							</small>
							<p
								className={clsx(
									styles.invalidFeedback,
									"text-red-500 font-figtree mt-4",
								)}
							>
								Sorry, that passphrase is invalid.
							</p>
						</div>
					</ValidatingForm>
				</div>
			</div>
		</>
	);
}
