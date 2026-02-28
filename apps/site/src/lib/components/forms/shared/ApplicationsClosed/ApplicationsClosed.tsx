import Link from "next/link";

import getUserIdentity from "@/lib/utils/getUserIdentity";

async function ApplicationsClosed() {
	const identity = await getUserIdentity();

	return (
		<div className="rounded-2xl p-10 text-display text-[#432810] bg-white text-center w-8/12 max-[800px]:w-9/12 max-[400px]:w-11/12">
			<h1 className="text-4xl p-10 font-semibold max-[800px]:p-0">
				Applications for IrvineHacks 2025 closed on January 12th.
			</h1>
			<hr className="my-10 w-full h-0.5 bg-[#432810]" />
			{identity.uid === null && (
				<p className="text-lg">
					If you already applied, please{" "}
					<Link href="/login" className="text-blue-600 underline">
						log in
					</Link>{" "}
					to visit your applicant portal.
				</p>
			)}
			<p className="text-lg">
				If you have any other questions or concerns, feel free to contact us at{" "}
				<a href="mailto:hack@uci.edu" className="text-blue-600 underline">
					hack@uci.edu
				</a>
				.
			</p>
		</div>
	);
}

export default ApplicationsClosed;
