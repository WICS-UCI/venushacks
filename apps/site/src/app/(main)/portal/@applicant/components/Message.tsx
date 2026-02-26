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
				<p>
					Thank you for submitting your application! We are currently reviewing
					applications on a rolling basis, and you will hear back from us soon!
				</p>
			);
			break;
		}

		case Status.Rejected: {
			message = (
				<p className="mt-4">
					Thank you for applying to VenusHacks 2026. After careful review,
					we’re unable to offer you a spot this year. We truly appreciate the
					time and effort you put into your application, and we encourage you to
					apply again in the future.
				</p>
			);
			break;
		}

		case Status.Waitlisted: {
			message = (
				<p className="mt-4">
					Thank you for applying to VenusHacks 2026. We’re able to offer you a
					spot on the waitlist. Please check your email for more information
					about the waitlist and next steps.

				</p>
			);
			break;
		}

		case Status.Accepted: {
			message = (
				<p className="mt-4">
				Congratulations! You’ve been accepted as a {roleText} at VenusHacks 2026!
				We truly appreciate the time and effort you put into your application.
				Please read through and sign the waiver, and confirm your attendance below.
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
				<p className="mt-4">
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
