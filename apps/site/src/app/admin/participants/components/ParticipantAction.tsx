import { useContext } from "react";

import ButtonDropdown from "@cloudscape-design/components/button-dropdown";

import { isCheckInLead } from "@/lib/admin/authorization";
import UserContext from "@/lib/admin/UserContext";
import { Participant } from "@/lib/admin/useParticipants";
import { ParticipantRole, ReviewStatus, Status } from "@/lib/userRecord";

const JUDGE_SPONSOR_ROLES = [ParticipantRole.Judge, ParticipantRole.Sponsor];
const HACKER_MENTOR_VOLUNTEER_ROLES = [
	ParticipantRole.Hacker,
	ParticipantRole.Mentor,
	ParticipantRole.Volunteer,
];

export function isJudgeSponsorParticipant(
	roles: ReadonlyArray<ParticipantRole>,
) {
	return roles.some((role) => JUDGE_SPONSOR_ROLES.includes(role));
}

function isWorkshopLead(roles: ReadonlyArray<ParticipantRole>) {
	return roles.includes(ParticipantRole.WorkshopLead);
}

function isHacker(roles: ReadonlyArray<ParticipantRole>) {
	return roles.includes(ParticipantRole.Hacker);
}

function isHackerMentorVolunteer(roles: ReadonlyArray<ParticipantRole>) {
	return roles.some((role) => HACKER_MENTOR_VOLUNTEER_ROLES.includes(role));
}

interface ParticipantActionProps {
	participant: Participant;
	initiateCheckIn: (participant: Participant) => void;
	initiatePromotion: (participant: Participant) => void;
	initiateConfirm: (participant: Participant) => void;
	initiateConfirmHacker: (participant: Participant) => void;
}

function ParticipantAction({
	participant,
	initiateCheckIn,
	initiatePromotion,
	initiateConfirm,
	initiateConfirmHacker,
}: ParticipantActionProps) {
	const { roles } = useContext(UserContext);

	const canPromote = isCheckInLead(roles);
	const isWaiverSigned = participant.status === Status.Signed;
	const isAccepted = participant.status === Status.Accepted;
	const judgeSponsorParticipant = isJudgeSponsorParticipant(participant.roles);
	const hackerMentorVolunteer = isHackerMentorVolunteer(participant.roles);
	const workshopLead = isWorkshopLead(participant.roles);

	type Item = {
		id: string;
		text: string;
		disabled?: boolean;
		disabledReason?: string;
	};

	let items: Item[] = [];

	if (judgeSponsorParticipant) {
		if (participant.status === Status.Signed) {
			items = [
				{
					id: "confirm",
					text: "Confirm",
					disabled: !canPromote,
					disabledReason:
						"Only check-in leads can confirm judges and sponsors.",
				},
			];
		} else if (!canPromote || participant.status === ReviewStatus.Reviewed) {
			items = [
				{
					id: "confirm",
					text: "Confirm",
					disabled: true,
					disabledReason: !canPromote
						? "Only check-in leads can confirm judges and sponsors."
						: "Must sign waiver first.",
				},
			];
		} else {
			items = [{ id: "checkin", text: "Check In" }];
		}
	} else if (participant.status === Status.Waitlisted) {
		items = [
			{
				id: "promote",
				text: "Promote",
				disabled: !canPromote,
				disabledReason: "Only check-in leads are allowed to promote walk-ins.",
			},
		];
	} else if (hackerMentorVolunteer && (isWaiverSigned || isAccepted)) {
		items = [
			{
				id: "checkin",
				text: "Check In",
				disabled: true,
				disabledReason: isWaiverSigned
					? "Must confirm attendance in portal first"
					: "Must sign waiver and confirm attendance in portal",
			},
		];
	} else if (!hackerMentorVolunteer && workshopLead) {
		if (participant.status === Status.Signed) {
			items = [
				{
					id: "confirm",
					text: "Confirm",
					disabled: !canPromote,
					disabledReason: "Only check-in leads can confirm workshop leads.",
				},
			];
		} else if (!canPromote || participant.status === ReviewStatus.Reviewed) {
			items = [
				{
					id: "confirm",
					text: "Confirm",
					disabled: true,
					disabledReason: !canPromote
						? "Only check-in leads can confirm workshop leads without any other roles."
						: "Must sign waiver first.",
				},
			];
		} else {
			items = [{ id: "checkin", text: "Check In" }];
		}
	} else {
		items = [{ id: "checkin", text: "Check In" }];
	}

	if (
		isHacker(participant.roles) &&
		participant.waiver_signed &&
		(participant.status === Status.Accepted ||
			participant.status === Status.Signed)
	) {
		items = [...items, { id: "confirm-hacker", text: "Confirm Attendance" }];
	}

	return (
		<ButtonDropdown
			items={items}
			expandToViewport
			onItemClick={({ detail }) => {
				switch (detail.id) {
					case "checkin":
						initiateCheckIn(participant);
						break;
					case "confirm":
						initiateConfirm(participant);
						break;
					case "promote":
						initiatePromotion(participant);
						break;
					case "confirm-hacker":
						initiateConfirmHacker(participant);
						break;
				}
			}}
		>
			Actions
		</ButtonDropdown>
	);
}

export default ParticipantAction;
