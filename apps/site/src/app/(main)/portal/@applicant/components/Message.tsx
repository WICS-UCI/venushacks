import { Status } from "@/lib/userRecord";

type Role = "Hacker" | "Mentor" | "Volunteer";

interface MessageProps {
	status: Status;
	role?: Role;
}

function Message({ status, role }: MessageProps) {
	let message: JSX.Element;

	const roleText = role ? role.toLowerCase() : "participant";

	switch (status) {
		case Status.Pending:
		case Status.Reviewed: {
			message = (
				<p className="font-figtree font-medium leading-tight">
					Thank you for submitting your VenusHacks 2026 application! We&apos;re still
					looking through applications, but keep an eye out for an email from{" "}
					<span className="underline">venushacks.uci@gmail.com</span>.
				</p>
			);
			break;
		}

		case Status.Rejected: {
			message = (
				<p className="font-figtree font-medium leading-tight">
					Thank you for your application to be a {roleText} at VenusHacks 2026.
					We truly appreciate the time and effort you put into your application.
					Unfortunately, we have received an overwhelming number of applications
					and we are unable to accommodate you this year.
				</p>
			);
			break;
		}

		case Status.Waitlisted: {
			message = (
				<p className="font-figtree font-medium leading-tight">
					Thank you for your application to be a {roleText} at VenusHacks 2026.
					We truly appreciate the time and effort you put into your application.
					At this time, we have placed you on our waitlist. We will reach out
					immediately if a spot becomes available.
				</p>
			);
			break;
		}

		case Status.Accepted: {
			message = (
				<p className="font-figtree font-medium leading-tight">
					Congratulations! You&apos;ve been accepted as a {roleText} at VenusHacks 2026!
					We truly appreciate the time and effort you put into your application.
					Please read through and sign the waiver, as well as confirm your
					attendance below.
				</p>
			);
			break;
		}
		case Status.Signed:
		case Status.Confirmed:
		case Status.Attending: {
			message = <></>;
			break;
		}

		case Status.Void: {
			message = (
				<p className="font-figtree font-medium leading-tight">
					Unfortunately, you are not able to RSVP for VenusHacks at this time
					and will not be able to come to the event. However, we would love to
					see you apply again next year!
				</p>
			);
			break;
		}

		default: {
			const exhaustiveCheck: never = status;
			throw new Error(`Unhandled status: ${exhaustiveCheck}`);
		}
	}

	return (
		<div className="font-body text-neutral-900 text-sm sm:text-base md:text-lg leading-relaxed px-3 sm:px- m5d:px-16">
			{message}
		</div>
	);
}

export default Message;
