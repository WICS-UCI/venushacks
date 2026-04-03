import Button from "@/lib/components/Button/Button";

function SignWaiver() {
	return (
		<div className="mt-4 md:mt-10 text-[var(--color-white)]">
			<h3 className="font-bold font-display mb-[9px] md:mb-[20px] text-[0.9375rem] sm:text-2xl md:text-[2.5rem] md:leading-10">
				Waiver
			</h3>
			<p className="font-body text-xs sm:text-base md:text-2xl">
				In order to attend IrvineHacks 2025, all participants must complete the
				Participation Waiver and review the Code of Conduct. The button below
				will take you to a DocuSign form to sign the waiver. After signing the
				waiver, please return to this Portal to confirm your attendance.
			</p>
			<div className="mt-6 md:mt-12">
				<Button
					text="Sign Waiver to attend VenusHacks 2026"
					href="/api/user/waiver"
					newWindow={true}
					usePrefetch={false}
					isLightVersion={true}
					className="text-xs sm:text-base md:text-4xl"
				/>
			</div>

			<p className="text-xl w-full text-center mt-2 text-yellow-500">
				It may take up to a minute for this site to update after waiver is
				signed
			</p>
		</div>
	);
}

export default SignWaiver;
