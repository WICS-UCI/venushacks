"use client";

import { useContext, useState } from "react";

import useParticipants, { Participant } from "@/lib/admin/useParticipants";
import NotificationContext from "@/lib/admin/NotificationContext";

import CheckInModal from "./components/CheckInModal";
import ParticipantsTable from "./components/ParticipantsTable";
import WaitlistPromotionModal from "./components/WaitlistPromotionModal";
import ConfirmAttendanceModal from "./components/ConfirmAttendanceModal";

function Participants() {
	const {
		participants,
		loading,
		checkInParticipant,
		releaseParticipantFromWaitlist,
		confirmOutsideParticipants,
		confirmHackerAttendance,
	} = useParticipants();
	const [checkinParticipant, setCheckinParticipant] =
		useState<Participant | null>(null);
	const [promoteParticipant, setPromoteParticipant] =
		useState<Participant | null>(null);
	const [confirmHackerParticipant, setConfirmHackerParticipant] =
		useState<Participant | null>(null);

	const { setNotifications } = useContext(NotificationContext);

	const initiateCheckIn = (participant: Participant): void => {
		setCheckinParticipant(participant);
	};

	const sendCheckIn = async (participant: Participant): Promise<void> => {
		try {
			await checkInParticipant(participant);
			setCheckinParticipant(null);
			if (setNotifications) {
				setNotifications((oldNotifications) => [
					{
						type: "success",
						content: `Successfully checked in ${participant.first_name} ${participant.last_name} (${participant._id})!`,
						dismissible: true,
						dismissLabel: "Dismiss message",
						id: participant._id,
						onDismiss: () =>
							setNotifications((notifications) =>
								notifications.filter(
									(notification) => notification.id !== participant._id,
								),
							),
					},
					...oldNotifications,
				]);
			}
		} catch (error) {
			if (setNotifications) {
				setNotifications((oldNotifications) => [
					{
						type: "error",
						content: `Failed to check in ${participant.first_name} ${participant.last_name} (${participant._id})!`,
						dismissible: true,
						dismissLabel: "Dismiss message",
						id: participant._id,
						onDismiss: () =>
							setNotifications((notifications) =>
								notifications.filter(
									(notification) => notification.id !== participant._id,
								),
							),
					},
					...oldNotifications,
				]);
			}
		}
	};

	const initiatePromotion = (participant: Participant): void => {
		setPromoteParticipant(participant);
	};

	const sendWaitlistPromote = async (
		participant: Participant,
	): Promise<void> => {
		try {
			await releaseParticipantFromWaitlist(participant);
			setPromoteParticipant(null);
			if (setNotifications) {
				setNotifications((oldNotifications) => [
					{
						type: "success",
						content: `Successfully released ${participant.first_name} ${participant.last_name} (${participant._id}) from waitlist!`,
						dismissible: true,
						dismissLabel: "Dismiss message",
						id: participant._id,
						onDismiss: () =>
							setNotifications((notifications) =>
								notifications.filter(
									(notification) => notification.id !== participant._id,
								),
							),
					},
					...oldNotifications,
				]);
			}
		} catch (error) {
			if (setNotifications) {
				setNotifications((oldNotifications) => [
					{
						type: "error",
						content: `Failed to release ${participant.first_name} ${participant.last_name} (${participant._id}) from waitlist!`,
						dismissible: true,
						dismissLabel: "Dismiss message",
						id: participant._id,
						onDismiss: () =>
							setNotifications((notifications) =>
								notifications.filter(
									(notification) => notification.id !== participant._id,
								),
							),
					},
					...oldNotifications,
				]);
			}
		}
	};

	const initiateConfirmHacker = (participant: Participant): void => {
		setConfirmHackerParticipant(participant);
	};

	const sendConfirmHacker = async (participant: Participant): Promise<void> => {
		try {
			await confirmHackerAttendance(participant);
			setConfirmHackerParticipant(null);
			if (setNotifications) {
				setNotifications((oldNotifications) => [
					{
						type: "success",
						content: `Successfully confirmed attendance for ${participant.first_name} ${participant.last_name} (${participant._id})!`,
						dismissible: true,
						dismissLabel: "Dismiss message",
						id: participant._id,
						onDismiss: () =>
							setNotifications((notifications) =>
								notifications.filter((n) => n.id !== participant._id),
							),
					},
					...oldNotifications,
				]);
			}
		} catch (error) {
			if (setNotifications) {
				setNotifications((oldNotifications) => [
					{
						type: "error",
						content: `Failed to confirm attendance for ${participant.first_name} ${participant.last_name} (${participant._id})!`,
						dismissible: true,
						dismissLabel: "Dismiss message",
						id: participant._id,
						onDismiss: () =>
							setNotifications((notifications) =>
								notifications.filter((n) => n.id !== participant._id),
							),
					},
					...oldNotifications,
				]);
			}
		}
	};

	return (
		<>
			<ParticipantsTable
				participants={participants}
				loading={loading}
				initiateCheckIn={initiateCheckIn}
				initiatePromotion={initiatePromotion}
				initiateConfirm={confirmOutsideParticipants}
				initiateConfirmHacker={initiateConfirmHacker}
			/>
			<CheckInModal
				onDismiss={() => setCheckinParticipant(null)}
				onConfirm={sendCheckIn}
				participant={checkinParticipant}
			/>
			<WaitlistPromotionModal
				onDismiss={() => setPromoteParticipant(null)}
				onConfirm={sendWaitlistPromote}
				participant={promoteParticipant}
			/>
			<ConfirmAttendanceModal
				onDismiss={() => setConfirmHackerParticipant(null)}
				onConfirm={sendConfirmHacker}
				participant={confirmHackerParticipant}
			/>
		</>
	);
}

export default Participants;
